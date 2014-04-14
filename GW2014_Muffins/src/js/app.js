requirejs.config({
    //By default load any module IDs from src/js
    baseUrl: 'src/js',
    //except, if the module ID starts with "lib",
    //load it from the /lib directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        lib: '../../lib'
    }
});

// Start the main app logic.
// requiring (src/js/) main.js
requirejs(['main'],
function (main)
{
    //
    // DO MAIN THINGZ HERE DOOD =D
    //
});