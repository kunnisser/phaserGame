/**
 * Created by kunnisser on 2017/1/19 0019.
 * BOOT状态
 */
import Game from '../combine/GameInit';
import Config from '../config/Config';
import StateTransition from '../plugin/StateTransition';

class Boot extends Phaser.State{
    constructor() {
        super();
    };

    init() {
        Phaser.Device.isAndroidStockBrowser() && (this.game.canvas.parentElement.style.overflow = 'visible');
        let bootFont = {
            font : '10px GrilledCheeseBTNToasted'
        },
        bootText = this.add.text(0, 0, 'Loading...', bootFont);
        bootText.destroy();
    };

    preload() {
        this.game.device.ie && this.game.device.ieVersion <= 9 && (this.load.useXDomainRequest = !1);
        this.load.atlasJSONHash('preloader', '/springBall/assets/graphics/preloader.png', '/springBall/assets/datamap/preloader.json');
    };

    create() {
        this.setupScale();
        this.setupCanvasStyle();
        this.detectWeakDevice();
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = !0;  //丢失焦点时，暂停游戏
        this.game.plugins.add(new StateTransition(this.game));
        this.game.renderer.clearBeforeRender = !1;
        this.game.state.start('Preloader', !0, !1);
    };

    setupScale() {
        Game.isDeskTop ? this.scaleForDesktop() : (this.scaleForMobile(),
        this.scaleGame(),
        this.isLandscape() && this.onEnterLandscape());
    };

    scaleForDesktop() {
        let baseScale = this.game.scale;
        baseScale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        baseScale.aspectRatio = Config.GAME_WIDTH / Config.GAME_HEIGHT;
        baseScale.pageAlignHorizontally = !0;
        baseScale.pageAlignVertically = !0;
    };

    scaleForMobile() {
        let baseScale = this.game.scale;
        baseScale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        baseScale.forceOrientation(!1, !0);
        baseScale.onSizeChange.add(this.onSizeChange, this);
    };

    onSizeChange() {
        this.isPortrait() ? (this.scaleGame(),
        this.game.state.resize(Config.GAME_WIDTH, Config.GAME_HEIGHT),
        this.onEnterPortrait()) : this.onEnterLandscape();
    };

    onEnterLandscape() {
        document.getElementById('rotate').style.display = 'block';
    };

    onEnterPortrait() {
        document.getElementById('rotate').style.display = 'none';
    }

    isLandscape() {
        return window.innerWidth > window.innerHeight;
    };

    isPortrait() {
        return window.innerWidth < window.innerHeight;
    };

    scaleGame() {
        let screenW = window.innerWidth,
            screenH = window.innerHeight,
            natureW = screenW * this.game.device.pixelRatio,
            canvasW = 0,
            canvasH = 0;
        natureW <= Config.SOURCE_GAME_WIDTH ? (canvasW = 2*screenW,
        canvasH = 2*screenH) : (canvasW = screenW, canvasH = screenH);
        let canvasScale = canvasW / Config.SOURCE_GAME_WIDTH; //2.6.2版本无需进行world缩放，直接设置canvas尺寸
        this.scale.setGameSize(canvasW / canvasScale, canvasH / canvasScale);
        Config.WORLD_SCALE = canvasScale;
        Config.GAME_WIDTH = this.game.canvas.width;
        Config.GAME_HEIGHT = this.game.canvas.height;
        Config.HALF_GAME_WIDTH = .5 * Config.GAME_WIDTH;
        Config.HALF_GAME_HEIGHT = .5 * Config.GAME_HEIGHT;
    };

    setupCanvasStyle() {
        this.game.device.desktop ? (this.game.canvas.style.boxShadow = '0 0 30px black',
            this.game.canvas.parentElement.style.backgroundColor = 'rgb(134, 18, 17)') : this.game.canvas.style.backgroundColor = 'black'
    };

    detectWeakDevice() {
        Game.weakDevice = this.game.renderType === Phaser.CANVAS
    };

}


export default Boot;