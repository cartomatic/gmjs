//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * MsgBus event opts. Documentation only class. class is used as extra cfg holder for the behavior of standard local events fired by the mh.communication.MsgBus as well as the cross window / frame events.
     */
    Ext.define('mh.communication.MsgBusEvtOpts', {

        /**
         * @property {string} tunnel
         * if not empty, the outgoing event will be suffixed by the tunnel value; so for example instead of firing back 'someevtname', 'someevtname_tunnel' should be fired;
         * this can be used to tunnel the communication between components so only specified instances get evt callbacks.
         * Handy for generic events to avoid evt handling overhead in many modules at once
         */

        /**
         * @property {Boolean} [suppressLocal = false]
         * Whether or not the event should be also fired locally; used to suppress firing local events when broadcasting events outside of a window
         */

        /**
         * @property {Boolean} [host]
         * indicates that a cross window event should be fired up the windows stack - so to a parent
         */

        /**
         * @property {Boolean} [hosted]
         * indicates that a cross window event should be fired down the windows stack - to hosted iframes
         */

        /**
         * @property {Boolean|Number} [bubble]
         * indicates whether or not events should be bubbled up the windows stack; when providing a boolean value it effectively means that an event chain will end when the
         * fired event reaches a parent. Positive numbers specify the number of levels to travel up. 1 means the event bubbling will stop at the parent,
         * 2 at the parent's parent if any and so on.
         */

        /**
         * @property {Boolean|Number} [drilldown]
         * indicates whether or not events should drill down the windows stack; when providing a boolean value it effectively means that an event chain will end when the
         * fired event reaches a child (each child actually). Positive numbers specify the number of levels to travel down. 1 means the event drilldown will stop at the
         * child (each child), 2 at the child's children if any and so on.
         */
    });

}());