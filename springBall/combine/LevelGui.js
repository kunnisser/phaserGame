/**
 * Created by kunnisser on 2017/1/23.
 * 关卡面板
 */
import DrawGraphics from '../utils/DrawGraphics';
import Config from '../config/Config';
import SimpleButton from './SimpleButton';
import TimeCounter from './TimeCounter';

class LevelGui extends Phaser.Group{
    constructor(game,countTime) {
        super(game, game.world, 'gui');
        this.countTime = countTime;
        this.paused = !1;
        this.buttons = [];
        this.addCountTime();
        this.addPauseButton();
        this.addGuiMask();
        this.addGameOver();
        this.addViewRank();
        this.addResumeButton();
        //this.addResetButton();
    };

    addGuiMask(){
        this.guiMaskTexture=DrawGraphics.createRectTexture(this.game, 1, 1, '#000000', 'black_mask');
        this.guiMask = this.game.add.image(0,0, this.guiMaskTexture);
        this.guiMask.scale.set(Config.GAME_WIDTH, Config.GAME_HEIGHT);
        this.guiMask.visible = !1;
        this.guiMask.alpha = .5;
        this.add(this.guiMask);
    };

    addCountTime() {
        this._timeCounter = new TimeCounter(this.game, this.countTime);
        this._timeCounter.position.set(Config.HALF_GAME_WIDTH, 70);
        this.game.world.add(this._timeCounter);
    };

    addPauseButton() {
        this.pauseBtn = new SimpleButton(this.game, 0, 0, 'interface', 'pause.png');
        this.pauseBtn.anchor.set(.5);
        this.pauseBtn.position.set(Config.GAME_WIDTH - this.pauseBtn.width *.5 -15, 65);
        this.pauseBtn.setCallbackDelay(10);
        this.pauseBtn.callback.add(()=>{
            this.game.state.getCurrentState().pause();
        });
        this.game.world.add(this.pauseBtn);
    };

    addResumeButton(){
        this.resumeBtn = new SimpleButton(this.game, 0, 0, 'interface', 'resume.png');
        this.resumeBtn.anchor.set(.5);
        this.resumeBtn.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT);
        this.resumeBtn.setCallbackDelay(200);
        this.resumeBtn.callback.add(()=>{
            this.game.state.getCurrentState().resume();
        });
        this.resumeBtn.visible = !1;
        this.add(this.resumeBtn);
        this.buttons.push(this.resumeBtn);
    };

    addResetButton() {
        this.resetBtn = new SimpleButton(this.game, 0, 0, 'interface', 'restart.png');
        this.resetBtn.anchor.set(.5);
        this.resetBtn.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT+80);
        this.resetBtn.setCallbackDelay(200);
        this.resetBtn.callback.add(()=>{
            this.game.state.getCurrentState().restart();
        });
        this.resetBtn.visible = !1;
        this.add(this.resetBtn);
        this.buttons.push(this.resetBtn);
    };

    addGameOver() {
        this.gameover = this.game.add.image(0, 0, 'interface', 'gameOver.png');
        this.gameover.anchor.set(.5);
        this.gameover.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT-80);
        this.gameover.visible = !1;
        this.add(this.gameover);
    };

    addViewRank() {
        this.viewScore = new SimpleButton(this.game, 0, 0, 'interface', 'viewScore.png');
        this.viewScore.anchor.set(.5);
        this.viewScore.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT+80);
        this.viewScore.setCallbackDelay(200);
        this.viewScore.callback.add(()=>{
            this.game.state.getCurrentState().serverData && this.game.changeState('Rank', [this.game.state.getCurrentState().serverData,
                this.game.state.getCurrentState().score]);
        });
        this.viewScore.visible = !1;
        this.add(this.viewScore);
    }

    onPause() {
        this.paused = !0;
        this._timeCounter.visible = !1;
        this.pauseBtn.visible = !1;
        this.pauseBtn.inputEnabled = !1;
        this.buttons.forEach((btn)=>{
            btn.visible = !0;
        });
        this.guiMask.visible = !0;
        this.gameover.visible = !1;
        this.viewScore.visible = !1;
    };

    onResume() {
        this.paused = !1;
        this.buttons.forEach((btn)=>{
            btn.visible = !1;
        });
        this.guiMask.visible = !1;
        this._timeCounter.visible = !0;
        this.pauseBtn.visible = !0;
        this.pauseBtn.inputEnabled = !0;
    };

    onReset(){
        this.paused = !1;
        this._timeCounter.counter = this.countTime;
        this._timeCounter.setText(this.countTime);
        this.buttons.forEach((btn)=>{
            btn.visible = !1;
        });
        this.guiMask.visible = !1;
        this._timeCounter.visible = !0;
        this.pauseBtn.visible = !0;
        this.pauseBtn.inputEnabled = !0;
    };

    onKill(){
        this.pauseBtn.visible = !1;
        this.pauseBtn.inputEnabled = !1;
        this._timeCounter.visible = !1;
        this.guiMask.visible = !0;
        this.gameover.visible = !0;
        this.viewScore.visible = !0;
    };

    destroy() {
        Phaser.Image.prototype.destroy.call(this);
        this.buttons = null;
    }

    get timeCounter(){
        return this._timeCounter;
    }

}

export default LevelGui;