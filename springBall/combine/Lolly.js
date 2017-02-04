/**
 * Created by kunnisser on 2017/1/23 0023.
 * 糖果对象 Lolly
 */
import Config from '../config/Config';

class Lolly extends Phaser.Sprite{
    constructor(game, jiongdog) {
        super(game, 0, 0, 'interface', 'lolly.png');
        this.jiongdog = jiongdog;
        this.paused = !1;
        this.score = 2;
        this.candyType = 1;
        this.clicked = !1;
        this.anchor.set(.5);
        this.disableInput = !1;
        this.inputEnabled = !0;
        this.gravity = .3 / 16.67;
        this.direct = this.game.rnd.sign(1);
        this._velocityX = this.game.rnd.integerInRange(2 * this.direct, 6 * this.direct);
        this.deactivate();
        this.addScoreTag();
        this.candyBindClick();
    };

    addScoreTag() {
        let style = {
            font : '35px GrilledCheeseBTNToasted',
            fill : '#FFFFFF',
            align : 'center'
        };
        this.scoreTag = this.game.add.text(0, 0, '+ ' + this.score, style);
        this.scoreTag.visible = !1;
        this.scoreTag.alpha = 1;
        this.scoreTag.anchor.set(.5);
    };

    update() {
        this.paused || this.exists && (!this.clicked && this.updateMovement());
    }

    updateMovement() {
        this._velocityY += this.gravity * this.game.time.physicsElapsedMS;
        this.x = this.x + this._velocityX;
        this.y = this.y + this._velocityY;
        (this.x < 0 || this.x > Config.GAME_WIDTH || this.y < 0 || this.y > Config.GAME_HEIGHT) && (this.deactivate());
        this.angle += this.game.rnd.integerInRange(3,10);
    };

    candyBindClick() {
        this.events.onInputDown.add(this.onInputDown, this);
    };

    onInputDown() {
        this.disableInput || (
            this.clicked = !0,
            this.jiongdog.play('eat'),
            this.input.enabled = !1,
            this.game.state.getCurrentState().score += this.score,
            this.game.state.getCurrentState().scoreText.setText(this.game.state.getCurrentState().score),
            this.scoreTag.position.set(this.x, this.y),
            this.scoreTag.visible = !0,
            this.game.add.tween(this.scoreTag).to({
                y : this.y - 80,
            }, 600, Phaser.Easing.Cubic.Out, !0).onComplete.add(()=>{
                this.game.add.tween(this.scoreTag).to({
                    alpha : 0
                }, 200, Phaser.Easing.Cubic.Out, !0).onComplete.add(()=>{
                  this.scoreTag.visible = !1;
                  this.scoreTag.alpha = 1;
                });
            }),
            this.game.add.tween(this.scale).to({
                x : 0,
                y : 0,
            }, 800, Phaser.Easing.Cubic.Out, !0),
            this.game.add.tween(this).to({
                x : this.jiongdog.x + 30,
                y : this.jiongdog.y
            }, 800, Phaser.Easing.Cubic.Out, !0).onComplete.add(()=>{
                this.input.enabled = !0;
                this.clicked = !1;
                this.jiongdog.play('stay');
                this.deactivate();
            })
        )
    };

    activate() {
        this.exists = !0;
        this.visible = !0;
    }

    deactivate() {
        this.exists = !1;
        this.visible = !1;
        this.scale.set(1.5);
        this._velocityY = this.game.rnd.integerInRange(-400 / 16.67, -300 / 16.67);
    };

    destroy() {
        Phaser.Sprite.prototype.destroy.call(this, !0);
    };

    onKill() {
        this.deactivate();
    };

    onPause() {
        this.paused = !0;
    };

    onResume() {
        this.paused = !1;
    };

    onReset() {

    };
}

export default Lolly;