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
    <div v-if="boardType === 'WEB'">
      <Board
        :board="board"
        :status="status"
        @dig="dig"
        @toggle-flag="toggleFlag"
        @double-dig="doubleDig"
        @reset="setupBoard"
      />
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

    function resetStatus() {
      status.value = mineSweeper.value.getStatus()
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
</style>
