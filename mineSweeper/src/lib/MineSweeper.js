// 预设地图大小（行，列，雷数）
const PREDEFINED_MAP = {
  SMALL: [9, 9, 10],
  MEDIUM: [16, 16, 40],
  LARGE: [16, 30, 99]
}
// 地雷方块值
const MINE = 9
// 安全方块值
const ZERO = 0
// 方块周围八个方块的偏移值
const AROUND_OFFSET = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
]
// 游戏状态
const SWEEPER_STATUS = {
  ALIVE: 'ALIVE',
  DEAD: 'DEAD'
}

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

export default class MineSweeper {
  constructor(mapSize) {
    console.log(mapSize)
    this.status = SWEEPER_STATUS.ALIVE
    this._map = this._generateMap(PREDEFINED_MAP[mapSize.toUpperCase()])
    this.board = this._generateBoard(this._map)
  }

  // 挖开指定位置方块
  dig(rowIndex, cellIndex) {
    // 如果已经死亡，点击无效
    if (this.status === SWEEPER_STATUS.DEAD) {
      return
    }
    const target = this.board[rowIndex][cellIndex]
    target.digged = true
    // 如果挖开雷，game over
    if (target.value === MINE) {
      return this._kill()
    } else if (target.value === ZERO) {
      // 如果挖开的方块是0，自动挖开周围的方块
      this._spread(rowIndex, cellIndex)
    }
  }

  // 根据地图尺寸生成随机地图
  _generateMap(mapDef) {
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

  // 根据地图生成游戏棋盘
  _generateBoard(map) {
    return map.map((row, rowIndex) =>
      row.map((cell, cellIndex) => this._cellFactory(rowIndex, cellIndex, cell)))
  }

  _cellFactory(rowIndex, cellIndex, value) {
    return {
      // 保存方块的值
      value,
      // 标记方块是否被插上红旗
      flagged: false,
      // 标记方块是否被用户标上问号
      tagged: false,
      // 标记方块是否被挖开
      digged: false,
      // 记录方块的行数
      rowIndex,
      // 记录方块的列数
      cellIndex
    }
  }

  // 根据给定位置方块挖开周围所有可自动挖开方块
  _spread(rowIndex, cellIndex) {
    const target = this.board[rowIndex][cellIndex]
    if (target.value !== ZERO) return
    AROUND_OFFSET.forEach(offset => {
      const row = rowIndex + offset[0]
      const cell = cellIndex + offset[1]
      if (this.board[row] &&
          this.board[row][cell] &&
          this.board[row][cell].digged === false) {
        this.board[row][cell].digged = true
        this._spread(row, cell)
      }
    })
  }

  // game over
  _kill() {
    this.status = SWEEPER_STATUS.DEAD
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
