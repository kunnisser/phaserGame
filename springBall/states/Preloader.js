/**
 * Created by kunnisser on 2017/1/20.
 * 预加载界面
 */
import Config from '../config/Config';

class Preloader extends Phaser.State{
    constructor() {
        super();
    };

    init() {
        this.addBackground();
        this.addPreloadBar();
        this.addLoadingText();
        this.addCopyright();
        this.resize();
    };

    addBackground() {
        this.bg = this.game.add.image(0, 0, 'preloader', 'Preloader_Background0000');
    };

    addPreloadBar() {
        this.outerPreloaderSprite = this.game.add.image(0, 0, 'preloader', 'Preloader_Outer0000');
        this.outerPreloaderSprite.anchor.set(.5);
        this.outerPreloaderSprite.angle = -90;
        this.outerPreloaderSprite.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT);
        this.innerPreloaderSprite = this.game.add.sprite(0, 0, 'preloader', 'Preloader_Inner0000');
        this.innerPreloaderSprite.angle = -90;
        this.innerPreloaderSprite.x = Config.HALF_GAME_WIDTH - .5 * this.innerPreloaderSprite.height;
        this.innerPreloaderSprite.y = Config.HALF_GAME_HEIGHT + .5 * this.innerPreloaderSprite.width;
    }

    addLoadingText() {
        let style = {
            font : '40px GrilledCheeseBTNToasted',
            fill : '#FFFFFF',
            align : 'center'
        };
        this.loadingText = this.game.add.text(0, 0, '',style);
        this.loadingText.anchor.set(.5);
        this.loadingText.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT + this.outerPreloaderSprite.width);
        this.loadingText.setShadow(2, 2, '#0C1829');
        setTimeout(()=>{this.loadingText.setText('LOADING...')},1);
    }

    addCopyright() {
        let info = '(C) www.ezhandi.com , 2017\n一站地网络科技',
            style = {
                font : '25px Verdana',
                fill : '#FFFFFF',
                align : 'center'
            };
        this.copyright = this.game.add.text(0, 0, info, style);
        this.copyright.anchor.set(.5);
        this.copyright.lineSpacing = 5;
        this.copyright.setShadow(2, 2, '#0C1829');
        this.copyright.position.x = Config.HALF_GAME_WIDTH;
        this.copyright.position.y = Config.GAME_HEIGHT - this.copyright.height;
    };

    preload() {
        this.loadOtherAssets();
        this.loadGraphics();
        this.load.setPreloadSprite(this.innerPreloaderSprite);
    };

    loadOtherAssets() {
        this.load.bitmapFont('digits', '/springBall/assets/fonts/font.png', '/springBall/assets/fonts/font.fnt', null);
    }

    loadGraphics() {
        this.load.image('figure', '/springBall/assets/graphics/figure.png');
        this.load.image('model', '/springBall/assets/graphics/model.png');
        this.load.image('tutorial', '/springBall/assets/graphics/tutorial.png');
        this.load.atlasJSONHash('main_menu', '/springBall/assets/graphics/menu.png', "/springBall/assets/datamap/menu.json");
        this.load.atlasJSONHash('plateform', '/springBall/assets/graphics/plateform.png', "/springBall/assets/datamap/plateform.json");
        this.load.atlasJSONHash('interface', '/springBall/assets/graphics/interface.png', "/springBall/assets/datamap/interface.json");
        this.load.atlasJSONHash('jiongDog', '/springBall/assets/graphics/jiongDog.png', "/springBall/assets/datamap/jiongDog.json");
    };

    loadUpdate() {
        this.loadingText.setText(this.load.progress+'%');
    };

    create() {
        this.game.changeState('MainMenu', !0);
    };

    resize() {
        this.resizeBackground();
    };

    resizeBackground() {
        let natureBgWidth = this.bg.width / this.bg.scale.x,
            natureBgHeight = this.bg.height / this.bg.scale.y;
        this.bg.scale.set(Config.GAME_WIDTH / natureBgWidth, Config.GAME_HEIGHT / natureBgHeight);
    };
}

export default Preloader;