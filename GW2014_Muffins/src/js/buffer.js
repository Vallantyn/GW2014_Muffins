define(function ()
{
    return function Buffer(w, h)
    {
        var cv, cx;
        var width, height;

        function init(w, h) {
            width = w;
            height = h;

            cv = document.createElement('canvas');
            cv.width = width;
            cv.height = height;

            cx = cv.getContext('2d');
        }

        function update() {

        }

        function render() {

        }

        var buffer = {
            get width() {
                return width;
            },

            get height() {
                return height;
            },

            get canvas() {
                return cv;
            },

            get context() {
                return cx;
            },

            Init: init,
            Update: update,
            Render: render
        };

        buffer.Init(w, h);

        return buffer;
    };
});