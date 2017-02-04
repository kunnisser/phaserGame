/**
 * Created by kunnisser on 2017/1/23 0023.
 * 囧囧狗角色
 */
class JiongDog extends Phaser.Sprite{
    constructor(game) {
        super(game, 0, 0, 'jiongDog');
        this.anchor.set(.5);
        this.alive = !0;
        this.initAnimations();
    };

    initAnimations() {
         this.animations.add("stay", Phaser.Animation.generateFrameNames('dog', 1, 2, '.png'), 2, !0);
         this.animations.add("eat", Phaser.Animation.generateFrameNames('dog', 3, 4, '.png'), 2, !1);
         this.play('stay');
    }

    destroy() {
        Phaser.Sprite.prototype.destroy.call(this, !0);
    };

    onPause() {
        this.paused = !0;
        this.animations.currentAnim.paused = !0;
    };

    onResume() {
        this.paused = !1;
        this.animations.currentAnim.paused = !1;
    };

    onReset() {

    };

    onKill() {
        this.destroy();
    }
}

export  default JiongDog;