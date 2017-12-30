'use strict';
/*шаблонизатор*/
let compileTemplate = function(tp) {
    let newTp = tp;
    return function(el, data, ) {
        for (let key in data) {
            let regexp = new RegExp("{{" + key + "}}");
            newTp = newTp.replace(regexp, data[key]);
        }
        return el.innerHTML = newTp;
    }
};

function EventBus() {
    this.listeners = {};
}
EventBus.prototype.on = function(eventName, cb) {
    this.listeners[eventName] = Array.isArray(this.listeners[eventName]) ? this.listeners[eventName] : [];
    this.listeners[eventName].push(cb);
};
EventBus.prototype.off = function(eventName, cb) {
    if (!eventName && cb) {
        for (let key in this.listeners) {
            this.listeners[key].forEach((el) => {
                let newArr = [];
                if (el !== cb) {
                    newArr.push(el)
                }
                return this.listeners[key] = newArr;
            })
        }
    }
    if (eventName && !cb) {
        for (let key in this.listeners) {
            if (this.listeners[key] === this.listeners[eventName]) {
                this.listeners[eventName] = undefined;
            }
        }
    }
    if (eventName && cb) {
        let newArr = [];
        if (cb === undefined) return;
        this.listeners[eventName].forEach((el) => {
            if (el !== cb) {
                newArr.push(el)
            }
        });
        return this.listeners[eventName] = newArr;
    }
    if (!eventName && !cb) {
        return this.listeners = {};
    }
};
EventBus.prototype.trigger = function(eventName, ...data) {
    (this.listeners[eventName] || []).forEach(cb => cb.apply(this, data))
};
EventBus.prototype.once = function(eventName, cb) {
    let self = this;

    function addOnceCallback() {
        cb.apply(this, arguments);
        self.off(eventName, addOnceCallback);
    }
    this.on(eventName, addOnceCallback);
};

/*роутер*/
let Router = function(options) {
    options ? this.routes = options.routes : this.routes = [];
    this.init();
};

Router.prototype = {
    init: function() {
        // 1. Подписать this.handleUrl на изменения url
        window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
        // 2. Выполнить this.handleUrl
        this.handleUrl(window.location.hash);
    },
    findPreviousActiveRoute: function() {
        // Найти роут с которого уходим
        return this.currentRoute;
    },
    findNewActiveRoute: function(url) {

        url = url.split('#').pop();
        // Найти роут на который переходим
        let route = this.routes.find((routeItem) => {
            if (typeof routeItem.match === 'string') {
                return url === routeItem.match;
            } else if (typeof routeItem.match === 'function') {
                return routeItem.match(url);
            } else if (routeItem.match instanceof RegExp) {
                return url.match(routeItem.match);
            }
        });
        return route;
    },
    getRouteParams(route, url) {

        let params;

        if (!route && !url) {
            params = []
        } else {
            params = url.match(route.match);
        }
        params.shift();

        return params;

    },

    handleUrl: function(url) {

        // Найти текущий роут
        let previousRoute = this.findPreviousActiveRoute();

        // Найти новый роут
        let newRoute = this.findNewActiveRoute(url);

        let routeParams = this.getRouteParams(newRoute, url);

        // Если есть роут с которого уходим - выполнить его .onLeave

        Promise.resolve()
            .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(...this.currentRouteParams))
            // После этого выполнить .onBeforeEnter для нового активного роута
            .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(...routeParams))
            // После этого выполнить .onEnter для ногового активного роута ( только если с .onBeforeEnter все ок)
            .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(...routeParams))
            .then(() => {
                this.currentRoute = newRoute;
                this.currentRouteParams = routeParams;
            })

    },
};