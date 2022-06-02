import { CanvasContext } from "@tarojs/taro";
import TWEEN from "@tweenjs/tween.js";
import { SystemInfo, MushroomSize, FLOWER_TYPE, RadishSize } from "../const";
import { remSize } from "../utils";

export default class Flower {
  width: number = 0;
  height: number = 0;
  x = 0;
  y = 180;
  img_source: string[] = [];
  position = -1; //  1右边 -1左边
  centerX = 0; //
  isHit = false; // 是否碰撞
  tween: any; // 缓动动画
  constructor(
    private ctx: CanvasContext,
    private systemInfo: SystemInfo,
    private tempImg: any,
    private type: FLOWER_TYPE,
    position: number
  ) {
    this.position = position;
    this.img_source = [tempImg.flower1, tempImg.flower2];

    if (this.type === FLOWER_TYPE.RADISH) {
      // 胡萝卜
      this.width = RadishSize.width;
      this.height = RadishSize.height;

      this.y = remSize(600);
      if (this.position === -1) {
        this.x = remSize(-100);
      } else {
        this.x = remSize(systemInfo.screenWidth + 50);
      }
    } else {
      // 蘑菇
      this.width = MushroomSize.width;
      this.height = MushroomSize.height;

      this.y = 600;
      if (this.position === -1) {
        this.x = remSize(-30);
      } else {
        this.x = remSize(systemInfo.screenWidth + 20);
      }
    }

    this.tween = new TWEEN.Tween({ x: this.x, y: this.y });
  }

  initAnimate() {
    TWEEN.update();
  }

  initObstacle() {
    const { file, x, y, width, height } = this.getConfigByType();
    this.ctx.drawImage(file, x, this.y, width, height);
  }

  getConfigByType() {
    if (this.type === FLOWER_TYPE.MUSHROOM) {
      // 蘑菇
      return {
        file: this.img_source[1],
        x: this.x,
        y: 600,
        width: this.width,
        height: this.height,
      };
    } else {
      // 胡萝卜

      return {
        file: this.img_source[0],
        x: this.x,
        y: 600,
        width: this.width,
        height: this.height,
      };
    }
  }

  move() {
    this.tween
      .to(
        {
          x:
            this.position === -1
              ? this.systemInfo.screenWidth / 2 - this.width - remSize(15)
              : this.systemInfo.screenWidth / 2 + remSize(15),
          y: 100,
        },
        3000
      )
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate((position: { x: number; y: number }) => {
        this.x = position.x;
        this.y = position.y;
      })
      .onComplete(() => {
        this.x = remSize(20);
        this.y = remSize(600);
      })
      .start()
      .repeat(Infinity);
  }
}
