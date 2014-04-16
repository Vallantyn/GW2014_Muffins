var Repletion = function (x,y){
    //classe de la jauge de faim
    this.x = x;
    this.y = y;
    this.meter = 160;
    this.fillRatio = 1;
    this.draw = function(){
        //affichage de la jauge
        if(frame % 20 == 0){
            //this.meter--;
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
        context.fillRect(this.x, this.y,this.meter * this.fillRatio,50);
        context.restore();
        context.strokeRect(this.x, this.y,this.meter,50);
    }

    this.setHunger = function(value)
    {
        this.fillRatio = value;
    }
}

function skillBar()
{
    this.skillButtons = [];
}

skillBar.prototype.Start = function()
{
    //console.log(this)
    for (var i = 0; i < 6; i++) {
        this.skillButtons.push(new skillButton(35 + i * 50, 100, 50,50));
    };

}

skillBar.prototype.Render = function()
{
    for (var i = 0; i < this.skillButtons.length; i++) {
        this.skillButtons[i].Render();
    };

}




function skillButton(x, y,width, height, action)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.action = action;
}


skillButton.prototype = 
{
    x : 0,
    y : 0,
    width : 50,
    height : 50,
    img : null,
    action : function(){},
    Render : function()
    {
        if(this.img != null)
            context.drawImage(this.img, this.x, this.y, this.width, this.height);
        else
        {
            context.strokeStyle = "#FFF";
            context.strokeRect(this.x - this.width/2, this.y -  this.height/2,this.width,this.height);
            
        }
    }
}
