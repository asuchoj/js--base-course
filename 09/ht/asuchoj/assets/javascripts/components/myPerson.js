// Главный герой
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
        console.log(this.x + '----' + this.y);

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
        this.speed = 1;


        /*if( this.name === 'player') {
            console.log(this.x + '--1--' + this.y);
        } else {
            console.log(this.x + '--1--' + this.y);
        }*/



        if(['up', 'right', 'left', 'down'].some(i => options[i])) {
            this.up = options.up;
            this.right = options.right;
            this.left = options.left;
            this.down = options.down;
        }

        if(this.left){
            this.x += -1*this.speed;
            this.y += 0;
        }
        if(this.right){
            this.x += this.speed;
            this.y += 0;
        }
        if(this.up){
            this.x += 0;
            this.y += -1*this.speed;
        }
        if(this.down){
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

// врвг первого уровня
class EnemyOneLevel extends Person {
    getUrl() { return 'img/skeleton.png'; }
}