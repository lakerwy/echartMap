import * as echarts from 'echarts';

export const initEcharts = (id, options, reszie = false) => {
  let dom = document.getElementById(id)
  if (!dom) {
    return
  }
  let echart = echarts.init(dom);
  echart.setOption(options, true);
  window.addEventListener('resize', () => {
    echart.resize();
  })
  if (reszie === true) {
    echart.resize();
  }
  return echart
}

export function lineMaxHeight (yList) {
  const maxValue = Math.max(...yList.map(item => item.value))
  return 0.5/maxValue
}
export function lineData(yList,geoCoordMap) {
  return yList.map((item) => {
    return {
      coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight(yList)]]
    }
  })
}
// 柱状体的顶部
export function scatterData (yList,geoCoordMap) {
  return yList.map((item) => {
    return [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight(yList)]
  })
}
// 柱状体的底部
export function scatterData2 (yList,geoCoordMap) {
  return yList.map((item) => {
    return {
      name: item.name,
      value: geoCoordMap[item.name]
    }
  })
}