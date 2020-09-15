<template>
  <div class="main">
    <div>
      <label for="size-small">简单</label>
      <input type="radio" id="size-small" name="size" v-model="size" value="SMALL" checked>
      <label for="size-medium">中等</label>
      <input type="radio" id="size-medium" name="size" v-model="size" value="MEDIUM">
      <label for="size-large">困难</label>
      <input type="radio" id="size-large" name="size" v-model="size" value="LARGE">
      <button @click="setupBoard(size)">生成</button>
    </div>
    <Board :board="board" @dig="dig" />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import MineSweeper from './lib/MineSweeper'
import Board from './components/Board.vue'

export default {
  name: 'MineSweeper',
  components: {
    Board
  },
  setup() {
    const size = ref('SMALL')
    const mineSweeper = ref(null)
    const board = ref([])

    const setupBoard = (size) => {
      mineSweeper.value = new MineSweeper(size)
      board.value = mineSweeper.value.board
    }

    const dig = ({ rowIndex, cellIndex }) => {
      mineSweeper.value.dig(rowIndex, cellIndex)
    }

    onMounted(() => {
      setupBoard(size.value)
    })

    return {
      size,
      board,
      setupBoard,
      dig
    }
  },
}
</script>
