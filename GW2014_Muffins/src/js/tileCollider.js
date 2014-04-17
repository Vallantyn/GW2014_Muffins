define(['collisions'], function (Collisions)
{
    var TileCollider = function (parent) {
        this.parent = parent;
    }

    TileCollider.prototype.CheckGround = function (tile) {
        var ret = Collisions.BoxBox(this.parent.x, this.parent.y, this.parent.width, this.parent.height, tile.x, tile.y, tile.width, tile.height);
        return ret;
    }

    TileCollider.prototype.CheckWall = function (tile) {
        var ret = Collisions.PointBox(this.parent.x, this.parent.y, tile.x, tile.y, tile.width, tile.height);
        if (!ret) ret = Collisions.PointBox(this.parent.x, this.parent.y + this.parent.height, tile.x, tile.y, tile.width, tile.height);
        if (!ret) ret = Collisions.PointBox(this.parent.x + this.parent.width, this.parent.y, tile.x, tile.y, tile.width, tile.height);
        if (!ret) ret = Collisions.PointBox(this.parent.x + this.parent.width, this.parent.y + this.parent.height, tile.x, tile.y, tile.width, tile.height);

        return ret;
    }

    return TileCollider;
});