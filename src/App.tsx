import React, { useState } from 'react';
import './App.css';
import AccountDetectionForm from './components/AccountDetectionForm';
import DetectionResult from './components/DetectionResult';
import { DetectionResultType } from './types';

function App() {
  const [detectionResult, setDetectionResult] = useState<DetectionResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDetectionComplete = (result: DetectionResultType) => {
    setDetectionResult(result);
  };

  const handleNewDetection = () => {
    setDetectionResult(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-4xl font-bold text-white mb-2">
          🎯 三角洲账号强度检测
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl">
          基于大模型AI智能分析，一键检测账号唐人程度、爆率、黑屋局风险等
        </p>
      </header>

      <main className="App-main">
        {!detectionResult ? (
          <AccountDetectionForm 
            onDetectionComplete={handleDetectionComplete}
            setIsLoading={setIsLoading}
          />
        ) : (
          <DetectionResult 
            result={detectionResult}
            onNewDetection={handleNewDetection}
          />
        )}
      </main>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="text-white mt-4">AI正在分析账号中...</p>
          </div>
        </div>
      )}

      <footer className="App-footer">
        <p className="text-gray-400 text-sm">
          © 2024 三角洲账号检测系统 - 基于DeepSeek、GPT等大模型AI分析
        </p>
      </footer>
    </div>
  );
}

export default App; 