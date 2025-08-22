import React from 'react';
import { DetectionResultType } from '../types';

interface DetectionResultProps {
  result: DetectionResultType;
  onNewDetection: () => void;
}

const DetectionResult: React.FC<DetectionResultProps> = ({ result, onNewDetection }) => {
  const formatScore = (score: number | string | undefined) => {
    if (typeof score === 'number') {
      return score;
    }
    if (typeof score === 'string') {
      const num = parseFloat(score);
      return isNaN(num) ? score : num;
    }
    return 'N/A';
  };

  const getScoreColor = (score: number | string | undefined) => {
    const num = typeof score === 'number' ? score : parseFloat(String(score));
    if (isNaN(num)) return 'text-gray-500';
    if (num >= 80) return 'text-green-600';
    if (num >= 60) return 'text-yellow-600';
    if (num >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string | undefined) => {
    if (!risk) return 'text-gray-500';
    switch (risk.toLowerCase()) {
      case '低':
        return 'text-green-600';
      case '中':
        return 'text-yellow-600';
      case '高':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}小时${minutes}分钟`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8">
        {/* 头部信息 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🎯 账号检测结果
          </h2>
          <p className="text-lg text-gray-600">
            账号：<span className="font-semibold text-blue-600">{result.account}</span>
          </p>
          <p className="text-sm text-gray-500">
            检测时间：{new Date(result.timestamp).toLocaleString('zh-CN')}
          </p>
        </div>

        {/* 玩家数据展示 */}
        {result.playerData && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              🎮 玩家数据
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 基本信息 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-4">📊 基本信息</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">用户名：</span>
                    <span className="font-semibold">{result.playerData.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">数据来源：</span>
                    <span className="font-semibold">{result.playerData.source}</span>
                  </div>
                  {result.playerData.data.profile?.level && (
                    <div className="flex justify-between">
                      <span className="text-blue-700">等级：</span>
                      <span className="font-semibold">{result.playerData.data.profile.level}</span>
                    </div>
                  )}
                  {result.playerData.data.profile?.experience && (
                    <div className="flex justify-between">
                      <span className="text-blue-700">经验值：</span>
                      <span className="font-semibold">{result.playerData.data.profile.experience}</span>
                    </div>
                  )}
                  {result.playerData.data.profile?.joinDate && (
                    <div className="flex justify-between">
                      <span className="text-blue-700">加入日期：</span>
                      <span className="font-semibold">{result.playerData.data.profile.joinDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 游戏统计 */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <h4 className="text-lg font-semibold text-purple-800 mb-4">🏆 游戏统计</h4>
                <div className="space-y-2 text-sm">
                  {result.playerData.data.stats?.totalGames && (
                    <div className="flex justify-between">
                      <span className="text-purple-700">总游戏数：</span>
                      <span className="font-semibold">{result.playerData.data.stats.totalGames}</span>
                    </div>
                  )}
                  {result.playerData.data.stats?.winRate && (
                    <div className="flex justify-between">
                      <span className="text-purple-700">胜率：</span>
                      <span className="font-semibold">{result.playerData.data.stats.winRate}</span>
                    </div>
                  )}
                  {result.playerData.data.stats?.averageScore && (
                    <div className="flex justify-between">
                      <span className="text-purple-700">平均分数：</span>
                      <span className="font-semibold">{result.playerData.data.stats.averageScore}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 成就信息 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <h4 className="text-lg font-semibold text-green-800 mb-4">💰 成就信息</h4>
                <div className="space-y-2 text-sm">
                  {result.playerData.data.achievements?.totalAchievements && (
                    <div className="flex justify-between">
                      <span className="text-green-700">总成就数：</span>
                      <span className="font-semibold">{result.playerData.data.achievements.totalAchievements}</span>
                    </div>
                  )}
                  {result.playerData.data.achievements?.rareItems && (
                    <div className="flex justify-between">
                      <span className="text-green-700">稀有物品：</span>
                      <span className="font-semibold">{result.playerData.data.achievements.rareItems}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI分析评分卡片 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            🤖 AI智能分析
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">唐人程度</div>
                <div className={`text-4xl font-bold ${getScoreColor(result.result.tangren_score)}`}>
                  {formatScore(result.result.tangren_score)}
                </div>
                <div className="text-sm text-blue-600 mt-1">评分</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">爆率分析</div>
                <div className={`text-4xl font-bold ${getScoreColor(result.result.explosion_rate_score)}`}>
                  {formatScore(result.result.explosion_rate_score)}
                </div>
                <div className="text-sm text-purple-600 mt-1">评分</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">黑屋局风险</div>
                <div className={`text-4xl font-bold ${getRiskColor(result.result.black_room_risk)}`}>
                  {result.result.black_room_risk || 'N/A'}
                </div>
                <div className="text-sm text-orange-600 mt-1">风险等级</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">综合强度</div>
                <div className={`text-4xl font-bold ${getScoreColor(result.result.overall_strength)}`}>
                  {formatScore(result.result.overall_strength)}
                </div>
                <div className="text-sm text-green-600 mt-1">评分</div>
              </div>
            </div>
          </div>
        </div>

        {/* 详细分析 */}
        {result.result.analysis && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              📊 详细分析
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {result.result.analysis}
              </p>
            </div>
          </div>
        )}

        {/* 建议举措 */}
        {result.result.recommendations && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              💡 优化建议
            </h3>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {result.result.recommendations}
              </p>
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="text-center space-x-4">
          <button
            onClick={onNewDetection}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🔍 检测新账号
          </button>
          
          <button
            onClick={() => {
              const resultText = `
三角洲账号检测结果
账号：${result.account}
检测时间：${new Date(result.timestamp).toLocaleString('zh-CN')}

${result.playerData ? `
玩家数据：
用户名：${result.playerData.username}
数据来源：${result.playerData.source}
等级：${result.playerData.data.profile?.level || '未知'}
总游戏数：${result.playerData.data.stats?.totalGames || '未知'}
胜率：${result.playerData.data.stats?.winRate || '未知'}

` : ''}
AI分析结果：
唐人程度：${result.result.tangren_score}
爆率分析：${result.result.explosion_rate_score}
黑屋局风险：${result.result.black_room_risk}
综合强度：${result.result.overall_strength}

详细分析：${result.result.analysis}

优化建议：${result.result.recommendations}
              `;
              navigator.clipboard.writeText(resultText);
              alert('结果已复制到剪贴板！');
            }}
            className="bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            📋 复制结果
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetectionResult; 