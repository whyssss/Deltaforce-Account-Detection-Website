const axios = require('axios');

// 三角洲游戏API配置
const GAME_API_CONFIG = {
    baseUrl: 'https://comm.ams.game.qq.com/ide/',
    headers: {
        'accept-language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        'Content-Type': 'application/json'
    }
};

// 游戏数据接口配置
const GAME_ENDPOINTS = {
    // 战绩数据
    kd: {
        iChartId: '317814',
        sIdeToken: 'QIRBwm'
    },
    // 成就数据
    achievements: {
        iChartId: '316969',
        sIdeToken: 'NoOapI',
        method: 'dfm/center.person.resource',
        source: '5',
        param: JSON.stringify({
            resourceType: 'sol',
            seasonid: [1, 2, 3, 4],
            isAllSeason: true
        })
    },
    // 收益数据
    recent: {
        iChartId: '316969',
        sIdeToken: 'NoOapI',
        method: 'dfm/center.recent.detail',
        source: '5',
        param: JSON.stringify({
            resourceType: 'sol'
        })
    }
};

/**
 * 发送游戏API请求
 * @param {string} cookie - 用户Cookie
 * @param {Object} params - 请求参数
 * @returns {Promise<Object>} API响应数据
 */
async function makeGameApiRequest(cookie, params) {
    try {
        const response = await axios.post(GAME_API_CONFIG.baseUrl, null, {
            headers: {
                ...GAME_API_CONFIG.headers,
                'Cookie': cookie
            },
            params: params
        });

        const data = response.data;
        
        // 检查响应状态
        if (data.sMsg !== 'succ' && data.sMsg !== 'ok') {
            throw new Error(`API错误: ${data.sMsg}`);
        }

        return data;
    } catch (error) {
        console.error('游戏API请求失败:', error);
        throw new Error(`游戏API请求失败: ${error.message}`);
    }
}

/**
 * 获取账号战绩数据
 * @param {string} cookie - 用户Cookie
 * @returns {Promise<Object>} 战绩数据
 */
async function getAccountKd(cookie) {
    try {
        const data = await makeGameApiRequest(cookie, GAME_ENDPOINTS.kd);
        return parseKdData(data);
    } catch (error) {
        throw new Error(`获取战绩数据失败: ${error.message}`);
    }
}

/**
 * 获取账号成就数据
 * @param {string} cookie - 用户Cookie
 * @returns {Promise<Object>} 成就数据
 */
async function getAccountAchievements(cookie) {
    try {
        const data = await makeGameApiRequest(cookie, GAME_ENDPOINTS.achievements);
        return parseAchievementsData(data);
    } catch (error) {
        throw new Error(`获取成就数据失败: ${error.message}`);
    }
}

/**
 * 获取账号收益数据
 * @param {string} cookie - 用户Cookie
 * @returns {Promise<Object>} 收益数据
 */
async function getAccountRecent(cookie) {
    try {
        const data = await makeGameApiRequest(cookie, GAME_ENDPOINTS.recent);
        return parseRecentData(data);
    } catch (error) {
        throw new Error(`获取收益数据失败: ${error.message}`);
    }
}

/**
 * 解析战绩数据
 * @param {Object} data - 原始API数据
 * @returns {Object} 解析后的战绩数据
 */
function parseKdData(data) {
    try {
        const jData = data.jData;
        const userData = jData.userData;
        const careerData = jData.careerData;

        return {
            characterName: userData.charac_name || '未知',
            avatarUrl: userData.picurl || '',
            rankPoint: careerData.rankpoint || 0,
            totalFights: careerData.soltotalfght || 0,
            totalEscapes: careerData.solttotalescape || 0,
            escapeRatio: careerData.solescaperatio || '0%',
            totalDuration: careerData.solduration || 0,
            totalKills: careerData.soltotalkill || 0,
            // 计算K/D比
            kdRatio: careerData.soltotalkill > 0 ? 
                (careerData.soltotalkill / Math.max(careerData.soltotalfght - careerData.solttotalescape, 1)).toFixed(2) : '0.00'
        };
    } catch (error) {
        console.error('解析战绩数据失败:', error);
        throw new Error('战绩数据解析失败');
    }
}

/**
 * 解析成就数据
 * @param {Object} data - 原始API数据
 * @returns {Object} 解析后的成就数据
 */
function parseAchievementsData(data) {
    try {
        const jData = data.jData;
        const solDetail = jData.data?.data?.solDetail;

        if (!solDetail) {
            return {
                redTotalMoney: 0,
                redTotalCount: 0,
                redCollectionDetail: []
            };
        }

        return {
            redTotalMoney: solDetail.redTotalMoney || 0,
            redTotalCount: solDetail.redTotalCount || 0,
            redCollectionDetail: solDetail.redCollectionDetail || []
        };
    } catch (error) {
        console.error('解析成就数据失败:', error);
        throw new Error('成就数据解析失败');
    }
}

/**
 * 解析收益数据
 * @param {Object} data - 原始API数据
 * @returns {Object} 解析后的收益数据
 */
function parseRecentData(data) {
    try {
        const jData = data.jData;
        const solDetail = jData.data?.data?.solDetail;

        if (!solDetail) {
            return {
                recentGain: '0',
                recentGainDate: '未知',
                userCollectionTop: []
            };
        }

        return {
            recentGain: solDetail.recentGain || '0',
            recentGainDate: solDetail.recentGainDate || '未知',
            userCollectionTop: solDetail.userCollectionTop?.list || []
        };
    } catch (error) {
        console.error('解析收益数据失败:', error);
        throw new Error('收益数据解析失败');
    }
}

/**
 * 获取账号综合数据
 * @param {string} cookie - 用户Cookie
 * @returns {Promise<Object>} 综合账号数据
 */
async function getAccountComprehensiveData(cookie) {
    try {
        const [kdData, achievementsData, recentData] = await Promise.all([
            getAccountKd(cookie),
            getAccountAchievements(cookie),
            getAccountRecent(cookie)
        ]);

        return {
            kd: kdData,
            achievements: achievementsData,
            recent: recentData,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        throw new Error(`获取综合数据失败: ${error.message}`);
    }
}

module.exports = {
    getAccountKd,
    getAccountAchievements,
    getAccountRecent,
    getAccountComprehensiveData,
    makeGameApiRequest
}; 