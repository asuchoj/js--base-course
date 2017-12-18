"use strict";
/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

mocha.setup("bdd");
let assert = chai.assert;

describe("Test", function() {
    it("test", function() {
        assert.isOk(true);
    });
});
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
        it("trigger is method", function() {
            assert.isOk( typeof eb.off === 'function');
        });
    });
    describe("once", function() {
        it("trigger is method", function() {
            assert.isOk( typeof eb.once === 'function');
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