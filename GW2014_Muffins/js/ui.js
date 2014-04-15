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
        context.save();
        context.globalAlpha = 0.7;
        var my_gradient=context.createLinearGradient(0,0,this.meter,0);
        my_gradient.addColorStop(0,"red");
        my_gradient.addColorStop(0.5,"orange");
        my_gradient.addColorStop(1,"yellow");
        context.fillStyle=my_gradient;
        context.fillRect(this.x, this.y,this.meter,50);
        context.restore();
    }
}