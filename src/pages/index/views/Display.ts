import Taro from "@tarojs/taro";
import Hero from "./Hero";
import Obstacle from "./Obstacle";
import Time from "./Times";
import Flower from "./Flower";
import Gift from "./Gift";
import { SystemInfo, MusicIconSize, UserSize } from "../const";
// import { Audio } from "@vipkit/games/src/eliminating/core/Audio";
export default class Display {
  timer: any;
  tick: number = 0;
  index: number = 1;
  animateTimer: any;
  setEnd: any;
  musicRotate: number = 0;
  musicFlag: boolean = true;
  score: number = 0;
  constructor(
    private hero: Hero,
    private obstacles: Obstacle[],
    private time: Time,
    private flowers: Flower[],
    private gifts: Gift[],
    private ctx: Taro.CanvasContext,
    private systemInfo: SystemInfo,
    private tempImg: any
  ) {}
  play(fn: any) {
    this.setEnd = fn;
    let index = 1;
    this.obstacles[index - 1].move();
    this.gifts[index - 1].move();
    this.timer = setInterval(() => {
      if (index === this.gifts.length) {
        clearInterval(this.timer);
        return;
      }
      this.obstacles[index]?.move();
      this.gifts[index].move();
      index++;
    }, 3000);
    this.flowers.forEach((flower) => {
      flower.move();
    });
    this.start();
  }
  start() {
    const animate = () => {
      this.hero.initAnimate();
      this.tick++;
      if (this.tick === 35) {
        this.tick = 0;
        this.index++;
      }
      if (this.index === 2) {
        this.index = 0;
      }
      this.painBg(); // 画背景
      this.painMusic(); // 画音乐
      this.painUser(); // 画头像
      this.time.initTime(new Date().getTime()); // 初始化时间
      this.painScore(); // 画得分
      // 障碍物动起来 并做碰撞检测
      this.obstacles.forEach((obstacle) => {
        if (this.hero.checkHit(obstacle)) {
          // this.musicFlag && this.audio.pay('hit') // 碰撞才播放音乐
          this.score < 10 ? (this.score = 0) : (this.score -= 10);
        }
        obstacle.initObstacle();
        obstacle.initAnimate();
      });
      // 花草动起来
      this.flowers.forEach((flower) => {
        flower.initObstacle();
        flower.initAnimate();
      });
      // 礼物动起来
      this.gifts.forEach((gift) => {
        if (this.hero.checkGoal(gift)) {
          this.score += 10;
        }
        gift.initGift();
        gift.initAnimate();
      });
      this.hero.paintHero(this.index);
      this.ctx.draw();
      this.animateTimer = requestAnimationFrame(animate);
      if (this.time._timeEnd <= 0) {
        cancelAnimationFrame(this.animateTimer);
      }
    };

    animate();
  }

  painBg() {
    this.ctx.drawImage(
      this.tempImg.game_bg,
      0,
      0,
      this.systemInfo.screenWidth,
      this.systemInfo.screenHeight
    );
  }

  painMusic() {
    this.ctx.save();
    const rectCenterPoint = {
      x:
        this.systemInfo.screenWidth -
        MusicIconSize.width -
        20 +
        MusicIconSize.width / 2,
      y: 25 + MusicIconSize.height / 2,
    };
    this.ctx.translate(rectCenterPoint.x, rectCenterPoint.y);
    if (this.musicRotate === 360) {
      this.musicRotate = 0;
    }
    this.ctx.rotate(this.musicRotate);
    if (this.musicFlag) {
      this.musicRotate += 0.02;
    }

    this.ctx.translate(-rectCenterPoint.x, -rectCenterPoint.y);
    this.ctx.drawImage(
      this.musicFlag ? this.tempImg.music1 : this.tempImg.music2,
      this.systemInfo.screenWidth - MusicIconSize.width - 20,
      25,
      MusicIconSize.width,
      MusicIconSize.height
    );
    if (!this.musicFlag) {
      // this.audio.pause("hit");
      // this.audio.pause("bgm");
      // this.audio.pause("goal");
    }
    this.ctx.restore();
  }

  painUser() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(50, 40, 30, 0, Math.PI * 2, false);
    this.ctx.clip();
    this.ctx.drawImage(this.tempImg.user, 20, 10, 60, 60);
    this.ctx.restore();
  }

  painScore() {
    this.ctx.setTextAlign("center"); // 设置文字的基线居中
    this.ctx.setFontSize(25);
    this.ctx.setFillStyle("#ba986e");
    this.ctx.fillText(this.score + "", 20 + UserSize.width + 20, 50);
  }
}
