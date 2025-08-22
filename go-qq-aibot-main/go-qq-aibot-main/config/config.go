package config

import (
	"encoding/json"
	"os"
)

type WebSearch struct {
	ApiUrl string `json:"api_url"`
	Cookie string `json:"cookie"`
}

type QQBot struct {
	WSAddr        string   `json:"ws_addr"`
	Key           string   `json:"key"`
	CommandPrefix string   `json:"command_prefix"`
	NickName      []string `json:"nickname"`
	SuperUsers    []int64  `json:"superusers"`
}

type DeepSeek struct {
	ApiUrl    string `json:"api_url"`
	ApiKey    string `json:"api_key"`
	Model     string `json:"model"`
	SysPrompt string `json:"sys_prompt"`
}

type Redis struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
	DB       int    `json:"db"`
}

type Config struct {
	QQBot     QQBot     `json:"qqbot"`
	DeepSeek  DeepSeek  `json:"deepseek"`
	WebSearch WebSearch `json:"websearch"`
	Redis     Redis     `json:"redis"`
}

var gbcf *Config

func init() {
	buffer, err := os.ReadFile("config.json")
	if err != nil {
		panic(err)
	}
	gbcf = &Config{}
	json.Unmarshal(buffer, gbcf)
	// fmt.Println(gbcf)
}

func GetConfig() *Config {
	return gbcf
}
