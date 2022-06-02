import { CanvasContext } from '@tarojs/taro'
import TWEEN from '@tweenjs/tween.js'
import {
  OBSTACLE_TYPE,
  SystemInfo,
  VerticalBarrierSize,
  BroadWiseBarrierSize,
  POSITION,
} from '../const'
import { remSize } from '../utils'

export default class Obstacle {
  width: number = 0
  height: number = 0
  x = 0
  y = 180
  img_source: string[] = []
  position: POSITION = 0 // 0 中心 1右边 -1左边
  centerX = 0 //
  type: OBSTACLE_TYPE = 0 // 0 竖向障碍 1 横向障碍
  isHit = false // 是否碰撞
  tween: any // 缓动动画
  constructor(
    private ctx: CanvasContext,
    private systemInfo: SystemInfo,
    private tempImg: any,
    type: OBSTACLE_TYPE,
    position?: POSITION
  ) {
    this.img_source = [tempImg.barrier1, tempImg.barrier2]
    this.centerX = systemInfo.screenWidth / 2
    this.type = type
    this.position = position!
    this.resetPosition()
    // this.y = 600
    // this.tween = new TWEEN.Tween({ x: this.x, y: this.y })
  }

  resetPosition() {
    if (this.type === OBSTACLE_TYPE.VERTICAL) {
      // 只有纵向的障碍才有位置

      this.width = VerticalBarrierSize.width
      this.height = VerticalBarrierSize.height
      switch (this.position) {
        case POSITION.LEFT:
          this.x = this.systemInfo.screenWidth / 2 - this.width - 90
          break
        case POSITION.CENTER:
          this.x = this.systemInfo.screenWidth / 2 - this.width / 2
          break
        case POSITION.RIGHT:
          this.x = this.systemInfo.screenWidth / 2 + this.width
          break
      }
    } else {
      this.width = BroadWiseBarrierSize.width
      this.height = BroadWiseBarrierSize.height
      this.x = this.systemInfo.screenWidth / 2 - this.width / 2
    }

    this.y = this.systemInfo.screenHeight + this.height + 30
  }

  initAnimate() {
    TWEEN.update()
  }

  initObstacle() {
    const { file, x, y, width, height } = this.getConfigByType()
    this.ctx.drawImage(file, x, this.y, width, height)
  }

  getConfigByType() {
    if (this.type === OBSTACLE_TYPE.VERTICAL) {
      return {
        file: this.tempImg.barrier1,
        x: this.x,
        y: this.systemInfo.screenHeight + this.height + 30,
        width: this.width,
        height: this.height,
      }
    } else {
      return {
        file: this.tempImg.barrier2,
        x: this.x,
        y: this.systemInfo.screenHeight + this.height + 30,
        width: this.width,
        height: this.height,
      }
    }
  }

  move() {
    const changeSize = this.getChangeSize()
    this.tween = new TWEEN.Tween({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    })
      .to(changeSize, 4000)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(
        (position: { x: number; y: number; width: number; height: number }) => {
          this.x = position.x
          this.y = position.y
          this.width = position.width
          this.height = position.height
        }
      )
      .onComplete(() => {
        this.y = 600
      })
      .start()
      .repeat(Infinity)
  }

  getChangeSize() {
    if (this.type === OBSTACLE_TYPE.VERTICAL) {
      switch (this.position) {
        case POSITION.LEFT:
          return {
            x: this.systemInfo.screenWidth / 2 - remSize(45),
            y: remSize(100),
            width: remSize(50),
            height: remSize(80),
          }
        case POSITION.CENTER:
          return {
            x: this.systemInfo.screenWidth / 2 - remSize(30),
            y: remSize(100),
            width: remSize(50),
            height: remSize(80),
          }
        case POSITION.RIGHT:
          return {
            // 因为背景图多少不太居中
            x: this.systemInfo.screenWidth / 2 - remSize(20),
            y: remSize(100),
            width: remSize(50),
            height: remSize(80),
          }
      }
    } else {
      return {
        x: this.systemInfo.screenWidth / 2 - remSize(30),
        y: remSize(100),
        width: remSize(45),
        height: remSize(20),
      }
    }
  }
}
