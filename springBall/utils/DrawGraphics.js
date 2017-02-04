/**
 * Created by kunnisser on 2017/1/20.
 * 绘制图形类
 */
class DrawGraphics{
    constructor() {};

    static createRectTexture(game, width, height, color, nick) {
        void 0 === color && (color = '#000000');
        let hexColor = Phaser.Color.hexToColor(color),
            nickFlag = !!nick,
            bmd = game.add.bitmapData(width, height, nick, nickFlag);
            bmd.fill(hexColor.r, hexColor.g, hexColor.b);
            return bmd;
    };

    static createCircleTexture(game , radius, color, nick) {
        void 0 === color && (color = '#000000');
        let nickFlag = !!nick,
            bmd = game.add.bitmapData(2 * radius, 2 * radius, nick, nickFlag);
        return bmd.circle(radius, radius, radius, color),
            bmd;
    }
}

export default DrawGraphics;