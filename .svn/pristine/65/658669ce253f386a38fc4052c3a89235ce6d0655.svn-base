
export function MP(ak) {
  const AK = "aiM7jMPeUV9uEepWsxr642Plxqgfpvt9";
  const BMap_URL = "https://api.map.baidu.com/api?v=2.0&ak=" + AK + "&s=1&callback=onBMapCallback";
  return new Promise((resolve, reject) => {
    // 如果已加载直接返回
    if (typeof BMap !== "undefined") {
      resolve(BMap);
      return true;
    }
    // 百度地图异步加载回调处理
    window.onBMapCallback = function () {
      console.log("百度地图脚本初始化成功...");
      resolve(BMap);
    };
    // window.onload = function () {
    //   resolve(BMap)
    // }

    // 插入script脚本
    let scriptNode = document.createElement("script");
    scriptNode.setAttribute("type", "text/javascript");
    scriptNode.setAttribute("src", BMap_URL);
    scriptNode.onerror = reject;
    document.body.appendChild(scriptNode);
  });

}