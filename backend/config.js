// 配置文件，用于存储API密钥和处理参数

// API配置
const LLM_API = {
    "base_url": "",  // API基础URL
    "api_key": "",  // API密钥
    "model": "gpt-4o",  // 使用的模型
    "embedding_model": "text-embedding-ada-002"  // 嵌入模型
};

// 尝试不同的API端点格式
const LLM_ENDPOINTS = [
    "/v1/chat/completions",           // 标准OpenAI格式
    "/chat/completions",               // 简化格式
    "/api/chat/completions",           // 带api前缀
    "/v1/completions",                 // 旧版格式
    "/completions"                     // 最简化格式
];

const DEBUG = true;

const SPACY_DEFAULT_MODEL = "en_core_web_sm";

module.exports = {
    LLM_API,
    LLM_ENDPOINTS,
    DEBUG,
    SPACY_DEFAULT_MODEL
}; 