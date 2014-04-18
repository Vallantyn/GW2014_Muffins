define(['sceneManager'], function (sceneManager)
{
    return function Log(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.cooldown = 1000 * 30;

        function remove()
        {
            sceneManager.currentScene.RemoveChild(this);
            console.log(sceneManager.currentScene.logs.indexOf(this));
            sceneManager.currentScene.logs.splice(sceneManager.currentScene.logs.indexOf(this), 1);
        }

        var delay = setTimeout(remove.bind(this), this.cooldown);

        this.forceRemove = function()
        {
            clearTimeout(delay);
            remove.bind(this)();
        }

        this.Render = function (context)
        {
            context.fillStyle = "brown";
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
});