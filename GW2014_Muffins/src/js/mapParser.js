define(['collisions', 'assetManager'], function (Collisions, assetManager)
{
    var mapParser = function () {

        this.walkable = [];
        this.wall = [];
        this.wallground = [];
        this.killing = [];
        this.offset = 0;
    };

    mapParser.prototype.tileInXY = function (tileMap, x, y) {
        for (var j = 0; j < tileMap.length; j++) {
            if (Collisions.PointBox(x, y, tileMap[j].x, tileMap[j].y, tileMap[j].width, tileMap[j].height))
                return tileMap[j];

        }
        return null;
    };

    mapParser.prototype.parse = function (tiledData) {
        var nmap = [[]];

        this.imageObj = assetManager.Get(tiledData.tilesets[0].name); // "img/" + tiledData.tilesets[0].name + ".jpg";
        var nbColInImg = (tiledData.tilesets[0].imagewidth / tiledData.tilesets[0].tilewidth) | 0;
        var nbRowInImg = (tiledData.tilesets[0].imageheight / tiledData.tilesets[0].tileheight) | 0;

        var curRow = 0;
        var curCol = 0;

        for (var i = 0; i < tiledData.layers[0].data.length; i++) {
            //TODO
            var id = tiledData.layers[0].data[i];
            var tileWidth = tiledData.tilesets[0].tilewidth;
            var tileHeight = tiledData.tilesets[0].tileheight;

            var colInImg = (id - 1) % nbColInImg;
            var rowInImg = ((id - 1) / nbColInImg) | 0;
            var xInImg = colInImg * tileWidth;
            var yInImg = rowInImg * tileHeight;
            var widthInImg = tileWidth;
            var heightInImg = tileHeight;
            if (curCol >= tiledData.width) {
                curCol = 0;
                curRow++;
                nmap[curRow] = [];
            }

            nmap[curRow].push(new Tile(id, tileHeight / 2 + tileHeight * curCol, tileWidth / 2 + curRow * tileWidth, tileWidth, tileHeight, xInImg, yInImg, widthInImg, heightInImg, this.imageObj));

            curCol++;
        };




        for (var i = 1; i < tiledData.layers.length; i++) {
            curRow = 0;
            curCol = 0;
            for (var j = 0; j < tiledData.layers[i].data.length; j++) {
                if (tiledData.layers[i].data[j] != 0) {
                    if (tiledData.layers[i].name == "walkable")
                        this.walkable.push(nmap[curRow][curCol]);
                    if (tiledData.layers[i].name == "wall")
                        this.wall.push(nmap[curRow][curCol]);
                    if (tiledData.layers[i].name == "wallground")
                        this.wallground.push(nmap[curRow][curCol]);
                    if (tiledData.layers[i].name == "killing")
                        this.killing.push(nmap[curRow][curCol]);
                }
                if ((j + 1) % tiledData.width == 0) {
                    curCol = -1;
                    curRow++;
                }
                curCol++;
            };
        };

        return nmap;
    }

    var Tile = function (type, x, y, width, height, xInImg, yInImg, widthInImg, heightInImg, img) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xInImg = xInImg;
        this.yInImg = yInImg;
        this.widthInImg = widthInImg;
        this.heightInImg = heightInImg;

        this.img = img;
    }

    Tile.prototype.move = function(x,y)
    {
    	this.x += x;
    	this.y += y;
    }

    Tile.prototype.draw = function (ctx) {
        if (this.img != null) {
            ctx.drawImage(this.img, this.xInImg, this.yInImg, this.widthInImg, this.heightInImg, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
        //ctx.strokeStyle = "#FFF";
        //ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    return mapParser;
});