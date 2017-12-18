'use strict';
function EventBus() {
    this.listeners = {};
}

EventBus.prototype.on = function(eventName, cb){
    this.listeners[eventName] = Array.isArray(this.listeners[eventName]) ? this.listeners[eventName] : [];
    this.listeners[eventName].push(cb);
};
EventBus.prototype.off = function(eventName, cb){

};
EventBus.prototype.trigger = function(eventName, data1,data2){

    (this.listeners[eventName] || []).forEach(cb => cb(data1,data2) )
};
EventBus.prototype.once = function(el, data){

};
