// 预设地图大小（行，列，雷数）
const PREDEFINED_MAP = {
  SMALL: [9, 9, 10],
  MEDIUM: [16, 16, 40],
  LARGE: [16, 30, 99]
}
const MINE = 9

function getSurroundingCellsPosition(ri, ci, rn, cn) {
  const pr = ri - 1
  const nr = ri + 1
  const pc = ci - 1
  const nc = ci + 1
  return [[pr, pc], [pr, ci], [pr, nc],
          [ri, pc],           [ri, nc],
          [nr, pc], [nr, ci], [nr, nc]]
          .filter(item => (item[0] >= 0 && item[0] < rn) && (item[1] >= 0 && item[1] < cn))
          .map(item => `${item[0]}|${item[1]}`)
}

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

    // 计算空白格数字
    // 生成格子和雷映射关系的map
    const cellMineMap = {}
    result.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        cellMineMap[`${rowIndex}|${cellIndex}`] = cell
      })
    })
    // 遍历空白格子，根据map得到填充的数字
    result.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === MINE) return
        let count = 0
        const surCells = getSurroundingCellsPosition(rowIndex, cellIndex, rowNum, cellNum)
        surCells.forEach(pos => {
          if (cellMineMap[pos] === MINE) {
            count++
          }
        })
        result[rowIndex][cellIndex] = count
      })
    })

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

const sweeper = new MineSweeper('SMALL')
console.log(sweeper._map)
