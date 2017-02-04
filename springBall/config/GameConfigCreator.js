/**
 * Created by kunnisser on 2017/1/19.
 * 配置生成器
 */

import Game from '../combine/GameInit';
import Config from './Config';
import detect from '../assets/src/detect.min';

class GameConfigCreator {
    constructor() {};

    static createConfig() {
        Game.isDeskTop = GameConfigCreator.checkDesktop();
        let destTopFlag = Game.isDeskTop,
            w = Config.SOURCE_GAME_WIDTH,
            h = Config.SOURCE_GAME_HEIGHT;
        return {
            width: w,
            height: h,
            renderer: Phaser.AUTO,
            antialias: !1,
            enableDebug: Game.development
        }
    };

    static checkDesktop() {
        let valve = !1
            , agent = detect.parse(window.navigator.userAgent);
        return "Desktop" === agent.device.type && (valve = !0,
                agent.device.family.indexOf("Nexus") > -1 && (valve = !1)),
                valve
    }

}

export default GameConfigCreator;