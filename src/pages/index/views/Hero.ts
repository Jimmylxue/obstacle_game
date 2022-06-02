import { CanvasContext } from "@tarojs/taro";
import {
  SLIDER_WAY,
  OBSTACLE_TYPE,
  SystemInfo,
  POSITION,
  GiftSize,
} from "../const";
import Obstacle from "./Obstacle";
import Gift from "./Gift";
import TWEEN from "@tweenjs/tween.js";
import { remSize } from "../utils";

export default class Hero {
  width = 150;
  height = remSize(220);
  x = 0;
  y = remSize(180);
  isJump = false; // 是否在起跳状态
  centerX = 0;
  img_source: string[] = []; // 存放图片地址的数组
  tween: any; // 缓动动画
  position: POSITION = POSITION.CENTER; // 0 中心 1右边 -1左边
  moveEnd: boolean = true; // 一个动作是否结束 只有结束了才能做下个动作
  constructor(
    private ctx: CanvasContext,
    private systemInfo: SystemInfo,
    tempImg: any
  ) {
    this.img_source = [tempImg.baby1, tempImg.baby2, tempImg.baby3];
    this.centerX = systemInfo.screenWidth / 2;
    this.x = this.systemInfo.screenWidth / 2 - remSize(this.width / 2);
  }
  move(slider_way: SLIDER_WAY) {
    this.tween = new TWEEN.Tween({ x: this.x, y: this.y });
    switch (slider_way) {
      case SLIDER_WAY.TOP:
        if (!this.isJump) {
          this.isJump = true;
          this.tween
            .to(
              {
                y: this.y - remSize(100),
              },
              500
            )
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate((position: { y: number }) => {
              this.y = position.y;
            })
            .onComplete(() => {
              this.move(SLIDER_WAY.RESET);
            })
            .onStop(() => {})
            .start();
        }

        break;
      case SLIDER_WAY.RIGHT:
        if (this.position < POSITION.RIGHT && this.moveEnd) {
          this.position += 1;
          this.moveEnd = false;
          this.tween
            .to(
              {
                // x: this.x - 100,
                x: this.x + remSize(60),
              },
              1000
            )
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate((position: { x: number }) => {
              this.x = position.x;
            })
            .onComplete(() => {
              this.moveEnd = true;
            })
            .start();
        }

        break;

      case SLIDER_WAY.LEFT:
        if (this.position > POSITION.LEFT && this.moveEnd) {
          this.position -= 1;
          this.moveEnd = false;
          this.tween
            .to(
              {
                x: this.x - remSize(60),
              },
              1000
            )
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate((position: { x: number }) => {
              this.x = position.x;
            })
            .onComplete((position: { x: number; y: number }) => {
              this.moveEnd = true;
            })
            .start();
        }

        break;
      case SLIDER_WAY.BOTTOM:
        break;
      case SLIDER_WAY.RESET:
        this.tween
          .to(
            {
              y: this.y + remSize(100),
            },
            500
          )
          .easing(TWEEN.Easing.Linear.None)
          .onUpdate((position: { y: number }) => {
            this.y = position.y;
          })
          .onComplete(() => {
            this.isJump = false;
          })
          .start();
        break;
    }
  }

  initAnimate() {
    TWEEN.update();
  }

  paintHero(index: number) {
    this.paint({ x: this.x, y: this.y }, this.isJump ? 2 : index);
  }

  // 碰撞检测
  checkHit(obstacle: Obstacle): boolean {
    if (
      obstacle.y <= remSize(this.y + this.height) &&
      obstacle.y >= remSize(this.y + this.height - 5)
    ) {
      if (obstacle.type === OBSTACLE_TYPE.VERTICAL) {
        if (this.position === obstacle.position) {
          console.log("碰撞了呀~");
          obstacle.tween.stop(); // 停止动画
          obstacle.resetPosition();
          setTimeout(() => {
            obstacle.move();
          }, 1500);
          return true;
        }
      } else {
        if (!this.isJump) {
          console.log("碰撞了呀~");
          obstacle.tween.stop(); // 停止动画
          obstacle.resetPosition();
          setTimeout(() => {
            obstacle.move();
          }, 1500);
          return true;
        }
      }
    }
    return false;
  }

  // 得分检测
  checkGoal(gift: Gift): boolean {
    if (
      gift.y <= remSize(this.y + this.height) &&
      gift.y >= remSize(this.y + this.height - 5)
    ) {
      if (this.position === gift.position && !this.isJump) {
        console.log("得分了呀");
        gift.tween.stop(); // 停止动画
        gift.width = GiftSize.width;
        gift.height = GiftSize.height;
        gift.resetPosition();
        setTimeout(() => {
          gift.move();
        }, 1500);
        return true;
      }
    }
    return false;
  }

  paint(position: { x: number; y: number }, index: number) {
    this.x = position.x;
    this.y = position.y;

    this.ctx.drawImage(
      this.img_source[index],
      position.x,
      remSize(position.y),
      remSize(this.width),
      this.height
    );
  }
}
