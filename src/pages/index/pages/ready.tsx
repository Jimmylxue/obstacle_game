import { View, Image } from "@tarojs/components";
import Styles from "./index.module.scss";

type TProps = {
  onStartGame: () => void;
};

const ExchangePage = ({ onStartGame }: TProps) => {
  return (
    <View
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "url(https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653901980287/readybg.png?Expires=3230701980&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=cHrTJwRj7NHTANmF1X82SzNG9u4%3D) center center no-repeat",
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <Image
        style={{
          width: "560rpx",
          height: "220rpx",
          margin: "0 auto",
          display: "block",
          paddingTop: "40rpx",
        }}
        src="https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653903064209/title.png?Expires=3230703064&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=leu6QtZA39ys4Tgi1AsSbOh2yo4%3D"
      />
      <Image
        className="packet"
        src="https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653904007896/packet.png?Expires=3230704007&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=dqCCbPRpcsJgPV8efGRHbFut9rQ%3D"
        onClick={() => {
          // setHistoryVisible(true);
        }}
      />
      <Image
        className="startBtn"
        onClick={() => onStartGame()}
        src="https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1653903575372/startBtn.png?Expires=3230703575&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=mXPrYd8Lyzo0434rSdGmf3yI7DY%3D"
      />
    </View>
  );
};

export default ExchangePage;
