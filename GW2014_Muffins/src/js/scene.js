define(['game'], function (game)
{
    return function Scene(initCb)
    {
        var _inited = false;
        var _objects = {};

        function init(iCb)
        {
            iCb && iCb();

            for (var o in _objects)
            {
                _objects[o].Init && _objects[o].Init();
            }

            _inited = true;

            console.debug(_objects);
        };

        function update(dt)
        {
            if (!_inited) init(initCb);

            for (var o in _objects)
            {
                _objects[o].Update && _objects[o].Update(dt);
            }
        };

        function render(cx)
        {
            for (var o in _objects)
            {
                _objects[o].Render && _objects[o].Render(cx);
            }
        };

        function addChild(child) {
            var id = game.GetId();
            child._id = id;
            _objects[id] = child;
            return id;
        }

        function removeChild(obj) {
            if (obj in _objects || _objects[obj._id])
                delete _objects[obj._id];
        }

        function unLoad()
        {
            _inited = false;
            _objects = {};
        }

        var scene =
        {
            Update: update,
            Render: render,
            AddChild: addChild,
            RemoveChild: removeChild,
            UnLoad: unLoad
        };

        return scene;
    };
});