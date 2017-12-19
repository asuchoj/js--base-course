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
    describe("on", function() {
        it("on is method", function() {
            assert.isOk( typeof eb.on === 'function');
        });
    });
    describe("trigger", function() {
        it("trigger is method", function() {
            assert.isOk( typeof eb.trigger === 'function');
        });
    });

    describe("off", function() {


        let cb1 = function(){};
        let cb2 = function(){};
        let context = 'значение';

        it("off является методом", function() {
            assert.isOk( typeof eb.off === 'function');
        });

        it( "1. Удаляет только обработчик `onChange`", function() {
            eb.on('some:event', cb1);
            eb.on('some:event', cb2);
            eb.off('some:event', cb1);
            eb.listeners['some:event'].forEach((b)=>{
                assert.isOk( b.toString().replace(/\s/g,"") !== cb1.toString().replace(/\s/g,""));
                assert.isOk( b.toString().replace(/\s/g,"") === cb2.toString().replace(/\s/g,""));
            });
        });

        it("2. Удаляет все «обратные» изменения.", function() {
            eb.on('some:event', cb1);
            eb.on('some:event', cb2);
            eb.on('some:event2', cb1);
            eb.off('some:event');
            assert.isOk( !eb.listeners['some:event']);
            assert.isOk( eb.listeners['some:event2']);

        });

        it("3. Удаляет обратный вызов `onChange` для всех событий.", function() {
            eb.on('some:event', cb1);
            eb.on('some:event', cb2);
            eb.on('some:event1', cb1);
            eb.on('some:event1', cb2);
            eb.on('some:event2', cb1);
            eb.on('some:event2', cb2);

            eb.off( null, cb1);

            for( let key in eb.listeners){
                eb.listeners[key].forEach((b)=>{
                    assert.isOk( b.toString().replace(/\s/g,"") !== cb1.toString().replace(/\s/g,""));
                    assert.isOk( b.toString().replace(/\s/g,"") === cb2.toString().replace(/\s/g,""));
                });
            }

        });

        /*it("4. Удаляет все обратные вызовы для контекста для всех событий.", function() {

            eb.on('some:event', cb1(context));
            eb.on('some:event', cb2(context));
            eb.on('some:event1', cb1);
            eb.on('some:event1', cb2(context));

            eb.off( null, null, context);

            for( let key in eb.listeners){
                eb.listeners[key].forEach((b)=>{
                    assert.isOk( b.toString().replace(/\s/g,"") !== cb1.toString().replace(/\s/g,""));
                    assert.isOk( b.toString().replace(/\s/g,"") === cb2.toString().replace(/\s/g,""));
                });
            }
        });*/

        it("5. Удаляет все обратные вызовы в `object`", function() {

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
            }

            eb.once('some:event', cb);
            eb.trigger('some:event');
            eb.trigger('some:event');
            eb.trigger('some:event');

            assert.isOk( a ===  1);
        });
    });

    describe('bus', () => {
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
});

mocha.run();