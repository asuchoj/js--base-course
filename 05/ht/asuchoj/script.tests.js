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

        it (`.on, .off, .trigger, .once are functions`, function () {
            assert.equal(typeof eb.on, `function`);
            assert.equal(typeof eb.off, `function`);
            assert.equal(typeof eb.trigger, `function`);
            assert.equal(typeof eb.once, `function`);
        });
        it (`accept callback and call it's`, function () {
            let a = 0;
            function some () { a = 5; }
            eb.on(`some`, some);
            eb.trigger(`some`);
            assert.equal(a, 5);
        });
        it (`transfer parametrs for callback`, function () {
            let a = 0;
            function some (x, y) { a = x + y; }
            eb.on(`some`, some);
            eb.trigger(`some`, 5, 6);
            assert.equal(a, 11);
            eb.trigger(`some`, 4, 0);
            assert.equal(a, 4);
        });
        it (`transfer any quantity parametrs for callback`, function () {
            let a = `js-base-course`;
            let str = ``;
            let arr = a.split(``);
            function some () {
                for (let i = 0; i < arguments.length; i++) {
                    str += arguments[i];
                }
            }
            eb.on(`some`, function () {
                some.apply(null, arr);
            });
            eb.trigger(`some`);
            assert.equal(str, a);
        });
        it (`write events with same names`, function () {
            let a, b;
            eb.on(`some`, function () {
                a = 2;
            });
            eb.on(`some`, function () {
                b = 3;
            });
            eb.trigger(`some`);
            assert.equal(a + b, 5);
        });
        it (`.once will perform once`, function () {
            let a, b;
            eb.on(`some`, function func1(x) {
                a = x;
            });
            eb.once(`some`, function func2(x) {
                b = x;
            });
            eb.trigger(`some`, 5);
            assert.equal(a, 5);
            assert.equal(b, 5);
            eb.trigger(`some`, 8);
            assert.equal(a, 8);
            assert.equal(b, 5);
        });
        it (`.off without second parameter deletes events with same name`, function () {
            let a, b;
            eb.on(`some`, function func1(x) {
                a = x;
            });
            eb.on(`some`, function func2(x) {
                b = x;
            });
            eb.trigger(`some`, 5);
            assert.equal(a, 5);
            assert.equal(b, 5);
            eb.off(`some`);
            eb.trigger(`some`, 7);
            assert.equal(a, 5);
            assert.equal(b, 5);
        });
        it (`.off with second parameter deletes only an event is equal callback`, function () {
            let a, b;
            function func1(x) {a = x;};
            function func2(x) {b = x;};
            eb.on(`some`, func1);
            eb.on(`some`, func2);
            eb.trigger(`some`, 4);
            assert.equal(a, 4);
            assert.equal(b, 4);
            eb.off(`some`, func1);
            eb.trigger(`some`, 8);
            assert.equal(a, 4);
            assert.equal(b, 8);
        });
    });
});

mocha.run();