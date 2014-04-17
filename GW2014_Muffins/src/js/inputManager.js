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
        53: 'SKILL_5',
        54: 'SKILL_6'
    };

    var buttonEnum =
    {
        0: 'LMB',
        2: 'RMB'
    };

    var keyState = {}
    var buttonState = {}

    function init()
    {
        window.onkeydown = keyChange;
        window.onkeyup = keyChange;

        window.onmousedown = mouseChange;
        window.onmouseup = mouseChange;
        window.onmousemove = mouseChange;
    };

    function mouseChange(e)
    {
        var _x = (e.clientX - e.target.offsetLeft) * 1280 / e.target.clientWidth
             , _y = (e.clientY - e.target.offsetTop) * 720 / e.target.clientHeight;

        if (e.type == 'mousemove')
        {
            eventManager.Fire('MOUSE_MOVE', { x: _x, y: _y });
            return;
        }

        if (!(e.button in buttonEnum)) return;

        var btn = buttonEnum[e.button];
        var _state = buttonState[btn];

        if (!_state)
            var _state =
            {
                actual: 0,
                last: 0
            };

        _state.last = _state.actual;
        _state.actual = 0;

        if (e.type == 'mousedown')
            _state.actual = 1;

        buttonState[btn] = _state;

        if (_state.last != _state.actual) {
            if (_state.actual == 0) {
                eventManager.Fire(btn + "_UP");
            }
            else {
                eventManager.Fire(btn + "_DOWN");
            }
        }
        else// if (_state.actual == 1)
        {
            eventManager.Fire(btn + "_STAY");
        }
    }

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