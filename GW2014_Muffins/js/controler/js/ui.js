var Repletion = function (x,y){
    //classe de la jauge de faim
    this.x = x;
    this.y = y;
    this.meter = 160;
    this.draw = function(){
        //affichage de la jauge
        if(frame % 20 == 0){
            this.meter--;
        }
        if(this.meter <= this.x){
            this.meter = 0;
        }
        /*if(condition){
            //recharge de la jauge, placer une condition cuissedepoulet == true;
            this.meter += 30;
        }
        if(this.meter > 160){
            this.meter = 160;
        }*/
        context.fillStyle = "red";
        context.fillRect(this.x, this.y,this.meter,50);
    }
}