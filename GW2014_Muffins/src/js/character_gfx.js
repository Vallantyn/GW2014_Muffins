define(['assetManager', 'spriteRenderer', 'spriteAnimation'], function (assetManager, spriteRenderer, spriteAnimation) {
    return function CharacterGFX(w, h)
    {
        var color = 'blue';
        var width = w;
        var height = h;

        var sprite;

        var anims =
        {
            STAND: 'stand',
          
            WALK: 'walk',
          
            JUMP: 'jump',
          
            ATTACK: 'attack',
          
            DIG: 'dig',
          
            BRIDGE: 'bridge'
        };

        function init()
        {
            sprite = new spriteRenderer('wolf_spritesheet', 14, 12);

            sprite.AddAnim(anims.STAND + '_R', new spriteAnimation(2, 0, 8, 100));
            sprite.AddAnim(anims.STAND + '_L', new spriteAnimation(3, 0, 8, 100), true);

            sprite.AddAnim(anims.WALK + '_R', new spriteAnimation(8, 0, 6, 100));
            sprite.AddAnim(anims.WALK + '_L', new spriteAnimation(9, 0, 6, 100));

            sprite.AddAnim(anims.JUMP + '_R', new spriteAnimation(0, 0, 9, 100));
            sprite.AddAnim(anims.JUMP + '_L', new spriteAnimation(1, 0, 9, 100));

            sprite.AddAnim(anims.ATTACK + '_R', new spriteAnimation(6, 0, 14, 100));
            sprite.AddAnim(anims.ATTACK + '_L', new spriteAnimation(7, 0, 14, 100));

            sprite.AddAnim(anims.DIG + '_R', new spriteAnimation(6, 0, 14, 100));
            sprite.AddAnim(anims.DIG + '_L', new spriteAnimation(7, 0, 14, 100));

            sprite.AddAnim(anims.BRIDGE + '_R', new spriteAnimation(4, 0, 12, 100));
            sprite.AddAnim(anims.BRIDGE + '_L', new spriteAnimation(5, 0, 12, 100));

            sprite.AddEvent(anims.WALK + '_R', 5, 'WALK_END');
            sprite.AddEvent(anims.WALK + '_L', 5, 'WALK_END');
        };

        function update(dt)
        {
            sprite.Update();
        };

        function render(cx, wolf)
        {
            var anim;
            switch (wolf.state)
            {
                case 'stand':
                    anim = anims.STAND;
                    break;
                case 'walk':
                    anim = anims.WALK;
                    break;
                case 'jump':
                    anim = anims.JUMP;
                    break;
                case 'attack':
                    anim = anims.ATTACK;
                    break;
                case 'dig':
                    anim = anims.DIG;
                    break;
                case 'bridge':
                    anim = anims.BRIDGE;
                    break;
            }

            anim += wolf.right ? '_R' : '_L';

            console.log(anim);

            cx.strokeStyle = 'lime';
            cx.strokeRect(wolf.x - wolf.width / 2, wolf.y - wolf.yOffset - wolf.height/2, wolf.width, wolf.height);

            sprite.Play(anim);
            sprite.Render(cx, wolf.x - wolf.width / 2, wolf.y - wolf.yOffset - wolf.height / 2);
        };

        return {
            Init: init,
            Update: update,
            Render: render
        };
    }
});