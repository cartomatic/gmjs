//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 05.10.2018.
     */
    Ext.define('mh.module.dataView.phone.DataViewController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-data-view',

        requires: [
            'mh.module.dataView.phone.DataViewLocalization',
            'Ext.dataview.listswiper.ListSwiper',
            'Ext.dataview.listswiper.Stepper'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.mixin.Localization',
            'mh.data.Ajax'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalizationToViewModel();

            this.configureListView();

            this.configureActionBtns();
        },

        /**
         * an instance of a listview used by this module
         */
        listView: null,

        /**
         * configures list view
         */
        configureListView: function(){
            var vw = this.getView(),
                viewCfg = vw.getViewCfg(),
                store = this.getViewModel().getStore('listviewstore');

            if(!viewCfg){
                console.error('You need to configure a list for this view');
            }

            this.listView = Ext.create(viewCfg);
            this.listView.setStore(store);
            this.listView.setViewModel(this.getViewModel()); //so localization and such is propagated down the stack

            this.listView.setEmptyText(this.getTranslation('listEmptyText'));

            vw.add(this.listView);

            //observe store load, so can handle errors properly!
            store.on('load', this.onGridStoreLoad, this);
        },

        /**
         * Store load evt callback; used to redirect err handling
         * @param store
         * @param records
         * @param success
         * @param operation
         * @param eOpts
         */
        onGridStoreLoad: function(store, records, success, operation, eOpts){
            if(success){
                //on success focus first row, so grid scrolls to top
                var firstRow = this.listView.getViewItems()[0];
                if(firstRow){
                    this.listView.getScrollable().ensureVisible(firstRow.el);
                }
                //Note: this does not change the selection if present; just scrolls to top
            }
            else {
                this.handleFailedRequest(
                    operation.error.response,
                    {
                        failure: Ext.bind(
                            function(){
                                //just load empty arr, so grid removes previously displayed data
                                this.getViewModel().get('listviewstore').loadRecords([]);
                            },
                            this
                        )
                    }
                )
            }
        },

        btnCreate: null,

        configureActionBtns: function(){
            var vw = this.getView(),
                enableCreate = vw.getEnableCreate(),
                enableEdit = vw.getEnableEdit(),
                enableDestroy = vw.getEnableDestroy(),
                swipeActions = [];

            if(enableCreate){
                //Note: floating btn visibility handled on view activate / deactivate
                this.btnEdit = vw.add({
                    xtype: 'button',
                    hidden: true,
                    floated: true,
                    ui: 'confirm round',
                    right: 15,
                    bottom: 15,
                    iconCls: mh.FontIconsDictionary.getIcon('mhDataViewNew'),
                    listeners: {
                        tap: 'onBtnCreateTap'
                    }
                });
            }

            if(enableEdit){
                swipeActions.push({
                    iconCls: mh.FontIconsDictionary.getIcon('mhListBtnEdit'),
                    text: this.getTranslation('btnEdit'),
                    ui: 'action',
                    commit: 'onSwipeEdit'
                });
            }

            if(enableDestroy){
                swipeActions.push({
                    iconCls: mh.FontIconsDictionary.getIcon('mhListBtnDestroy'),
                    text: this.getTranslation('btnDestroy'),
                    ui: 'decline',
                    commit: 'onSwipeDelete',
                    undoable: true
                    //with undoable: true can also use the following handlers:
                    //precommit: 'onDeleteItem',
                    //commit: 'onCommitDeleteItem',
                    //revert: 'onUndoDeleteItem',
                });
            }

            if(swipeActions.length > 0){
                this.listView.addPlugin({
                    type: 'listswiper',
                    widget: {
                        xtype: 'listswiperstepper'
                    },
                    right: swipeActions
                });
            }

        },

        /**
         * swipe edit handler
         * @param list
         * @param info
         */
        onSwipeEdit: function(list, info){
            this.redirectTo(this.getRecEditUrl(info.record));
        },

        /**
         * swipe delete handler
         * @param list
         * @param info
         */
        onSwipeDelete: function(list, info){
            this.destroyRecord(info.record, this.destroyRecordSuccess, this.destroyRecordFailure);
        },

        /**
         * destroys a single record and returns the control to callbacks provided
         * @param record
         * @param success
         * @param failure
         */
        destroyRecord: function(record, success, failure){
            var me = this,
                cfg = {
                    scope: me,
                    success: success,
                    failure: failure,
                    exceptionMsg: me.getTranslation('destroyFailureMsg'),
                    autoIgnore404: false, //this is required to show msg on 404 which will often be the case in dev mode!
                    suppress400: true//so can handle 400 here
                },
                callback = me.generateModelRequestCallback(cfg),

                op = function(){
                    record.erase({
                        callback: callback
                    });
                };

            this.getView().setMasked({
                xtype: 'loadmask',
                message: this.getTranslation('destroyRecordLoadMask')
            });

            cfg.retry = op;

            op();
        },

        /**
         * destroy record success handler
         */
        destroyRecordSuccess: function(){
            this.getView().setMasked(false);
            this.afterRecordDestroy();
            this.reloadStore();
        },

        /**
         * after rec destroy extension hook
         */
        afterRecordDestroy: Ext.emptyFn,


        /**
         * rec delete failure handler; unmasks and reloads grid
         */
        destroyRecordFailure: function(){
            this.getView().setMasked(false);
            this.reloadStore();
        },

        /**
         * whether or not a view is currently active
         */
        isActive: false,

        /**
         * view activate callback - reloads store, so when user enters this view data is always fresh
         */
        onViewActivate: function() {
            this.isActive = true;
            this.handleFloatingBtnsVisibility();
            this.reloadStore();
        },

        onViewDeactivate: function(){
            this.isActive = false;
            this.handleFloatingBtnsVisibility();
        },

        /**
         * handles floating btns visibility
         * @param show
         */
        handleFloatingBtnsVisibility: function(){
            var vw = this.getView(),
                enableCreate = vw.getEnableCreate();

            if(this.btnEdit){
                if(this.isActive && enableCreate === true){
                    this.btnEdit.show();
                }
                else {
                    this.btnEdit.hide();
                }
            }
        },

        /**
         * reloads grid store
         */
        reloadStore: function() {

            var store = this.getViewModel().getStore('listviewstore');

            if(store.isChainedStore){
                store.source.load();
            } else {
                store.load();
            }
        },

        /**
         * create btn tap handler - redirects to a 'create' view
         */
        onBtnCreateTap: function(){
            var model = Ext.create(
                Ext.getClassName(this.getViewModel().getStore('listviewstore').getModel())
            );

            this.redirectTo(this.getRecCreateUrl(model));
        },

        /**
         * gets a view url for a record
         * @template
         * @param rec
         */
        getRecViewUrl: function(rec){
            return rec.getViewUrl();
        },

        /**
         * returns edit url for a rec
         * @template
         * @param rec
         * @returns {*|string}
         */
        getRecEditUrl: function(rec){
            return rec.getEditUrl();
        },

        /**
         * returns a create url for a rec
         * @param rec
         * @template
         */
        getRecCreateUrl: function(rec){
            return rec.getCreateUrl();
        },

        /**
         * default record view action handler
         * @param rec
         * @param listItem
         * @param idx
         * @param eOpts
         */
        onItemDisclosure: function(rec, listItem, idx, eOpts){
            this.redirectTo(this.getRecViewUrl(rec));
        }
    });
}());