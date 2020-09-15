<template>
  <div>
    <div class="board">
      <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
        <div
          @click="dig(rowIndex, cellIndex)"
          class="cell"
          :class="{digged: cell.digged}"
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
        >
          {{ formatCell(cell) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      board: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      dig(rowIndex, cellIndex) {
        this.$emit('dig', { rowIndex, cellIndex })
      },
      formatCell(cell) {
        if (cell.digged) {
          if (cell.value === 9) {
            return '💣'
          }
          if (cell.value !== 0) {
            return cell.value
          }
          return ''
        }
      }
    }
  }
</script>

<style>
.board {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.row {
  display: flex;
  justify-content: center;
}

.row:not(:first-child) {
  margin-top: -1px;
}

.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #666;
  color: #aaa;
  background-color: #aaa;
}

.cell.digged {
  background-color: #fff;
}

.cell:not(:first-child) {
  margin-left: -1px;
}
</style>
