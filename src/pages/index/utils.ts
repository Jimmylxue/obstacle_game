import { downloadFile, getSystemInfoSync } from '@tarojs/taro'
import { SLIDER_WAY } from './const'

// 使用 远程图片 转为本地临时图片
export const getImgFromRemote = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      downloadFile({
        url,
        success: (res) => {
          resolve(res.tempFilePath)
        },
      })
    } catch (error) {
      reject(error)
    }
  })
}

export const getSlideAngle = (x: number, y: number): number => {
  return (Math.atan2(y, x) * 180) / Math.PI
}

export const getSliderWay = (angle: number): number => {
  if (angle >= -45 && angle < 45) {
    // if (Math.abs(dx) < 40) {
    //   // 处理位移不能太小就拖动的bug
    //   return
    // }
    return SLIDER_WAY.BOTTOM
  } else if (angle >= 45 && angle < 135) {
    // if (Math.abs(dy) < 40) {
    //   return
    // }
    return SLIDER_WAY.RIGHT
  } else if (angle >= -135 && angle < -45) {
    // if (Math.abs(dy) < 40) {
    //   return
    // }
    return SLIDER_WAY.LEFT
  } else if (
    (angle >= 135 && angle <= 180) ||
    (angle >= -180 && angle < -135)
  ) {
    // if (Math.abs(dx) < 40) {
    //   return
    // }
    return SLIDER_WAY.TOP
  }
  return SLIDER_WAY.RESET
}

// px 转 rem 适配canvas
export const remSize = (num: number) => {
  const info = getSystemInfoSync()
  const scale = info.screenWidth / 390
  return num * scale
}
