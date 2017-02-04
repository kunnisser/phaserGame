/**
 * Created by kunnisser on 2017/1/23.
 * 创建计时器
 */
class TimeCounter extends Phaser.BitmapText{
    constructor(game,t) {
        super(game, 0, 0, 'digits', t, 65);
        this.counter = t;
        this.anchor.set(.5);
    };

    updateCount(ct) {
        this.counter !== ct && (this.counter = ct,
        this.setText(ct.toString()),
        this.game.add.tween(this.scale).to({
            x : 1.25,
            y : .75
        }, 100, Phaser.Easing.Linear.None, !0).onComplete.addOnce(()=>{
            this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Back.Out, !0);
        }));
    };

}

export default TimeCounter;