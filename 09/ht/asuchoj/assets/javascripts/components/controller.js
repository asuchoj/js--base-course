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
        this.canvas.width = FIELD_WIDTH;
        this.canvas.height = FIELD_HEIGHT;
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
        console.log('1');
        this.clear();
        this.person.newPos({
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



class Person{
    constructor(name,ctx, width, height, color = 'green', x, y ){
        this.name = name;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;
    }
    update(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
/*        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);*/

        ctx.restore();
        return this;
    }
    newPos(options) {
        this.speed = 0;
        options.left && (this.speed = -5);
        options.right && (this.speed = 5);
        options.up && (this.speed = -5);
        options.down && (this.speed = 5);

        if(options.left){
            this.x += this.speed;
            this.y += 0;
        }
        if(options.right){
            this.x += this.speed;
            this.y += 0;
        }
        if(options.up){
            this.x += 0;
            this.y += this.speed;
        }
        if(options.down){
            this.x += 0;
            this.y += this.speed;
        }



        if (this.x > FIELD_WIDTH) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = FIELD_WIDTH;
        }
        if (this.y > FIELD_HEIGHT) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = FIELD_HEIGHT;
        }
        return this;
    }
}






