define(['spriteRenderer', 'spriteAnimation', "sceneManager"], function ( spriteRenderer, spriteAnimation, sceneManager )
{
    return function SheepGFX()
    {
        var sprite;

        var _y = 0;

        var anims =
            {
                WALK: "walk",
                EAT: "eat",
                DYING: "dying",
                DEAD: "dead",
                ROLL: "roll",
                SURPRISE: "surprise",
                RUN: "run",
                EXPLODED: "exploded",
                EMPALE_R: "empale_right",
                EMPALE_L: "empale_left",
            };

        function init(oy, leader) {

            if(!leader)
                sprite = new spriteRenderer('sheep_spritesheet', 11, 9);
            else
                sprite = new spriteRenderer('belier_spritesheet', 11, 9);

            sprite.SetOffset(-20, -46+oy);

            sprite.AddAnim(anims.WALK, new spriteAnimation(0, 0, 11, 100));
            sprite.AddAnim(anims.EAT, new spriteAnimation(1, 0, 6, 100), true);
            sprite.AddAnim(anims.DYING, new spriteAnimation(2, 0, 10, 100));
            sprite.AddAnim(anims.DEAD, new spriteAnimation(2, 9, 1, 100));
            sprite.AddAnim(anims.ROLL, new spriteAnimation(3, 0, 6, 100));
            sprite.AddAnim(anims.SURPRISE, new spriteAnimation(4, 0, 6, 100));
            sprite.AddAnim(anims.RUN, new spriteAnimation(5, 0, 5, 100));
            sprite.AddAnim(anims.EXPLODED, new spriteAnimation(6, 0, 1, 100));
            sprite.AddAnim(anims.EMPALE_R, new spriteAnimation(7, 0, 10, 100));
            sprite.AddAnim(anims.EMPALE_L, new spriteAnimation(8, 0, 10, 100));

            sprite.AddEvent(anims.WALK, 10, 'MOVE_END');
            sprite.AddEvent(anims.WALK, 0, 'MOVE_JUMP_START');
            sprite.AddEvent(anims.WALK, 4, 'MOVE_JUMP_END');
            sprite.AddEvent(anims.SURPRISE, 5, 'SURPRISE_END');
            sprite.AddEvent(anims.RUN, 4, 'RUN_END');
            sprite.AddEvent(anims.DYING, 9, 'DEAD_N_COLD');
        };

        function update(dt) {
            sprite.Update(dt);
        };

        function render(cx, sheep) {
            switch (sheep.state)
            {
                case 'idle':
                    sprite.Play(anims.EAT);
                    break;
                case 'surprise':
                    sprite.Play(anims.SURPRISE);
                    break;
                case 'eating':
                    sprite.Play(anims.EAT);
                    break;
                case 'moving':
                    sprite.Play(anims.WALK);
                    break;
                case 'running':
                    sprite.Play(anims.RUN);
                    break;
                case 'slashed':
                    sprite.Play(anims.DYING);
                    break;
                case 'dead':
                    sprite.Play(anims.DEAD);
                    break;
                default:
            }

            sprite.Render(cx, sheep.x, sheep.y, sheep.right);
        };

        return {
            Init: init,
            Update: update,
            Render: render
        };
    };
});