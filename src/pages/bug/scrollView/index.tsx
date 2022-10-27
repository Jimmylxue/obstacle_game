import { View, ScrollView } from "@tarojs/components";
import { useState } from "react";

const ScrollViewPage = () => {
  const data = [
    { name: "jimmy" },
    { name: "xuexue" },
    { name: "jimmy" },
    { name: "xuexue" },
    { name: "jimmy" },
    { name: "xuexue" },
    { name: "jimmy" },
    { name: "xuexue" },
    { name: "jimmy" },
    { name: "xuexue" },
    { name: "jimmy" },
    { name: "xuexue" },
    { name: "jimmy" },
    { name: "xuexue" },
    { name: "jimmy" },
    { name: "xuexue" },
  ];

  const [showOther, setShowOther] = useState<boolean>(false);

  return (
    <View>
      <ScrollView
        scrollY
        style={{
          height: 400,
        }}
        onScroll={(e) => {
          console.log("scrollTop", e.detail.scrollTop);
          if (e.detail.scrollTop >= 390) {
            setShowOther(true);
          } else {
            setShowOther(false);
          }
        }}
        onScrollToLower={() => {
          console.log("我滚动到底部了");
        }}
      >
        {data.map((item, index) => (
          <View
            style={{
              width: "100%",
              height: 50,
              background: index % 2 === 0 ? "skyblue" : "red",
            }}
          >
            {item.name}
          </View>
        ))}
      </ScrollView>

      {!!showOther && (
        <View
          style={{
            color: "blue",
            fontSize: 30,
          }}
        >
          我是特殊情况才展示
        </View>
      )}
    </View>
  );
};

export default ScrollViewPage;
