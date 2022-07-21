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
};

export type ChampeonFullInfos = {
    id: string;
    key: number;
    name: string;
    title: string;
    image: {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };
    skins: [
      {
        id: number;
        num: number;
        name: string;
        chromas: false;
      }
    ];
    lore: string;
    blurb: string;
    tags: [];
    passive: [
      name: string,
      description: string,
      image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
      }
    ];
};
