/**
 * Created by kunnisser on 2017/1/19.
 * 构建配置Canvas
 */
import GameConfigCreator from '../config/GameConfigCreator';
import Boot from '../states/Boot';
import Preloader from '../states/Preloader';
import MainMenu from '../states/MainMenu';
import Level from '../states/Level';
import Rank from '../states/Rank';

class GameInit extends Phaser.Game{
    constructor() {
        let conf = GameConfigCreator.createConfig();
        super(conf);
        this.isDomainAllowed() === !1 || this.inIframe() || (
        this.state.add('Boot', Boot, !0),
        this.state.add('Preloader', Preloader, !1),
        this.state.add('MainMenu', MainMenu, !1),
        this.state.add('Level', Level, !1),
        this.state.add('Rank', Rank, !1));
    };

    isDomainAllowed() {
        let Net = new Phaser.Net(this),
            allowUrls = ['192.168.2.101', 'localhost', 'yizhandi.applinzi.com', 'www.me2u.com.cn', '192.168.0.172'],
            currentUrl = Net.getHostName();
            return currentUrl === null ? !0 : allowUrls.some((u)=> currentUrl.indexOf(u) > -1)
    };

    inIframe() {
        try {
            return window.self !== window.top;
        } catch(a){
            return !0;
        }
    };

    changeState(nextState, bool) {
        let plugins = this.plugins.plugins;
        plugins[0].changeState(nextState, bool);
    };

    static isDeskTop = !1;
    static development = !1;
    static weakDevice = !1;
}

export default GameInit;
