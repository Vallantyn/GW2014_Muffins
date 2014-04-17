define(function ()
{
    return function Log(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

        this.Render = function ()
        {
            context.fillStyle = "brown";
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
});