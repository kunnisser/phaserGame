/**
 * Created by kunnisser on 2017/1/21 0021.
 * 关卡场景
 */
import Config from '../config/Config';
import LevelGui from '../combine/LevelGui';
import JiongDog from '../combine/JiongDog';
import Lolly from '../combine/Lolly';
import Sugar from '../combine/Sugar';
import Stick from '../combine/Stick';
import Bomb from '../combine/Bomb';

class Level extends Phaser.State{
    constructor() {
        super();
        this.score = 0;
    };

    init() {
        this.score = 0;
        this.plateformDistance = 240;
        this.gameTimer = 0;
        this.shootCounter = 0;
        this.gameInitialTime = 60;
        this.currentTime = this.gameInitialTime;
        this.gameover = !1;
        this.cheatkey = 0;
    };

    create() {
        this.score = 0;
        this.mainSpritebatch = this.add.spriteBatch(this.world, 'main_spritebatch');
        this.createScene();
        this.createPlateforms();
        this.addSceneHeader();
        this.addClouds();
        this.addScorePanel();
        this.addScoreText();
        this.addJiongDog();
        this.createCandys();
        this.addLevelGui();
        this.initPauseables();
        this.resize();
    };

    createScene() {
        this.scene = this.add.image(0, 0, 'main_menu', 'bgColor.png', this.mainSpritebatch);
    };

    createPlateforms() {
        this.plateforms = [];
        for (let n = Math.ceil(Config.GAME_HEIGHT / this.plateformDistance), m = 0; n > m; m++)
            this.createPlateform(m);
    };

    createPlateform(m) {
        this.plateform = this.add.image(0, 0, 'plateform', 'plateform.png', this.mainSpritebatch);
        this.plateform.anchor.set(.5);
        this.plateform.position.set(Config.HALF_GAME_WIDTH, Config.GAME_HEIGHT - this.plateform.height/2 - (this.plateformDistance) * (m) );
        this.plateforms.push(this.plateform);
    };

    addSceneHeader() {
        this.menuHeader = this.add.image(0, 0, 'main_menu', 'menuHeader.jpg', this.mainSpritebatch);
    };

    addClouds() {
        this.clouds = [];
        for (let a = 1, b = 6; a <= b; a++){
            let c = this.add.image(0, 0, 'main_menu', 'cloud' + a + '.png', this.mainSpritebatch);
            c.anchor.set(.5);
            this.clouds.push(c);
        }
    };

    alignClouds() {
        this.clouds[0].position.set(50, 300);
        this.clouds[1].position.set(170, Config.GAME_HEIGHT - 260);
        this.clouds[2].position.set(Config.GAME_WIDTH - 50, 420);
        this.clouds[3].position.set(50, Config.GAME_HEIGHT - 110);
        this.clouds[4].position.set(Config.GAME_WIDTH - 100, Config.GAME_HEIGHT - 160);
        this.clouds[5].position.set(Config.GAME_WIDTH - 120, Config.GAME_HEIGHT - 50);
    };

    addScorePanel() {
        this.scorePanel = this.add.image(0, 0, 'interface', 'scorePanel.png', this.mainSpritebatch);
        this.scorePanel.anchor.set(.5);
        this.scorePanel.inputEnabled = !0;
        this.scorePanel.events.onInputDown.add(this.cheat, this);
        this.scorePanel.position.set(this.scorePanel.width*.5 +15, 65);
    };

    cheat() {
        this.cheatkey++;
        this.cheatkey >=10 && (
            this.cheatkey = 0,
            this.score += 100
        )
    };

    addScoreText() {
        let style = {
            font : '24px GrilledCheeseBTNToasted',
            fill : '#920005',
            align : 'center'
        };
        this.scoreText = this.add.text(0, 0, this.score, style);
        this.scoreText.anchor.set(.5);
        this.scoreText.position.set(this.scorePanel.x + 20, this.scorePanel.y + 2);
    };

    addJiongDog() {
        this.jiongDog = new JiongDog(this.game);
        this.jiongDog.position.set(this.jiongDog.width * .5, Config.GAME_HEIGHT - this.jiongDog.height * .5);
        this.mainSpritebatch.add(this.jiongDog);
    }

    createCandys() {
        this.candys = [];
        for(let a = 0, b=10; a < b; a++)
            this.createNewLolly();
        for(let a = 0, b=6; a < b; a++)
            this.createNewSugar();
        for(let a = 0, b=3; a < b; a++)
            this.createNewStick();
        for(let a = 0, b=2; a < b; a++)
            this.createNewBomb();
    }

    addNewGroupCandy() {
        this.shootCounter++;
        this.currentTime > 50 && this.shootCounter > 60 && (
            this.freeCandys = this.candys.filter((item)=>{
                return item.exists == !1 && (item.candyType == 1);
            }),
            this.shoot(),
            this.shootCounter = 0
        );
        this.currentTime > 20 && this.currentTime <= 50 && this.shootCounter > 30 && (
            this.freeCandys = this.candys.filter((item)=>{
                return item.exists == !1 && (item.candyType == 1 || item.candyType == 2 || item.candyType == 4);
            }),
                this.shoot(),
                this.shootCounter = 0
        );
        this.currentTime > 0 &&  this.currentTime <= 20 && this.shootCounter > 10 && (
            this.freeCandys = this.candys.filter((item)=>{
                return item.exists == !1 && (item.candyType == 1 || item.candyType == 2 || item.candyType == 3 || item.candyType == 4);
            }),
                this.shoot(),
                this.shootCounter = 0
        );
    };

    shoot(){
        this.chosedFreeCandys = this.game.rnd.weightedPick(this.freeCandys);
        this.chosedFreeCandys.activate();
        this.chosedFreeCandys.direct > 0 ? this.chosedFreeCandys.position.set(0, Config.GAME_HEIGHT) :
        this.chosedFreeCandys.position.set(Config.GAME_WIDTH, Config.GAME_HEIGHT)
    };

    createNewLolly() {
        let lolly = new Lolly(this.game, this.jiongDog);
            this.candys.push(lolly);
            this.mainSpritebatch.add(lolly);
    };

    createNewSugar() {
        let sugar = new Sugar(this.game, this.jiongDog);
        this.candys.push(sugar);
        this.mainSpritebatch.add(sugar);
    };

    createNewStick() {
        let stick = new Stick(this.game, this.jiongDog);
        this.candys.push(stick);
        this.mainSpritebatch.add(stick);
    };

    createNewBomb() {
        let bomb = new Bomb(this.game, this.jiongDog);
        this.candys.push(bomb);
        this.mainSpritebatch.add(bomb);
    };

    addLevelGui() {
        this.gui = new LevelGui(this.game, this.gameInitialTime);
    };

    initPauseables() {
        this.pauseables = [this.gui, this.jiongDog];
        this.pauseables = this.pauseables.concat(this.candys);
    };

    update() {
        this.gameover === !1 && (
        this.gui.paused || (this.gameTimer += this.game.time.elapsed,
        this.gameTimer >= 1000 && (this.gameTimer = 0,
        this.gui.timeCounter.updateCount(--this.currentTime)
        ),
        this.addNewGroupCandy(),
        (this.currentTime <= 0 || !this.jiongDog.alive) && (this.gameend(),this.gameover = !0)));
    };

    pause() {
        this.gameTimer = 0;
        this.currentTime === 0 || //规避倒计时1到0的时候仍可点击
        this.pauseables.forEach((pa)=>{
            pa.onPause();
        });
    };

    resume() {
        this.pauseables.forEach((pa)=>{
            pa.onResume();
        });
    };

    restart() {
        this.gameTimer = 0;
        this.currentTime = this.gameInitialTime;
        this.pauseables.forEach((pa)=>{
            pa.onReset();
        });
    };

    gameend() {
        this.pauseables.forEach((pa)=>{
            pa.onKill();
        });
        //http://www.me2u.com.cn/yzdtp/score/getDetail
        var path=require("path");
        console.log(path.join(__dirname, '/springBall/assets/data/test.json'));
        let url='../springBall/assets/data/test.json';
        // 发送到后端
        let xhr = new XMLHttpRequest();
        let data = {
            'score' : this.score
        };
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('postdata='+JSON.stringify(data)); //发送数据
        xhr.onload = ()=>{
            if ( (xhr.status >=200 && xhr.status < 300) || xhr.status == 304 ) {
                this.serverData = JSON.parse(xhr.response);
            }else{
                showMessage('服务器繁忙！')
            }
        };
    };


    resize() {
        this.sceneResize();
        this.alignClouds();
    };

    sceneResize() {
        let natureSceneW = this.scene.width / this.scene.scale.x,
            natureSceneH = this.scene.height / this.scene.scale.y;
        this.scene.scale.set(Config.GAME_WIDTH / natureSceneW, Config.GAME_HEIGHT / natureSceneH);
    };

}

export default Level;