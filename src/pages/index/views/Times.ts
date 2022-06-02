import { CanvasContext } from '@tarojs/taro'
import { SystemInfo } from '../const'

export default class Time {
  _timeEnd: number = 30
  _timeTick: number = 30
  img_source: any[] = []
  startTime: number = new Date().getTime()

  constructor(private ctx: CanvasContext, private systemInfo: SystemInfo) {}

  initTime(time: number) {
    this.ctx.setTextAlign('center') // 设置文字的基线居中
    this.ctx.setFontSize(35)
    this.ctx.setFillStyle('#c18a48')
    let timeEnd = +(this._timeTick - (time - this.startTime) / 1000).toFixed(2)
    this._timeEnd = timeEnd
    if (timeEnd <= 0) {
      this.startTime = time
    }
    this.ctx.fillText(
      String(timeEnd.toFixed(2)),
      this.systemInfo.screenWidth / 2,
      70
    )
  }
}
