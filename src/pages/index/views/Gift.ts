import { CanvasContext } from '@tarojs/taro'
import TWEEN from '@tweenjs/tween.js'
import { GIFT_TYPE, SystemInfo, GiftSize, POSITION } from '../const'

export default class Gift {
  width: number = 0
  height: number = 0
  x = 0
  y = 180
  img_source: string[] = []
  position: POSITION = 0 // 0 中心 1右边 -1左边
  centerX = 0 //
  isHit = false // 是否碰撞
  tween: any // 缓动动画
  constructor(
    private ctx: CanvasContext,
    private systemInfo: SystemInfo,
    private tempImg: any,
    private type: GIFT_TYPE,
    position: POSITION
  ) {
    this.img_source = [tempImg.gift1, tempImg.gift2]
    this.centerX = systemInfo.screenWidth / 2
    this.position = position
    this.width = GiftSize.width
    this.height = GiftSize.height

    this.resetPosition()
  }

  resetPosition() {
    switch (this.position) {
      case POSITION.LEFT:
        this.x = this.systemInfo.screenWidth / 2 - this.width - 80
        break
      case POSITION.CENTER:
        this.x = this.systemInfo.screenWidth / 2 - this.width / 2
        break
      case POSITION.RIGHT:
        this.x = this.systemInfo.screenWidth / 2 + 150
        break
    }
    this.y = this.systemInfo.screenHeight + this.height + 30
  }

  initAnimate() {
    TWEEN.update()
  }

  initGift() {
    const { file, x, y, width, height } = this.getConfigByType()
    this.ctx.drawImage(file, x, this.y, width, height)
  }

  getConfigByType() {
    if (this.type === GIFT_TYPE.RED_PACKET) {
      return {
        file: this.tempImg.gift1,
        x: this.x,
        y: this.systemInfo.screenHeight + this.height + 30,
        width: this.width,
        height: this.height,
      }
    } else {
      return {
        file: this.tempImg.gift2,
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
    switch (this.position) {
      case POSITION.LEFT:
        return {
          x: this.systemInfo.screenWidth / 2 - 35,
          y: 100,
          width: 20,
          height: 35,
        }
      case POSITION.CENTER:
        return {
          x: this.systemInfo.screenWidth / 2 - 10,
          y: 100,
          width: 20,
          height: 35,
        }
      case POSITION.RIGHT:
        return {
          // 因为背景图多少不太居中
          x: this.systemInfo.screenWidth / 2 - 0,
          y: 100,
          width: 20,
          height: 35,
        }
    }
  }
}
