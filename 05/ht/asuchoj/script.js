'use strict';
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

/*роутер*/
/**
 * Функция для добавления и обработки роутов на странице
 * @param {*} routeParams массив параметров для обработки роутов
 */
function Router(routeParams) {
  this.routes = routeParams || [];
  this.currentRoute;
  this.previousRoute;
  this.currentParams;
  this.previousParams;
  window.addEventListener('hashchange', (event) => {
    this.handler(window.location.hash);
  })
  this.handler(window.location.hash);
}

Router.prototype = {
  handler: function(hash) {
    this.previousRoute = this.currentRoute;
    this.previousParams = this.currentParams;
    this.currentRoute = this.findNewRoute(hash);
    this.launchHandlers();
  },
  findNewRoute: function(hash) {
    hash = hash.slice(1);

    for (var i = 0; i < this.routes.length; i++) {
      var element = this.routes[i];
      if (typeof(element.match) == "string" && element.match === hash) {
        this.currentParams = '';
        return element;
      }
      if (typeof(element.match) == "function" && element.match(hash)) {
        this.currentParams = '';
        return element;
      }
      if ((element.match instanceof RegExp) && element.match.test(hash)) {
        this.currentParams = hash.match(element.match) || [];
        this.currentParams.splice(0, 1);
        return element;
      }
    }
  },
  launchHandlers() {
    Promise.resolve()
      .then(() => { this.previousRoute && this.previousRoute.onLeave && this.previousRoute.onLeave(this.previousParams) })
      .then(() => { this.currentRoute && this.currentRoute.onBeforeEnter && this.currentRoute.onBeforeEnter(this.currentParams) })
      .then(() => { this.currentRoute && this.currentRoute.onEnter && this.currentRoute.onEnter(this.currentParams) });
  }
}