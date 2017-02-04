/**
 * Created by kunnisser on 2017/1/19.
 * 配置参数
 */
class Config {
    constructor() {};
    static SOURCE_GAME_WIDTH = 640;
    static SOURCE_GAME_HEIGHT = 960;
    static GAME_WIDTH = Config.SOURCE_GAME_WIDTH;
    static GAME_HEIGHT = Config.SOURCE_GAME_HEIGHT;
    static HALF_GAME_WIDTH = Config.GAME_WIDTH*.5;
    static HALF_GAME_HEIGHT = Config.GAME_HEIGHT*.5;
    static WORLD_SCALE = 1;
}

export default Config;