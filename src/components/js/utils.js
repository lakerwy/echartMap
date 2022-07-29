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

export function lineMaxHeight (yList,length) {
  if (length >= 4) return 0.1/Math.max(...yList.map(item => item.value));
  if (length == 3) return 0.4/Math.max(...yList.map(item => item.value));
  if (length == 2) return 1/Math.max(...yList.map(item => item.value));
  const maxValue = Math.max(...yList.map(item => item.value))
  return 4/maxValue
}
export function lineData(yList,geoCoordMap,length) {
  return yList.map((item) => {
    return {
      coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight(yList,length)]]
    }
  })
}
// 柱状体的顶部
export function scatterData (yList,geoCoordMap,length) {
  return yList.map((item) => {
    return [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight(yList,length)]
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

/**
 *  函数防抖
 *  @param {Function} func  包装的函数
 *  @param {num} delay      延迟时间
 *  @param {boolean} immediate 第一次滚动会执行两次  开始滚动和结束滚动的时候
 *  @return {*}
 */

export function debounce(func, delay, immediate = false) {
  let timer, context = this
  return (...args) => {
    if (immediate) {
      func.apply(context, args)
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}

/**
 * 函数节流
 * @param func 包装的函数
 * @param wait  延迟时间
 * @returns {(function(): void)|*}
 */
export function throttle(func, wait) {
  let previous = 0;
  return function() {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}