export interface DetectionResultType {
  success: boolean;
  account: string;
  result: {
    tangren_score?: number | string;
    explosion_rate_score?: number | string;
    black_room_risk?: string;
    overall_strength?: number | string;
    analysis?: string;
    recommendations?: string;
  };
  playerData?: {
    username: string;
    source: string;
    data: {
      profile?: {
        level?: number;
        experience?: number;
        joinDate?: string;
      };
      stats?: {
        totalGames?: number;
        winRate?: string;
        averageScore?: number;
      };
      achievements?: {
        totalAchievements?: number;
        rareItems?: number;
      };
    };
  };
  timestamp: string;
}

export interface DetectionFormData {
  username?: string;
  uid?: string;
} 