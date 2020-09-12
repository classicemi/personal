// 预设地图大小（行，列，雷数）
const PREDEFINED_MAP = {
  SMALL: [9, 9, 10],
  MEDIUM: [16, 16, 40],
  LARGE: [16, 30, 99]
}
const MINE = 9

class MineSweeper {
  constructor(mapSize) {
    this._map = this.generateMap(PREDEFINED_MAP[mapSize])
  }

  // 根据地图尺寸生成随机地图
  generateMap(mapDef) {
    const [rowNum, cellNum, mineNum] = mapDef
    const total = rowNum * cellNum
    // 生成一维数组，前m个为雷
    let linear = Array(mineNum).fill(MINE).concat(Array(total - mineNum).fill(0))
    // 洗牌
    linear = this._shuffle(linear)

    const result = []
    // 分割一维数组
    for (let i = 0; i < linear.length; i += cellNum) {
      result.push(linear.slice(i, i + cellNum))
    }
    return result
  }

  // Fisher–Yates shuffle
  _shuffle(arr) {
    let len = arr.length, pos
    while (len) {
      pos = Math.floor(Math.random() * len--)
      ;[arr[len], arr[pos]] = [arr[pos], arr[len]]
    }
    return arr
  }
}
