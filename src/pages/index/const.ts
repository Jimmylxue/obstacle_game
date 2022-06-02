import { getSystemInfoSync } from "@tarojs/taro";
import game_bg from "./gamesource/bg.png";
import baby1 from "./gamesource/1.png";
import baby2 from "./gamesource/2.png";
import baby3 from "./gamesource/3.png";
import flower1 from "./gamesource/flower1.png";
import flower2 from "./gamesource/flower2.png";
import barrier1 from "./gamesource/zhangai1.png";
import barrier2 from "./gamesource/zhangai2.png";
import gift1 from "./gamesource/gift1.png";
import gift2 from "./gamesource/gift2.png";
import music1 from "./gamesource/musicOn.png";
import music2 from "./gamesource/music.png";
import user from "./gamesource/user.pic.jpg";

export const remSize = (num: number) => {
  const info = getSystemInfoSync();
  const scale = info.screenWidth / 390;
  return num * scale;
};

export const SourcesMap = {
  game_bg,
  baby1,
  baby2,
  baby3,
  flower1,
  flower2,
  barrier1,
  barrier2,
  gift1,
  gift2,
  music1,
  music2,
  user,
};

export const HeroSize = {
  width: 80,
  height: 120,
};

export const MushroomSize = {
  width: 40,
  height: 40,
};

export const RadishSize = {
  width: remSize(100),
  height: remSize(120),
};

export const VerticalBarrierSize = {
  width: remSize(200),
  height: remSize(250),
};
export const BroadWiseBarrierSize = {
  width: remSize(600),
  height: remSize(300),
};

export const GiftSize = {
  width: remSize(150),
  height: remSize(180),
};

export enum SLIDER_WAY {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
  RESET,
}

export enum OBSTACLE_TYPE {
  VERTICAL,
  BROAD,
}

export enum FLOWER_TYPE {
  RADISH,
  MUSHROOM,
}

export enum POSITION {
  LEFT = -1,
  CENTER,
  RIGHT,
}

export type SystemInfo = {
  screenWidth: number;
  screenHeight: number;
};

export enum GIFT_TYPE {
  RED_PACKET,
  MILK,
}

export const MusicIconSize = {
  width: remSize(35),
  height: remSize(35),
};

export const UserSize = {
  width: remSize(60),
  height: remSize(60),
};
