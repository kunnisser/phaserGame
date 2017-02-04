/**
 * Created by kunnisser on 2017/1/20.
 * 构建主菜单
 */
import Config from '../config/Config';
import GameInit from '../combine/GameInit';
import SimpleButton from '../combine/SimpleButton';

class MainMenu extends Phaser.State {
    constructor() {
        super();
        this.fromPreloader = !1;
    };

    init(bool) {
        this.fromPreloader = bool;
    };

    create() {
      this.mainSpritebatch = this.add.spriteBatch(this.world);
      this.addBackWall();
      this.addMenuHeader();
      this.addMenuTitle();
      this.addTutorial();
      this.addClouds();
      this.addBackLight();
      this.addStartButton();
      this.resize();
      GameInit.weakDevice || this.initAnimate();
    };

    addBackWall() {
        this.backWall = this.add.image(0, 0, 'main_menu', 'bgColor.png', this.mainSpritebatch);
    };

    addMenuHeader() {
        this.menuHeader = this.add.image(0, 0, 'main_menu', 'menuHeader.jpg', this.mainSpritebatch);
    };

    addMenuTitle() {
        this.menuTitle = this.add.image(0, 0, 'main_menu', 'title.png', this.mainSpritebatch);
        this.menuTitle.anchor.set(.5);
        this.menuTitle.position.set(Config.HALF_GAME_WIDTH, this.menuHeader.height * .45);
    };

    addTutorial() {
        this.tutorial = this.add.image(0, 0, 'tutorial' , this.mainSpritebatch);
        this.tutorial.anchor.set(.5);
        this.tutorial.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT + 100);
        this.tutorial.scale.set(0);
    };

    addClouds() {
        this.clouds = [];
        for (let a = 1, b = 6; a <= b; a++){
            let c = this.add.image(0, 0, 'main_menu', 'cloud' + a + '.png', this.mainSpritebatch);
            c.anchor.set(.5);
            this.clouds.push(c);
        }
    };

    addBackLight() {
        this.backLight = this.add.image(0, 0, 'main_menu', 'backLight.png', this.mainSpritebatch);
        this.backLight.anchor.set(.5);
        this.backLight.position.set(Config.GAME_WIDTH - 120, Config.GAME_HEIGHT - 110);
    };

    addStartButton() {
        this.startButton = new SimpleButton(this.game, 0, 0, 'main_menu', 'start.png');
        this.startButton.angle = -15;
        this.startButton.setCallbackDelay(300);
        this.startButton.callback.addOnce(()=>{
            this.game.changeState('Level');
        });
        this.startButton.position.set(this.backLight.x+30, this.backLight.y);
        this.world.add(this.startButton);
    }

    resize() {
        this.backWallResize();
        this.alignClouds();
    };
    
    backWallResize() {
        let natureBackWallW = this.backWall.width / this.backWall.scale.x,
            natureBackWallH = this.backWall.height / this.backWall.scale.y;
        this.backWall.scale.set(Config.GAME_WIDTH / natureBackWallW, Config.GAME_HEIGHT / natureBackWallH);
    };

    alignClouds() {
        this.clouds[0].position.set(50, 300);
        this.clouds[1].position.set(170, Config.GAME_HEIGHT - 260);
        this.clouds[2].position.set(Config.GAME_WIDTH - 50, 420);
        this.clouds[3].position.set(50, Config.GAME_HEIGHT - 110);
        this.clouds[4].position.set(Config.GAME_WIDTH - 100, Config.GAME_HEIGHT - 160);
        this.clouds[5].position.set(Config.GAME_WIDTH - 120, Config.GAME_HEIGHT - 50);
    };

    initAnimate() {
        this.animateTitle();
        this.animateBackLight();
        this.animateTutorial();
        this.shakeStartButton();
    };

    animateTitle() {
        this.menuTitle.y = .5 * -this.menuTitle.height;
        this.menuTitle.scale.set(.33, .33);
        this.game.add.tween(this.menuTitle).to({
                y : this.menuHeader.height * .45
            }, 800, Phaser.Easing.Back.Out, !0, 200);
        this.game.add.tween(this.menuTitle.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Back.Out, !0, 400);
    };

    animateBackLight() {
        this.backLight.alpha = .75;
        this.game.add.tween(this.backLight).to({
            alpha : 1
        }, 1000, Phaser.Easing.Cubic.Out, !0, 200, 1e4, !0);
        this.game.add.tween(this.backLight.scale).to({
            x : 1.2,
            y : 1.2
        }, 1000, Phaser.Easing.Cubic.Out, !0, 200, 1e4, !0);
    };

    animateTutorial() {
        this.game.add.tween(this.tutorial.scale).to({
            x : 1,
            y : 1
        }, 400, Phaser.Easing.Back.Out, !0, 400);
    };

    shakeStartButton() {
        this.time.events.repeat(2200, Number.MAX_VALUE, ()=>{
            this.game.add.tween(this.startButton.scale).to({
                x: 1.1,
                y: .9
            }, 150, Phaser.Easing.Cubic.Out, !0, 0, 2, !0);
        });
    };
}

export default MainMenu;