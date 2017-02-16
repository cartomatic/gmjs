//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Because in strict mode access to caller is censored, extending ExtJs classes requires some hocus-pocus (this is still true in ExtJs6; more than likely will change in the future)
     * This class should be used as a mixin to provide an easy to access callParent and callSuper equivalents
     */
    Ext.define('mh.mixin.CallMeParent', {
        /**
         * @protected
         * @static
         * @inheritable
         */
        callMeParent: function(method, args) {

            //Note:
            //setting a calledParent flag on an instance results in it being set already for further calls which is not good
            //as it indicates a parent call has been made already and leads to unexpected behavior - parent is not called.
            //therefore need to use a temp object that maps the calls per method, and then wipes them out for further calls
            if(this !== this.superclass){

                //Note: when calling from an app instance level it is not the same as the app declaring class because of some reason
                //need to handle this appropriately by digging one level deeper
                var appInstance = Ext.getClassName(this).indexOf('$') > -1;
                if(!appInstance && (!this.calledMapCache || !this.calledMapCache[method])){
                    this.calledMapCache = this.calledMapCache || {};
                    this.calledMapCache[method] = true;
                    this.resetCalledMapCache(method);
                    return this.superclass[method].apply(this, args);
                }
                else {
                    //try to dig deeper
                    if(Ext.isFunction(this.superclass.superclass[method])){
                        return this.superclass.superclass[method].apply(this, args);
                    }
                }
            }
            //this is not enough!
            //if(this !== this.superclass){
            //    this.superclass[method].apply(this, args);
            //}
            else {
                //hmmm, looks like this is the case, the superclas[method] apply keeps on spinning over itself
                //not entirely sure why, but it looks like it's caused by the way object inheritance works in ExtJs
                //so need to check if can call deeper
                if(this.superclass && this.superclass.superclass){
                    this.superclass.superclass[method].apply(this.superclass, arguments);
                }
            }

            //This exposes a problem with setting a prop on an instance described above
            // if(!this.calledParent){
            //     this.calledParent = true;
            //     this.superclass[method].apply(this, args);
            // }
            // else {
            //     //hmmm, looks like this is the case, the superclas[method] apply keeps on spinning over itself
            //     //so need to dive deeper
            //     this.superclass.calledParent = true;
            //     this.superclass.superclass[method].apply(this.superclass, arguments);
            // }
        },

        /**
         * @protected
         * @static
         * @inheritable
         */
        callMeSuper: function(args) {
            //TODO...
        },
        
        /**
         * cached map of the called methods in a call chain. gets reset after each call with a little timeout
         */
        calledMapCache: null,

        /**
         * resets call map chain cache
         * @param method
         */
        resetCalledMapCache: function(method){
            Ext.defer(function(){
                if(this.calledMapCache && this.calledMapCache[method]){
                    delete this.calledMapCache[method];
                }
            }, 1, this);
        }
    });

}());
