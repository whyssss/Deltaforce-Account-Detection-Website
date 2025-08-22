import React, { useState } from 'react';
import { DetectionResultType, DetectionFormData } from '../types';
import axios from 'axios';

interface AccountDetectionFormProps {
  onDetectionComplete: (result: DetectionResultType) => void;
  setIsLoading: (loading: boolean) => void;
}

const AccountDetectionForm: React.FC<AccountDetectionFormProps> = ({
  onDetectionComplete,
  setIsLoading
}) => {
  const [formData, setFormData] = useState<DetectionFormData>({
    username: '',
    uid: ''
  });
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // 清除错误信息
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username && !formData.uid) {
      setError('请输入用户名或UID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/detect-account', formData);
      
      if (response.data.success) {
        onDetectionComplete(response.data);
      } else {
        setError('检测失败，请重试');
      }
    } catch (error: any) {
      console.error('检测错误:', error);
      setError(error.response?.data?.error || '网络错误，请检查后端服务是否启动');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          输入账号信息
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              用户名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="输入三角洲游戏用户名"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="text-center text-gray-500 text-sm">或者</div>

          <div>
            <label htmlFor="uid" className="block text-sm font-medium text-gray-700 mb-2">
              UID
            </label>
            <input
              type="text"
              id="uid"
              name="uid"
              value={formData.uid}
              onChange={handleInputChange}
              placeholder="输入三角洲游戏UID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🚀 开始AI检测
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>💡 提示：</p>
          <p className="mt-1">1. 只需输入用户名或UID其中之一即可</p>
          <p className="mt-1">2. AI将基于公开数据进行智能分析</p>
          <p className="mt-1">3. 无需登录或Cookie，直接查询</p>
        </div>
      </div>
    </div>
  );
};

export default AccountDetectionForm; 