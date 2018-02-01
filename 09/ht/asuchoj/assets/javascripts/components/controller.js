"use strict";
let FIELD_WIDTH = document.documentElement.clientWidth;
let FIELD_HEIGHT = document.documentElement.clientHeight;


class GameArena{
    constructor(element, width, height, Person){
        this.canvas = element;
        this.ctx = this.canvas.getContext(`2d`);
        this.person = new Person( 'player', this.ctx, 30, 30, 'red', 50, 50);
        this.start();
    }


//старт отрисовки игры
    start() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.interval = setInterval(this.updateState.bind(this), 20);
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            this.keys = (this.keys || []);
            this.keys[e.keyCode] = (e.type === "keydown");
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = (e.type === "keydown");
        })
    }
// остановка отрисовки игры
    stop() {
        clearInterval(this.interval);
    }

//обновляет состояние
    updateState() {
        this.clear();
        this
            .person
            .newPos({
                right: this.keys && this.keys[39],
                left: this.keys && this.keys[37],
                up: this.keys && this.keys[38],
                down: this.keys && this.keys[40],
            })
            .update(this.ctx);
    }

//очистка всего поля
    clear() {
        this
            .ctx
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

newEventBus.on('a1', ()=>{
    let canvas = document.querySelector('canvas');
    new GameArena(canvas, FIELD_WIDTH, FIELD_HEIGHT, Person);
});









