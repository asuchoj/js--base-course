'use strict';
function EventBus() {
    this.listeners = {};
}

EventBus.prototype.on = function(eventName, cb){
    this.listeners[eventName] = Array.isArray(this.listeners[eventName]) ? this.listeners[eventName] : [];
    this.listeners[eventName].push(cb);
};

EventBus.prototype.off = function(eventName, cb){

    if( !eventName && cb ){
        for( let key in this.listeners){
            this.listeners[key].forEach((b)=>{
                let d = [];
                if( b.toString().replace(/\s/g,"") !== cb.toString().replace(/\s/g,"") ){
                    d.push(b)
                }
                return this.listeners[key] = d;
            })
        }
    }

    if( eventName && !cb ) {
        for( let key in this.listeners){
            if( this.listeners[key] === this.listeners[eventName]){
                this.listeners[eventName] = undefined;
            }
        }
    }

    if(eventName && cb){
        this.listeners[eventName].forEach((b)=>{
            let d = [];
            if( b.toString().replace(/\s/g,"") !== cb.toString().replace(/\s/g,"") ){
                d.push(b)
            }
            return this.listeners[eventName] = d;
        })
    }
    if(!eventName && !cb){
        return this.listeners = {};
    }

};

EventBus.prototype.trigger = function(eventName, ...data){
    (this.listeners[eventName] || []).forEach(cb => cb.apply(this, data) )
};



EventBus.prototype.once = function(eventName, cb){
    let self = this;
    function temp() {
      cb.apply(this, arguments);
      self.off(eventName, temp);
    }
    this.on(eventName, temp);
};


