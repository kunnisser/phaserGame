/**
 * Created by kunnisser on 2017/1/24.
 * 积分排行
 */
import Config from '../config/Config';
import Level from '../states/Level';
import SimpleButton from '../combine/SimpleButton';

class Rank extends Phaser.State {
    constructor() {
        super();
    };

    init(scoreData) {
        this.serverData = scoreData[0];
        this.currentValue = scoreData[1];
    };

    create() {
        this.mainSpritebatch = this.add.spriteBatch(this.world);
        this.addBackWall();
        this.addMenuHeader();
        this.addScoreModel();
        this.addScoreTitle();
        this.addScoreContent();
        this.addRank();
        this.addRankButton();
        this.addMyScore();
        this.addTryAgain();
        this.resize();
    };

    addBackWall() {
        this.backWall = this.add.image(0, 0, 'main_menu', 'bgColor.png', this.mainSpritebatch);
    };

    addMenuHeader() {
        this.menuHeader = this.add.image(0, 0, 'main_menu', 'menuHeader.jpg', this.mainSpritebatch);
    };

    addScoreModel() {
        this.modelGroup = this.add.group();
        this.model = this.add.image(0, 0, 'model');
        this.figure = this.add.image(0, 0, 'figure');
        this.modelGroup.add(this.model);
        this.modelGroup.add(this.figure);
        this.model.anchor.set(.5);
        this.figure.anchor.set(.5);
        this.modelGroup.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT + 100);
        this.game.add.tween(this.figure).to({
            alpha : 0
        }, 1000,Phaser.Easing.Cubic.Out, !0, 0, 1e4, !0);
    };

    addScoreTitle() {
        let style = {
            font : '44px Verdana',
            fill : '#ffa577',
            align : 'center'
        };
        this.title = this.game.add.text(0, -100, '个人积分', style);
        this.title.anchor.set(.5);
        this.modelGroup.add(this.title);
        this.modelGroup.visible = !0;
        this.modelGroup.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT);
    };

    addRankButton() {
        this.rankbtn = new SimpleButton(this.game, 0, 0, 'interface', 'viewRank.png');
        this.rankbtn.setCallbackDelay(0);
        this.rankbtn.callback.add(()=>{
            this.modelGroup.visible = !1;
            this.rankGroup.visible = !0;
            this.rankbtn.visible = !1;
            this.scoreBtn.visible = !0;
        });
        this.rankbtn.anchor.set(.5);
        this.rankbtn.position.set(Config.HALF_GAME_WIDTH - 150, Config.GAME_HEIGHT - this.rankbtn.height * 1.2);
        this.world.add(this.rankbtn);
        this.rankbtn.visible = !0;
    };

    addMyScore() {
        this.scoreBtn = new SimpleButton(this.game, 0, 0, 'interface', 'viewScore.png');
        this.scoreBtn.setCallbackDelay(0);
        this.scoreBtn.callback.add(()=>{
            this.modelGroup.visible = !0;
            this.rankGroup.visible = !1;
            this.scoreBtn.visible = !1;
            this.rankbtn.visible = !0;
        });
        this.scoreBtn.anchor.set(.5);
        this.scoreBtn.position.set(Config.HALF_GAME_WIDTH -150, Config.GAME_HEIGHT - this.rankbtn.height * 1.2);
        this.world.add(this.scoreBtn);
        this.scoreBtn.visible = !1;
    };

    addTryAgain() {
        this.restartBtn = new SimpleButton(this.game, 0, 0, 'interface', 'restart.png');
        this.restartBtn.setCallbackDelay(200);
        this.restartBtn.callback.add(()=>{
            this.game.changeState('Level', !0);
        });
        this.restartBtn.anchor.set(.5);
        this.restartBtn.position.set(Config.HALF_GAME_WIDTH + 150, Config.GAME_HEIGHT - this.rankbtn.height * 1.2);
        this.world.add(this.restartBtn);
    };

    addScoreContent() {
        let style = {
            font : '25px GrilledCheeseBTNToasted',
            fill : '#ffa577',
            align : 'center'
        },
            style1 = {
            font : '25px GrilledCheeseBTNToasted',
            fill : '#ffffff',
            align : 'center'
        };
        let key_x = -50,
            value_x = 90,
            first_y = -35;

        this.highValue = 0;
        this.rankValue = 0;
        this.distanceValue = 0;
        this.highValue = this.serverData.highest;
        this.rankValue = this.serverData.myRank;
        this.distanceValue = this.serverData.preScore;

        this.content = [];
        this.scoreCurrent = this.game.add.text(key_x, first_y, '本次游戏得分: ',style);
        this.content.push(this.scoreCurrent);
        this.scoreHigh = this.game.add.text(key_x, first_y + 40, '历史最高积分: ',style);
        this.content.push(this.scoreHigh);
        this.scoreRank = this.game.add.text(key_x, first_y + 80, '当前积分排名: ',style);
        this.content.push(this.scoreRank);
        this.rankDistance = this.game.add.text(key_x, first_y + 120, '距上一名还差: ',style);
        this.content.push(this.rankDistance);
        this.currentText = this.game.add.text(value_x, first_y, this.currentValue+' 分', style1);
        this.content.push(this.currentText);
        this.highText = this.game.add.text(value_x, first_y + 40, this.highValue+' 分', style1);
        this.content.push(this.highText);
        this.rankText = this.game.add.text(value_x, first_y + 80, this.rankValue+' 分', style1);
        this.content.push(this.rankText);
        this.distanceText = this.game.add.text(value_x, first_y + 120, this.distanceValue+' 分', style1);
        this.content.push(this.distanceText);
        this.content.forEach((item)=>{
            item.anchor.set(.5);
            this.modelGroup.add(item);
        });
    };

    addRank() {
        let style = {
                font : '45px GrilledCheeseBTNToasted',
                fill : '#ffa577',
                align : 'center'
            },
            style1 = {
                font : '30px GrilledCheeseBTNToasted',
                fill : '#ffa577',
                align : 'center'
            },
            style2 = {
                font : '20px GrilledCheeseBTNToasted',
                fill : '#ffa577',
                align : 'center'
        };
        this.rankGroup = this.add.group();
        this.rankGroup.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT);
        this.rankTitle = this.add.text(0, -150, '积分排行', style);
        this.rankTitle.anchor.set(.5);
        this.rankGroup.add(this.rankTitle);

        this.rankDataleft = this.serverData.rank;
        this.rankDataright = this.serverData.rank;

        this.rankData = this.rankDataleft.slice(0,5);
        this.rankData1 = this.rankDataright.slice(5,10);
        this.rankLeft = this.add.group();
        this.rankindex = this.add.text(-100, 0, '名次', style1);
        this.rankindex.anchor.set(.5);
        this.rankLeft.add(this.rankindex);
        this.rankname = this.add.text(0, 0, '姓名', style1);
        this.rankname.anchor.set(.5);
        this.rankLeft.add(this.rankname);
        this.rankscore = this.add.text(100, 0, '积分', style1);
        this.rankscore.anchor.set(.5);
        this.rankLeft.add(this.rankscore);
        this.rankData.forEach((data,i)=>{
            this.rank1 = this.add.text(-100, (i + 1) * 70, data.rank, style2);
            this.rank2 = this.add.text(0,  (i + 1) * 70, data.nickName, style2);
            this.rank3 = this.add.text(100,  (i + 1) * 70, data.score, style2);
            this.rank1.anchor.set(.5);
            this.rank2.anchor.set(.5);
            this.rank3.anchor.set(.5);
            this.rankLeft.add(this.rank1);
            this.rankLeft.add(this.rank2);
            this.rankLeft.add(this.rank3);
        });

        this.rankRight = this.add.group();
        this.rankindex1 = this.add.text(-100, 0, '名次', style1);
        this.rankindex1.anchor.set(.5);
        this.rankRight.add(this.rankindex1);
        this.rankname1 = this.add.text(0, 0, '姓名', style1);
        this.rankname1.anchor.set(.5);
        this.rankRight.add(this.rankname1);
        this.rankscore1 = this.add.text(100, 0, '积分', style1);
        this.rankscore1.anchor.set(.5);
        this.rankRight.add(this.rankscore1);

        this.rankData1.forEach((data,i)=>{
            this.rank1 = this.add.text(-100, (i + 1) * 70, data.rank, style2);
            this.rank2 = this.add.text(0,  (i + 1) * 70, data.nickName, style2);
            this.rank3 = this.add.text(100,  (i + 1) * 70, data.score, style2);
            this.rank1.anchor.set(.5);
            this.rank2.anchor.set(.5);
            this.rank3.anchor.set(.5);
            this.rankRight.add(this.rank1);
            this.rankRight.add(this.rank2);
            this.rankRight.add(this.rank3);
        });

        this.rankGroup.add(this.rankLeft);
        this.rankLeft.position.set(-150, -50);
        this.rankGroup.add(this.rankRight);
        this.rankRight.position.set(150, -50);
        this.rankGroup.visible = !1;
    };

    resize() {
        this.backWallResize();
    };

    backWallResize() {
        let natureBackWallW = this.backWall.width / this.backWall.scale.x,
            natureBackWallH = this.backWall.height / this.backWall.scale.y;
        this.backWall.scale.set(Config.GAME_WIDTH / natureBackWallW, Config.GAME_HEIGHT / natureBackWallH);
    };

}

export default Rank;
