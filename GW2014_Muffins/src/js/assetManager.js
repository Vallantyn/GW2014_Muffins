define(['eventManager', 'manifest/assets'], function (evMgr, manifest)
{
    var ASSET_PATH = "assets/img/";
    var EXT = ".png";
    var _assets = {};
    var _toload = 0;

    console.debug(manifest);
    var event =
    {
        ASSETS_LOADED: 'AssetsLoaded'
    };

    evMgr.Add(event.ASSETS_LOADED, onAssetsLoaded);

    function add(name, asset)
    {
        var _a = _assets[name];
        if (!_a)
        {
            _assets[name] = asset;
        }
        else
        {
            console.warn("ASSET "+ name +" ALREADY EXISTS!");
        }
    }

    function preLoad()
    {
        for (var asset in manifest) {
            load(asset, manifest[asset]);
        }
    }

    function load(name, assetPath, cb)
    {
        var img = new Image();
        img.src = ASSET_PATH + assetPath + EXT;
        _toload++;

        img.onload = function ()
        {
            console.info("ASSET "+ name +" LOADED");
            add(name, img);
            cb && cb();

            _toload--;
            if (_toload <= 0)
            {
                evMgr.Fire(event.ASSETS_LOADED);
            }
        }
    }

    function onAssetsLoaded()
    {
        console.log('ALL ASSETS LOADED DOOD!');
    }

    function get(name)
    {
        var _a = _assets[name];
        if (!_a)
        {
            console.warn("ASSET " + name + " DOESN'T EXISTS!");
            _a = null;
        }

        return _a;
    }

    return {
        get event()
        {
            return event;
        },
        PreLoad: preLoad,
        Get: get
    };
});