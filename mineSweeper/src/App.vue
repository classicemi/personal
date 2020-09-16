<template>
  <div class="main">
    <!-- <div>
      <label for="web-board">web</label>
      <input type="radio" id="web-board" name="boardType" v-model="boardType" value="WEB" checked>
      <label for="vugel-board">vugel</label>
      <input type="radio" id="vugel-board" name="boardType" v-model="boardType" value="VUGEL">
    </div> -->
    <!-- <div>
      <label for="size-small">简单</label>
      <input type="radio" id="size-small" name="size" v-model="size" value="SMALL" checked>
      <label for="size-medium">中等</label>
      <input type="radio" id="size-medium" name="size" v-model="size" value="MEDIUM">
      <label for="size-large">困难</label>
      <input type="radio" id="size-large" name="size" v-model="size" value="LARGE">
      <button @click="setupBoard(size)">生成</button>
    </div> -->
    <div v-if="boardType === 'WEB'" class="board-container">
      <Board
        :board="board"
        :status="status"
        :remains="remains"
        @dig="dig"
        @toggle-flag="toggleFlag"
        @double-dig="doubleDig"
        @reset="setupBoard"
      />
      <div class="help">
        <ol>
          <li>点击头像可重新开始；</li>
          <li>点击左键挖开格子；</li>
          <li>点击右键标记格子，再次点击取消标记；</li>
          <li>按住 Win 键（Mac 为 Command 键）点击左键相当于左右键双击；</li>
          <li>挖开所有没有雷的格子即为胜利。</li>
        </ol>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import MineSweeper from './lib/MineSweeper'
import Board from './components/Board.vue'

export default {
  name: 'MineSweeper',
  components: {
    Board
  },
  setup() {
    const size = ref('LARGE')
    const ms = new MineSweeper(size.value)
    const boardType = ref('WEB')
    const mineSweeper = ref(ms)
    const board = ref(ms.board)
    const status = ref(ms.status)
    const remains = ref(0)

    function resetStatus() {
      status.value = mineSweeper.value.getStatus()
      remains.value = mineSweeper.value.remains
    }

    const setupBoard = () => {
      mineSweeper.value = new MineSweeper(size.value)
      board.value = mineSweeper.value.board
      resetStatus()
    }

    const dig = ({ rowIndex, cellIndex }) => {
      mineSweeper.value.dig(rowIndex, cellIndex)
      resetStatus()
    }

    const toggleFlag = ({ rowIndex, cellIndex }) => {
      mineSweeper.value.toggleFlag(rowIndex, cellIndex)
      resetStatus()
    }

    const doubleDig = ({ rowIndex, cellIndex }) => {
      mineSweeper.value.doubleDig(rowIndex, cellIndex)
      resetStatus()
    }

    onMounted(() => {
      setupBoard()
    })

    return {
      boardType,
      size,
      board,
      status,
      remains,
      setupBoard,
      dig,
      toggleFlag,
      doubleDig
    }
  }
}
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
}

.board-container {
  position: relative;
}

.help {
  position: absolute;
  width: 260px;
  top: 0;
  right: -280px;
  background-color: rgba(255, 255, 255, .4);
}

.help ol {
  padding: 10px 10px 10px 25px;
  font-size: 12px;
}

.help ol li {
  margin-bottom: 6px;
}
</style>
