//Parent Sprit Class
class Sprite {
    constructor(sprite_json, x, y, start_state){
        this.sprite_json = sprite_json;
        this.x = x;
        this.y = y;
        this.state = start_state;
        this.root_e = "poke";

        this.cur_frame = 0;

        this.cur_bk_data = null;

        this.x_v = 10;
        this.y_v = 0;

    }

    draw(state){
        var ctx = canvas.getContext('2d');

        //console.log(this.sprite_json[this.root_e][this.state][this.cur_frame]['w']);
        console.log(state['key_change']);

        if(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] == null){
            console.log("loading");
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] = new Image();
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'].src = 'sprite_girl/' + this.root_e + '/' + this.state + '/' + this.cur_frame + '.png';
        }

        if( this.cur_bk_data != null){
            ctx.putImageData(this.cur_bk_data , (this.x - this.x_v) , (this.y - this.y_v));
        }

        this.cur_bk_data = ctx.getImageData(this.x, this.y, 
                        this.sprite_json[this.root_e][this.state][this.cur_frame]['w'], 
                        this.sprite_json[this.root_e][this.state][this.cur_frame]['h']);


        ctx.drawImage(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'], this.x, this.y );

        this.cur_frame = this.cur_frame + 1;
        if(this.cur_frame >= this.sprite_json[this.root_e][this.state].length){
            console.log(this.cur_frame);
            this.cur_frame = 0;
        }

        if(this.x >= (window.innerWidth - this.sprite_json[this.root_e][this.state][this.cur_frame]['w']) ){
            this.bound_hit('E');
        }else if(this.x <= 0){
            this.bound_hit('W');
        }else if(this.y >= (window.innerHeight - this.sprite_json[this.root_e][this.state][this.cur_frame]['h']) ){
            this.bound_hit('S');
        }else if(this.y <= 0){
            this.bound_hit('N');
        }else{
            this.x = this.x + this.x_v;
            this.y = this.y + this.y_v;
        }
        return false;
    }

    set_idle_state(){
        this.x_v = 0;
        this.y_v = 0;
        const idle_state = ["idle"];
    }

    bound_hit(side){
            this.set_idle_state();
   }
    handleKeyDown(event) {
        switch(event.key) {
            case 'ArrowUp':
                this.y_v = -10;
                break;
            case 'ArrowDown':
                this.y_v = 10;
                break;
            case 'ArrowLeft':
                this.x_v = -10;
                break;
            case 'ArrowRight':
                this.x_v = 10;
                break;
        }
    }
}