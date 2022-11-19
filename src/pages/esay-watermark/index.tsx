import { View, Image } from "@tarojs/components";
import {
  rotate,
  marker,
  mosaic,
  blur,
  fullMarker,
  QRcode,
} from "esay-watermark";
import { useEffect, useState } from "react";

export default () => {
  const [markerSource, setMarkerSource] = useState("");
  const [mosaicSource, setMosaicSource] = useState("");
  const [blurSource, setBlurSource] = useState("");
  const [fullMarkerSource, setFullMarkerSource] = useState("");
  const [qrcodeSource, setQRcodeSource] = useState("");
  const [rotateSource, setRotateSource] = useState("");

  useEffect(() => {
    marker({
      src: "https://avatars.githubusercontent.com/u/65758455?v=4",
      text: "jimmy",
      color: "#bdc3c7",
      size: 120,
      position: "CENTER",
      padding: 10,
    }).then((source) => {
      setMarkerSource(source);
    });
    mosaic({
      src: "https://avatars.githubusercontent.com/u/65758455?v=4",
      size: 5,
    }).then((source) => {
      setMosaicSource(source);
    });
    blur({
      src: "https://avatars.githubusercontent.com/u/65758455?v=4",
      radius: 5,
    }).then((source: string) => {
      setBlurSource(source);
    });
    rotate({
      src: "https://avatars.githubusercontent.com/u/65758455?v=4",
      rotate: 90,
      symmetric: "row",
    }).then((source: string) => {
      setRotateSource(source);
    });
    fullMarker({
      src: "http://jimmyxx.oss-cn-beijing.aliyuncs.com/lot.png",
      text: "easy-watermark https://github.com/Jimmylxue/easy-watermark",
      color: "#c0c0c0",
      size: 20,
      padding: 180,
      rotate: -15,
      type: "stroke",
    }).then((source) => {
      setFullMarkerSource(source);
    });
    QRcode({
      source: "http://www.jimmyxuexue.top",
      src: "https://avatars.githubusercontent.com/u/65758455?v=4",
      size: 100,
    }).then((source) => {
      setQRcodeSource(source);
    });
  }, []);

  return (
    <View>
      <View>marker</View>
      <Image src={markerSource} />
      <View>mosaic</View>
      <Image src={mosaicSource} />
      <View>blur</View>
      <Image src={blurSource} />
      <View>fullMarker</View>
      <Image src={fullMarkerSource} />
      <View>QRcode</View>
      <Image src={qrcodeSource} />
      <View>rotate</View>
      <Image src={rotateSource} />
    </View>
  );
};
