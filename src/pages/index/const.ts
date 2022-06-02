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

// export const SourcesMap = {
//   game_bg:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653299449081/bg.png?Expires=3230099449&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=UO7oWpK7Ddki%2F%2BdRcD%2BEeneGGCQ%3D",
//   baby1:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653301284285/1.png?Expires=3230101284&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=OlMZI1BKZZ6%2FyaTiZl6w8ciXXfI%3D",
//   baby2:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653301302310/2.png?Expires=3230101302&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=EDpUonAAQhSTAmoAvJPfVBycX84%3D",
//   baby3:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653301319888/3.png?Expires=3230101319&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=eGCywweIp0Rmcjy8uh0L0nniI2E%3D",
//   flower1:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653306660892/flower1.png?Expires=3230106660&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=Av3BBvrdtyC%2FGaxOwala%2BS8aCts%3D",
//   flower2:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653306697413/flower2.png?Expires=3230106697&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=EBVA6zJU3cUMcAOmd1VE8E1ZPwg%3D",
//   barrier1:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653382913438/zhangai1.png?Expires=3230182913&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=AvtOmc32rA8PnmMuX1U71nIRvSY%3D",
//   barrier2:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653383000277/zhangai2.png?Expires=3230183000&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=Z1Jy0USd7KLgPQ9uq1NNU3UWp0w%3D",
//   gift1:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653878489039/gift1.png?Expires=3230678489&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=ZGPkxkvsA57lyJ%2BZQj4aSKfCodw%3D",
//   gift2:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653878532323/gift2.png?Expires=3230678532&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=8xP9VLpaGXEQZWXESsbhHGwxRGY%3D",
//   music1:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653878595408/musicOn.png?Expires=3230678595&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=hkX8SjwIVh8zfL0C05ixeW7wDlk%3D",
//   music2:
//     "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653878558016/music.png?Expires=3230678558&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=ghC0dqFDm%2Fezd4%2BrP01efAEMjHQ%3D",
//   user: "https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653890846715/user.pic.jpg?Expires=3230690846&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=HDH7p1G8ihuBwqDGx7W0xbYbDI0%3D",
// };

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
