import { useEffect, useState, useRef } from "react";
import { View, Canvas, CanvasTouchEvent } from "@tarojs/components";
import { createCanvasContext, getSystemInfoSync } from "@tarojs/taro";
import { getImgFromRemote, getSlideAngle, getSliderWay } from "./utils";
import {
  SourcesMap,
  SystemInfo,
  FLOWER_TYPE,
  OBSTACLE_TYPE,
  MusicIconSize,
} from "./const";
import Hero from "./views/Hero";
import Obstacle from "./views/Obstacle";
import Display from "./views/Display";
import Time from "./views/Times";
import Flower from "./views/Flower";
import Gift from "./views/Gift";
import ReadyPage from "./pages/ready";

const ObstacleGame = () => {
  const [isStart, setStart] = useState(false);
  const tempImg = useRef(SourcesMap);
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    screenWidth: 0,
    screenHeight: 0,
  });
  let touchPositionX: number, touchPositionY: number;
  const context = createCanvasContext("canvas");
  const hero = useRef<Hero>(); // 主角
  const flowerList = useRef<Flower[]>([]);
  const obstacleList = useRef<Obstacle[]>([]);
  const giftList = useRef<Gift[]>([]);
  const display = useRef<Display>(); // 舞台
  const time = useRef<Time>(); // 时间

  const getPhoneSystemInfo = async () => {
    const info = getSystemInfoSync();
    setSystemInfo({
      screenWidth: info.screenWidth,
      screenHeight: info.screenHeight,
    });

    console.log("info", info);
  };

  const paintBg = async () => {
    context.drawImage(
      tempImg.current.game_bg,
      0,
      0,
      systemInfo.screenWidth,
      systemInfo.screenHeight
    );
    context.draw();
  };

  // const changeImageFromLocal = async () => {
  //   const obj: any = {};

  //   for (const key in tempImg.current) {
  //     // @ts-ignore
  //     const tempUrl = await getImgFromRemote(tempImg.current[key] as string);
  //     obj[key] = tempUrl;
  //   }

  //   tempImg.current = obj;
  // };

  const initPage = async () => {
    // await changeImageFromLocal();
    await getPhoneSystemInfo();
  };

  const touchStartEvent = (e: CanvasTouchEvent) => {
    touchPositionX = e.changedTouches[0].x;
    touchPositionY = e.changedTouches[0].y;
    if (
      touchPositionX >= systemInfo.screenWidth - MusicIconSize.width - 20 &&
      touchPositionX <= systemInfo.screenWidth - 20 &&
      touchPositionY >= 25 &&
      touchPositionY <= 25 + MusicIconSize.height
    ) {
      console.log("点中的是音乐部分");
    }
  };

  const touchMoveEvent = (e: CanvasTouchEvent) => {
    let dy = e.changedTouches[0].y - touchPositionY;
    let dx = e.changedTouches[0].x - touchPositionX;
    let angle = getSlideAngle(dy, dx);
    let slider_way = getSliderWay(angle);
    hero.current?.move(slider_way);
  };

  const createHero = () => {
    hero.current = new Hero(context, systemInfo, tempImg.current);

    setTimeout(() => {
      // hero.current.play()
    }, 3000);
  };

  const createFlower = () => {
    for (let i = 0; i < 4; i++) {
      if (i < 2) {
        flowerList.current.push(
          new Flower(
            context,
            systemInfo,
            tempImg.current,
            i === 0 ? FLOWER_TYPE.MUSHROOM : FLOWER_TYPE.RADISH,
            -1
          )
        );
      } else {
        flowerList.current.push(
          new Flower(
            context,
            systemInfo,
            tempImg.current,
            i === 2 ? FLOWER_TYPE.RADISH : FLOWER_TYPE.MUSHROOM,
            1
          )
        );
      }
    }
  };

  const createBarrier = () => {
    for (let i = 0; i < 3; i++) {
      obstacleList.current?.push(
        new Obstacle(
          context,
          systemInfo,
          tempImg.current,
          OBSTACLE_TYPE.VERTICAL,
          Math.floor(Math.random() * 3) - 1
        )
      );
    }
    obstacleList.current?.push(
      new Obstacle(context, systemInfo, tempImg.current, OBSTACLE_TYPE.BROAD)
    );
  };

  const createText = () => {
    time.current = new Time(context, systemInfo);
  };

  const createGift = () => {
    for (let i = 0; i < 4; i++) {
      giftList.current.push(
        new Gift(
          context,
          systemInfo,
          tempImg.current,
          // GIFT_TYPE.MILK,
          Math.round(Math.random()),
          // POSITION.LEFT
          Math.floor(Math.random() * 3) - 1
        )
      );
    }
  };

  const createDisplay = () => {
    display.current = new Display(
      hero.current!,
      obstacleList.current!,
      time.current!,
      flowerList.current,
      giftList.current,
      context,
      systemInfo,
      tempImg.current
    );
    // time.current?.bindGameTime(display.current)
    display.current.play(setStart);
  };

  useEffect(() => {
    initPage();
  }, []);

  useEffect(() => {
    if (systemInfo.screenHeight && isStart) {
      paintBg();
      createHero();
      createFlower();
      createBarrier();
      createText();
      createGift();
      createDisplay();
    }
  }, [systemInfo, isStart]);

  return (
    <View>
      {isStart ? (
        <Canvas
          style={{
            width: `100vw`,
            height: `100vh`,
            display: "block",
          }}
          canvasId="canvas"
          onTouchEnd={touchMoveEvent}
          onTouchStart={touchStartEvent}
        ></Canvas>
      ) : (
        <ReadyPage
          onStartGame={() => {
            setStart(true);
          }}
        />
      )}
    </View>
  );
};

export default ObstacleGame;
