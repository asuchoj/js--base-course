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

        console.log(this.person.x + '----' + this.person.y);

        setTimeout(()=>{
            let monster = new Enemy('enemy', this.ctx, 50, 50, 50, 50);
            monster.up = true;
            this.characters.push(monster);
        }, 5000);

        this.characters.push(monster);
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

newEventBus.on('showCanvas', ()=>{
    console.log('3');
    let canvas = document.querySelector('canvas');
    new GameArena(canvas, FIELD_WIDTH, FIELD_HEIGHT, Person, EnemyOneLevel);
});

