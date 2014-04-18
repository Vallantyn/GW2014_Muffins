define(['assetManager', 'spriteRenderer', 'spriteAnimation'], function (assetManager, spriteRenderer, spriteAnimation) {
    return function CharacterGFX(w, h)
    {
        var color = 'blue';
        var width = w;
        var height = h;

        var sprite;
        var sprites = [];

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
            sprites[0] = new spriteRenderer('wolf_spritesheet', 14, 12);
            sprites[1] = new spriteRenderer('wolfsheep_spritesheet', 14, 12);

            for (var i = 0; i < sprites.length; i++) {
                var sp = sprites[i];

                sp.AddAnim(anims.STAND + '_R', new spriteAnimation(2, 0, 8, 100));
                sp.AddAnim(anims.STAND + '_L', new spriteAnimation(3, 0, 8, 100), true);

                sp.AddAnim(anims.WALK + '_R', new spriteAnimation(8, 0, 6, 100));
                sp.AddAnim(anims.WALK + '_L', new spriteAnimation(9, 0, 6, 100));

                sp.AddAnim(anims.JUMP + '_R', new spriteAnimation(0, 0, 9, 100));
                sp.AddAnim(anims.JUMP + '_L', new spriteAnimation(1, 0, 9, 100));

                sp.AddAnim(anims.ATTACK + '_R', new spriteAnimation(6, 0, 14, 50));
                sp.AddAnim(anims.ATTACK + '_L', new spriteAnimation(7, 0, 14, 50));

                sp.AddAnim(anims.DIG + '_R', new spriteAnimation(6, 0, 14, 100));
                sp.AddAnim(anims.DIG + '_L', new spriteAnimation(7, 0, 14, 100));

                sp.AddAnim(anims.BRIDGE + '_R', new spriteAnimation(4, 0, 12, 100));
                sp.AddAnim(anims.BRIDGE + '_L', new spriteAnimation(5, 0, 12, 100));

                sp.AddEvent(anims.WALK + '_R', 5, 'WALK_END');
                sp.AddEvent(anims.WALK + '_L', 5, 'WALK_END');
                sp.AddEvent(anims.ATTACK + '_R', 6, 'ATTACK_HIT');
                sp.AddEvent(anims.ATTACK + '_L', 6, 'ATTACK_HIT');
                sp.AddEvent(anims.ATTACK + '_R', 13, 'ATTACK_END');
                sp.AddEvent(anims.ATTACK + '_L', 13, 'ATTACK_END');
            }
        };

        function update(dt)
        {
            for (var i = 0; i < sprites.length; i++) {
                sprites[i].Update();
            }
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

            sprite = wolf.isHidden ? sprites[1] : sprites[0];

            sprite.Play(anim);
            sprite.Render(cx, wolf.x - 48, wolf.y + wolf.yOffset - 96);
        };

        return {
            Init: init,
            Update: update,
            Render: render
        };
    }
});