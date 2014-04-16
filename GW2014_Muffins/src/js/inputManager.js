define(['eventManager'], function (eventManager)
{
    var keyEnum =
    {
        90: 'UP',
        83: 'DOWN',
        81: 'LEFT',
        68: 'RIGHT',

        32: 'JUMP',
        69: 'ACTION',

        49: 'SKILL_1',
        50: 'SKILL_2',
        51: 'SKILL_3',
        52: 'SKILL_4',
        53: 'SKILL_5'
    };

    var keyState = {}

    function init()
    {
        window.onkeydown = keyChange;
        window.onkeyup = keyChange;

        window.onmousedown = 0;
        window.onmouseup = 0;
        window.onmousemove = 0;
    };

    function keyChange(e)
    {
        if (!(e.keyCode in keyEnum)) return;

        var key = keyEnum[e.keyCode];
        var _state = keyState[key];

        if (!_state)
            var _state =
            {
                actual: 0,
                last: 0
            };

        _state.last = _state.actual;
        _state.actual = 0;

        if (e.type == 'keydown')
            _state.actual = 1;

        keyState[key] = _state;

        if (_state.last != _state.actual)
        {
            if (_state.actual == 0)
            {
                eventManager.Fire(key +"_UP");
            }
            else
            {
                eventManager.Fire(key +"_DOWN");
            }
        }
        else// if (_state.actual == 1)
        {
            eventManager.Fire(key + "_STAY");
        }

    };

    return {
        Init: init
    };
});