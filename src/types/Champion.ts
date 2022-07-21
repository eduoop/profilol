export type Champeon = {
    championId: number;
    championLevel: number;
    championPoints: number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    lastPlayTime: number;
    summonerId: string;
    tokensEarned: number;
}

export type ChampeonFullInfos = {
    championId: number;
    championLevel: number;
    championPoints: number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    lastPlayTime: number;
    summonerId: string;
    tokensEarned: number;
}