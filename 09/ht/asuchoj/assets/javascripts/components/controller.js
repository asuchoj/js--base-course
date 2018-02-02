"use strict";
let FIELD_WIDTH = document.documentElement.clientWidth;
let FIELD_HEIGHT = document.documentElement.clientHeight;

class GameArena{
    constructor(element, width, height, Person, Enemy) {
        this.canvas = element;
        this.ctx = this.canvas.getContext(`2d`);
        this.person = new Person('player', this.ctx, 50, 50, 50, 50);

        this.characters = [];
        this.characters.push(this.person);

        let monster = new Enemy('enemy', this.ctx, 50, 50, 50, 50);
        monster.right = true;
        this.characters.push(monster);

        this.start();
    }
//старт отрисовки игрыуч
    start() {
        this.canvas.width = FIELD_WIDTH;
        this.canvas.height = FIELD_HEIGHT;
        this.interval = setInterval(this.updateState.bind(this), 20);

        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            this.keys = (this.keys || []);
            this.keys[e.keyCode] = (e.type === "keydown");
        })
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
        this.person.newPos({
                right: this.keys && this.keys[39],
                left: this.keys && this.keys[37],
                up: this.keys && this.keys[38],
                down: this.keys && this.keys[40],
            });

        this.characters.forEach((char) => char.newPos({}).update(this.ctx));
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
    new GameArena(canvas, FIELD_WIDTH, FIELD_HEIGHT, Person, EnemyOneLevel);
});



class Person{
    getUrl(){ return  'img/bodyHuman.png'; }
    constructor(name,ctx, width, height, x, y ){
        this.name = name;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = this.getUrl();
    }

    update(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        let x_position = 0;
        let y_position = 77;

        if(this.right){
            y_position = 205;
        } else if(this.up){
            y_position= 15;
        } else if(this.down) {
            y_position = 142;
        }
        ctx.drawImage(this.sprite, x_position, y_position, 50, 50, 50, 50, 50, 50);
        ctx.restore();
        return this;
    }
    newPos(options) {
        this.speed = 5;

        if(['up', 'right', 'left', 'down'].some(i => options[i])) {
            this.up = options.up;
            this.right = options.right;
            this.left = options.left;
            this.down = options.down;
        }

        if(this.left){
            /*this.ctx.drawImage(this.sprite, 0, 77, 50, 50, 50, 50, 50, 50);*/
            this.x += -1*this.speed;
            this.y += 0;
        }
        if(this.right){
            /*this.ctx.drawImage(this.sprite, 0, 205, 50, 50, 50, 50, 50, 50);*/
            this.x += this.speed;
            this.y += 0;
        }
        if(this.up){
            /*this.ctx.drawImage(this.sprite, 0, 15, 50, 50, 50, 50, 50, 50);*/
            this.x += 0;
            this.y += -1*this.speed;
        }
        if(this.down){
            /*this.ctx.drawImage(this.sprite, 0, 142, 50, 50, 50, 50, 50, 50);*/
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
class EnemyOneLevel extends Person {
    getUrl() { return 'img/skeleton.png'; }

}





