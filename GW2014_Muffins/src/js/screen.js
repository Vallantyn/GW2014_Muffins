define(['buffer'], function (buffer)
{
    var HEIGHT = 720, WIDTH = 1280, ID = 'game_canvas';

    var backBuffer, frontBuffer;
    
    function init()
    {
        backBuffer = new buffer(WIDTH, HEIGHT);
        frontBuffer = new buffer(WIDTH, HEIGHT);

        frontBuffer.canvas.id = ID;
        window.onresize = resize;
        document.body.appendChild(frontBuffer.canvas);

        resize();
    };

    function clear()
    {
        backBuffer.context.clearRect(0, 0, WIDTH, HEIGHT);
        frontBuffer.context.clearRect(0, 0, WIDTH, HEIGHT);
    };

    function swap()
    {
        frontBuffer.context.drawImage(backBuffer.canvas,0,0);
    };

    function resize()
    {
        var w, h, vw, vh;
        vw = window.innerWidth;
        vh = window.innerHeight;

        nw = (vh * WIDTH) / HEIGHT;
        nh = (vw * HEIGHT) / WIDTH;

        if (nh > vh)
        {
            nh = vh;
            nw = (nh * WIDTH) / HEIGHT;
        }
        else if (nw > vw)
        {
            nw = vw;
            nh = (vw * HEIGHT) / WIDTH;
        }

        frontBuffer.canvas.style.width = nw * .99 + 'px';
        frontBuffer.canvas.style.height = nh * .99 + 'px';
    }

    return {
        Init: init,

        width: WIDTH,
        height: HEIGHT,

        get front()
        {
            return frontBuffer;
        },

        get back()
        {
            return backBuffer;
        },

        Clear: clear,
        Swap: swap
    };
});