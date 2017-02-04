/**
 * Created by kunnisser on 2017/1/20.
 * 场景stage切换
 */
import DrawGraphics from '../utils/DrawGraphics';
import Config from '../config/Config';

class StateTransition extends Phaser.Plugin{
    constructor(game) {
        super(game,game.stage);
        this.overlayDuration = 400;
        let blackRect = DrawGraphics.createRectTexture(game, 1, 1, '#000000', 'black_rect');
        this.overlay = new Phaser.Image(game, 0, 0, blackRect);
        this.overlay.visible = !1;
        this.game.stage.addChild(this.overlay);
    };

    fillStage() {
        let overlayW = Config.GAME_WIDTH,
            overlayH = Config.GAME_HEIGHT;
        this.overlay.scale.set(overlayW, overlayH);
    };

    changeState(nextState, bool) {
        this.fillStage();
        this.showOverlay(nextState, bool);
    };

    showOverlay(nextState, bool) {
      this.overlay.visible = !0;
      this.overlay.alpha = 0;
      this.overlayTween = this.game.add.tween(this.overlay).to({
          alpha : 1
      }, this.overlayDuration, Phaser.Easing.Cubic.Out, !0);
      this.overlayTween.onComplete.addOnce(()=>{
          this.doChangeState(nextState, bool)
      });
    };

    doChangeState(nextState, bool) {
        this.game.state.start(nextState, !0, !1, bool);
        setTimeout(()=>{
            this.hideOverlay();
        },100);
        setTimeout(()=>{
           this.overlay.visible = !1;
        }, 100+this.overlayDuration);
    };

    hideOverlay() {
        this.overlayHideTween = this.game.add.tween(this.overlay).to({
            alpha : 0
        }, this.overlayDuration, Phaser.Easing.Cubic.Out, !0);
    };

}

export default StateTransition;