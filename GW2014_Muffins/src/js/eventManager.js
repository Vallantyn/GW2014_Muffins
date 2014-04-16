define(function ()
{
    var _events = {};

    function add(evName, cb)
    {
        var _e = _events[evName];
        
        if (_e != undefined) 
        {
            _e.push(cb);
        }
        else 
        {
            _e = [cb];
        }

        _events[evName] = _e;
    };

    function remove(evName, cb)
    {
        if (!cb)
            delete _events[evName];
        else
            for (var e in _events[evName])
                if (_events[evName][e] == cb)
                    _events[evName].splice(e, 1);
    };

    function fire(evName, args)
    {
        var _e = _events[evName];

        if (_e != undefined)
            for (var e in _e)
                _e[e](args);
    };

    return {
        Add: add,
        Remove: remove,
        Fire: fire
    };
});