/**
 * Created by kunnisser on 2017/1/24 0024.
 *糖果对象 Bomb
 */
import Config from '../config/Config';

class Bomb extends Phaser.Sprite{
    constructor(game, jiongdog) {
        super(game, 0, 0, 'interface', 'bomb.png');
        this.jiongdog = jiongdog;
        this.paused = !1;
        this.score = 0;
        this.candyType = 4;
        this.clicked = !1;
        this.anchor.set(.5);
        this.disableInput = !1;
        this.inputEnabled = !0;
        this.gravity = .35 / 16.67;
        this.direct = this.game.rnd.sign(1);
        this._velocityX = this.game.rnd.integerInRange(5 * this.direct, 7 * this.direct);
        this.deactivate();
        this.addExplosion();
        this.candyBindClick();
    };

    addExplosion() {
        this.explosion = this.game.add.image(0, 0, 'interface', 'explosion.png');
        this.explosion.anchor.set(.5);
        this.explosion.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT);
        this.explosion.visible = !1;
        this.explosion.scale.set(0);
    };

    update() {
        this.paused || this.exists && (!this.clicked && this.updateMovement());
    }

    updateMovement() {
        this._velocityY += this.gravity * this.game.time.physicsElapsedMS;
        this.x = this.x + this._velocityX;
        this.y = this.y + this._velocityY;
        (this.x < 0 || this.x > Config.GAME_WIDTH || this.y < 0 || this.y > Config.GAME_HEIGHT) && (this.deactivate());
        this.angle += this.game.rnd.integerInRange(-3,-6);
    };

    candyBindClick() {
        this.events.onInputDown.add(this.onInputDown, this);
    };

    onInputDown() {
        this.disableInput || (
            this.jiongdog.alive = !1,
            this.clicked = !0,
            this.input.enabled = !1,
            this.game.state.getCurrentState().score += this.score,
            this.game.state.getCurrentState().scoreText.setText(this.game.state.getCurrentState().score),
            this.deactivate(),
            this.explosion.visible = !0,
            this.game.add.tween(this.explosion.scale).to({
                x : 1,
                y : 1
            }, 400, Phaser.Easing.Cubic.Out, !0).onComplete.add(()=>{
                this.input.enabled = !0;
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
        this.scale.set(1.1);
        this._velocityY = this.game.rnd.integerInRange(-410 / 16.67, -380 / 16.67);
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

export default Bomb;