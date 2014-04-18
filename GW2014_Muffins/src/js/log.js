define(['sceneManager', 'spriteRenderer', 'spriteAnimation'], function (sceneManager, spriteRenderer, spriteAnimation)
{
    return function Log(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.cooldown = 1000 * 30;

        var sprite = new spriteRenderer('fx_spritesheet', 10, 8);
        sprite.AddAnim('logTotem', new spriteAnimation(7, 0, 1, 100), true);

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

        this.Update = function(dt)
        {
            sprite.Update(dt);
        }

        this.Render = function (cx)
        {
//            context.fillStyle = "brown";
            //            context.fillRect(this.x, this.y, this.width, this.height);
            sprite.Render(cx, this.x - 92 + 44, this.y - 92 - 32);
        }
    }
});