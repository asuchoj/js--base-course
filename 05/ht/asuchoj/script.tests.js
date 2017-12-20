"use strict";
/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

mocha.setup("bdd");
let assert = chai.assert;

describe("new EventBus", function() {
    let eb;

    beforeEach(() => eb = new EventBus());

    it("EventBus is function", function() {
        assert.isOk( typeof EventBus === 'function');
        assert.isOk( (new EventBus) instanceof EventBus);
    });
    describe('on with trigger', () => {
        it("on is method", function() {
            assert.isOk( typeof eb.on === 'function');
        });
        it("trigger is method", function() {
            assert.isOk( typeof eb.trigger === 'function');
        });
        it('call subscriber', () => {
            let i = 0;
            eb.on('some:event', () => i++);
            eb.trigger('some:event');
            assert.isOk(i === 1);
        });
        it('call subscriber for diff events', () => {
            let i = 0;
            let j = 0;
            eb.on('some:event1', () => i++);
            eb.on('some:event2', () => j++);
            eb.trigger('some:event1');
            eb.trigger('some:event2');
            assert.isOk(i === 1);
            assert.isOk(j === 1);
        });
        it('call multiple subscribers', () => {
            let i = 0;
            let j = 0;
            eb.on('some:event1', () => i++);
            eb.on('some:event1', () => j++);
            eb.trigger('some:event1');
            assert.isOk(i === 1);
        });
        it('call works with standart props', () => {
            let i = 0;
            let j = 0;
            eb.on('toString', () => i++);
            eb.on('toString', () => j++);
            eb.trigger('toString');
            assert.isOk(i === 1);
        });
        it('pass param from trigger', () => {
            let i = 0;
            eb.on('event', (x) => i = i + x);
            eb.trigger('event', 5);
            assert.isOk(i === 5);
        });
        it('pass multiple params from trigger', () => {
            let i = 0;
            eb.on('event', (x, y) => i = '' + i + x +y);
            eb.trigger('event', 5, 6);
            assert.isOk(i === '056');
        });
        it('works with no subscibers', () => {
            eb.trigger('event', 5, 6);
            assert.isOk(true);
        })
    });

    describe("off", function() {

        let cb1 = function(){};
        let cb2 = function(){};


        it("off является методом", function() {
            assert.isOk( typeof eb.off === 'function');
        });

        it( "1. Удаляет только обработчик cb1", function() {
            eb.on('some:event', cb1);
            eb.on('some:event', cb2);
            eb.off('some:event', cb1);
            eb.listeners['some:event'].forEach((b)=>{
                assert.isOk( b !== cb1);
                assert.isOk( b === cb2);
            });
        });

        it("2. Удаляет все обработчики события 'some:event'", function() {
            eb.on('some:event', cb1);
            eb.on('some:event', cb2);
            eb.on('some:event2', cb1);
            eb.off('some:event');
            assert.isOk( !eb.listeners['some:event']);
            assert.isOk( eb.listeners['some:event2']);

        });

        it("3. Удаляет все обработчики cb1 для всех событий", function() {
            eb.on('some:event', cb1);
            eb.on('some:event', cb2);
            eb.on('some:event1', cb1);
            eb.on('some:event1', cb2);
            eb.on('some:event2', cb1);
            eb.on('some:event2', cb2);

            eb.off( null, cb1);

            for( let key in eb.listeners){
                eb.listeners[key].forEach((b)=>{
                    assert.isOk( b !== cb1);
                    assert.isOk( b === cb2);
                });
            }

        });

        it("4. Удаляет все обратные вызовы в `object`", function() {

            eb.on('some:event', cb1);
            eb.on('some:event1', cb2);

            eb.off();
            assert.isOk( Object.keys( eb.listeners ).length === 0 );
        });
    });

    describe("once", function() {

        it("on is method", function() {
            assert.isOk( typeof eb.once === 'function');
        });

        it("once вызывается один раз для одного метода ", function() {
            let a = 0;
            let cb = function () {
              return a++;
            };

            eb.once('some:event', cb);
            eb.trigger('some:event');
            eb.trigger('some:event');
            eb.trigger('some:event');

            assert.isOk( a ===  1);
        });
    });
    describe (`от Василия`, function () {
        it(`проверка off`, function () {

            let p;

            function User(name) { this.greet = () => { p = name}}
            let u1 = new User('Bob');
            let u2 = new User('Sam');

            eb.on('hello', u1.greet);
            eb.on('hello', u2.greet);
            eb.off('hello', u1.greet);
            eb.trigger('hello');


            assert.isOk( p === 'Sam');

        });
    });
    describe ('tests of Yarmolenka Siarhei', function () {

      it(`how many events - so many function calls`, function() {
        let eb = new EventBus();
        let i = 0;
        function func() {i++;};
        eb.on(`s1`, func);
        eb.on(`s1`, func);
        eb.once(`s2`, func);
        eb.trigger(`s1`);
        assert.equal(i, 2);
        eb.trigger(`s2`);
        assert.equal(i, 3);
      });

      it(`a real example`, function() {
        let str = ``;
        let eb = new EventBus();
        let object = {
          set number(x) {
            eb.trigger(`call${x}`, x);
          }
        };
        function Watcher() {};
        Watcher.prototype.change = function(num) {
          str += num;
        };
        let watcher1 = new Watcher();
        eb.on(`call3`, function(x) {watcher1.change(x);});
        let watcher2 = new Watcher();
        eb.on(`call1`, function(x) {watcher2.change(x);});
        let watcher3 = new Watcher();
        eb.on(`call8`, function(x) {watcher3.change(x);});
        let watcher4 = new Watcher();
        eb.on(`call0`, function(x) {watcher4.change(x);});
        for (let i = 0; i < 10; i++) {
          object.number = i;
        }
        assert.equal(str, `0138`);
      });

      it(`a check metod of vvscode`, function() {
        try {
          let eb = new EventBus();
          let cb = function(){null};

          eb.on(`some`, cb);
          eb.off(`some`, cb);

        } catch (error) {
          console.log(error);
          assert.equal(1, 0);
        }
        assert.equal(1, 1);
      });
    });
});

mocha.run();