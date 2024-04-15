//Parent Sprit Classa
class Sprite {
    constructor(sprite_json, x, y, start_state){
        this.sprite_json = sprite_json;
        this.x = x;
        this.y = y;
        this.state = start_state;
        this.root_e = "poke";

        this.cur_frame = 0;
        this.frameCount = this.sprite_json[this.root_e][this.state].length;

        this.x_v = 10;
        this.y_v = 0;

        this.loadImage();
    }

    loadImage() {
        const frameData = this.sprite_json[this.root_e][this.state][this.cur_frame];
        this.img = new Image();
        this.img.src = 'sprite_girl/' + this.root_e + '/' + this.state + '/' + this.cur_frame + '.png';
        this.img.onload = () => {
            this.draw();
        };
        this.img.onerror = (error) => {
            console.error("Error loading image:", error);
        };
    }

    draw(){
        var ctx = canvas.getContext('2d');
        //console.log(this.sprite_json[this.root_e][this.state][this.cur_frame]['w']);

        if(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] == null){
            console.log("loading");
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] = new Image();
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'].src = 'sprite_girl/' + this.root_e + '/' + this.state + '/' + this.cur_frame + '.png';
        }
        ctx.drawImage(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'], this.x, this.y );

        this.cur_frame = this.cur_frame + 1;
        if(this.cur_frame >= this.sprite_json[this.root_e][this.state].length){
            console.log(this.cur_frame);
            this.cur_frame = 0;
        }

        this.x = this.x + this.x_v;
        this.y = this.y + this.y_v;

        if(this.x >= window.innerWidth){
            this.x_v = -10;
            this.state = 'walk_W';
        }

        if(this.x <= 0){
            this.x_v = 10;
        }
        
    }
}