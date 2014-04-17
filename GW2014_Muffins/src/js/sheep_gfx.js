define(['spriteRenderer', 'spriteAnimation'], function ( spriteRenderer, spriteAnimation )
{
    return function SheepGFX()
    {
        var sprite;

        var anims =
            {
                WALK: "walk",
                EAT: "eat",
                DIE: "die",
                ROLL: "roll",
                SURPRISE: "surprise",
                RUN: "run",
                DEAD: "dead",
            };

        function init() {
            sprite = new spriteRenderer('sheep_spritesheet', 11, 8);
            sprite.SetOffset(-20, -46);

            sprite.AddAnim(anims.WALK, new spriteAnimation(0, 0, 11, 100));
            sprite.AddAnim(anims.EAT, new spriteAnimation(1, 0, 6, 100), true);
            sprite.AddAnim(anims.DIE, new spriteAnimation(2, 0, 10, 100));
            sprite.AddAnim(anims.ROLL, new spriteAnimation(3, 0, 6, 100));
            sprite.AddAnim(anims.SURPRISE, new spriteAnimation(4, 0, 6, 100));
            sprite.AddAnim(anims.RUN, new spriteAnimation(5, 0, 5, 100));
            sprite.AddAnim(anims.DEAD, new spriteAnimation(6, 0, 1, 100));
        };

        function update(dt) {
            sprite.Update(dt);
        };

        function render(cx, sheep) {
            cx.strokeStyle = "crimson";
            cx.strokeRect(sheep.x, sheep.y, sheep.width, sheep.height);
            sprite.Render(cx, sheep.x, sheep.y, sheep.right);
        };

        return {
            Init: init,
            Update: update,
            Render: render
        };
    };
});