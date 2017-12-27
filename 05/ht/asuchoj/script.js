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
            this.listeners[key].forEach((el)=>{
                let newArr = [];
                if( el !== cb){
                    newArr.push(el)
                }
                return this.listeners[key] = newArr;
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
        let newArr = [];
        if(cb === undefined) return;
        this.listeners[eventName].forEach((el)=>{
            if( el !== cb ){
                newArr.push(el)
            }
        });
        return this.listeners[eventName] = newArr;
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
    function addOnceCallback() {
      cb.apply(this, arguments);
      self.off(eventName, addOnceCallback);
    }
    this.on(eventName, addOnceCallback);
};

/*шаблонизатор*/
let compileTemplate = function (tp) {
  let newTp = tp;
  return function (el, data, ) {
    for (let key in data) {
      let regexp = new RegExp("{{" + key + "}}");
      newTp = newTp.replace(regexp,data[key]);
    }
    return el.innerHTML = newTp;
  }
}

/*роутер*/

function Router(routes, eventBus) {
  this.routes = routes || [];
  this.init(eventBus);
}

Router.prototype.init = function(eventBus) {
  if (eventBus) {
    eventBus.on('changeUrl', (oldUrl, newUrl) => {
      this.handleUrl(oldUrl, newUrl);
    });
  }
};

Router.prototype.handleUrl = function(oldUrl, newUrl) {
  var previousRoute = this.findRoute(oldUrl);
  var nextRoute = this.findRoute(newUrl);

  var oldUrlParams = this.getUrlParams(oldUrl);
  var newUrlParams = this.getUrlParams(newUrl);

  return Promise.resolve()
    .then(() => {
      return previousRoute &&
        previousRoute.onLeave &&
        (oldUrlParams ? previousRoute.onLeave(oldUrlParams) : previousRoute.onLeave());
    })
    .then(() => {
      return nextRoute &&
        nextRoute.onBeforeEnter &&
        (newUrlParams ? nextRoute.onBeforeEnter(newUrlParams) : nextRoute.onBeforeEnter());
    })
    .then(() => {
      return nextRoute &&
        nextRoute.onEnter &&
        (newUrlParams ? nextRoute.onEnter(newUrlParams) : nextRoute.onEnter());
    });
};

Router.prototype.findRoute = function(url) {
  return this.routes.find((route) => {
    if (typeof route.match === 'string') {
      return route.match === url;
    }

    if (route.match instanceof RegExp) {
      return route.match.test(url);
    }

    if (typeof route.match === 'function') {
      return route.match(url);
    }
  });
};

Router.prototype.getUrlParams = function(url) {
  var route = this.findRoute(url);

  if (!route) {
    return;
  }

  if (route.match instanceof RegExp) {
    return url.match(route.match);
  }

  if (typeof route.match === 'function') {
    return route.match(url);
  }
};