<template>
  <div class="container">
    <div class="status-bar">
      <div class="avatar" @mouseup="$emit('reset')">
        {{ getAvatar(status) }}
      </div>
    </div>
    <div class="board">
      <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
        <div
          @mouseup.left.exact="dig(rowIndex, cellIndex)"
          @mouseup.right.prevent="toggleFlag(rowIndex, cellIndex)"
          @click.right.prevent
          @mouseup.left.meta="doubleDig(rowIndex, cellIndex)"
          class="cell"
          :class="{
            digged: cell.digged,
            [`cell-${cell.value}`]: true
          }"
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
function addClass(event) {
  const target = event.target
  const classList = target.classList
  if (classList.contains('cell') || classList.contains('avatar')) {
    classList.add('mousedown')
  }
}

function removeClass(event) {
  event.target.classList.remove('mousedown')
}

export default {
  props: {
    board: {
      type: Array,
      default: () => []
    },
    status: String
  },
  methods: {
    dig(rowIndex, cellIndex) {
      this.$emit('dig', { rowIndex, cellIndex })
    },
    toggleFlag(rowIndex, cellIndex) {
      this.$emit('toggle-flag', { rowIndex, cellIndex })
    },
    doubleDig(rowIndex, cellIndex) {
      this.$emit('double-dig', { rowIndex, cellIndex })
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
      if (cell.flagged) {
        return '🚩'
      } else {
        return ''
      }
    },
    getAvatar(status) {
      return status === 'ALIVE' ? '😊' : status === 'VICTORY' ? '🎉' : '💀'
    }
  },
  mounted() {
    window.addEventListener('mousedown', event => {
      const target = event.target
      if (
        (target.classList.contains('cell') && this.status === 'ALIVE') ||
        target.classList.contains('avatar')
      ) {
        addClass(event)
        window.addEventListener('mouseover', addClass)
      }
    })
    window.addEventListener('mouseup', event => {
      removeClass(event)
      window.removeEventListener('mouseover', addClass)
    })
    window.addEventListener('mouseout', event => {
      removeClass(event)
    })
  }
}
</script>

<style>
.container {
  padding: 6px;
  background-color: #bdbdbd;
  border-width: 2px;
  border-style: solid;
  border-color: #f6f6f6 #838383 #838383 #f6f6f6;
}

.status-bar {
  display: flex;
  justify-content: center;
  padding: 3px 6px;
  margin-bottom: 6px;
  background-color: #bdbdbd;
  border: 2px solid #838383;
  border-color: #838383 #f6f6f6 #f6f6f6 #838383;
}

.avatar {
  width: 26px;
  height: 26px;
  box-sizing: border-box;
  text-align: center;
  line-height: 22px;
  border-width: 2px;
  border-style: solid;
  border-color: #f6f6f6 #7b7b7b #7b7b7b #f6f6f6;
  background-color: #bdbdbd;
  outline: 1px solid #8b8b8b;
}

.avatar.mousedown {
  line-height: 26px;
}

.board {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #838383;
  border-color: #838383 #f6f6f6 #f6f6f6 #838383;
}

.row {
  display: flex;
  justify-content: center;
}

.cell {
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border-width: 2px;
  border-style: solid;
  border-color: #f6f6f6 #7b7b7b #7b7b7b #f6f6f6;
  color: #aaa;
  background-color: #c0c0c0;
  text-align: center;
  line-height: 12px;
  font-size: 12px;
  font-weight: bold;
}

.cell.digged {
  line-height: 15px;
}

.cell.digged,
.mousedown {
  background-color: #bdbdbd;
  border: 1px solid #838383;
  border-width: 1px 0 0 1px;
}

.cell-1 {
  color: #1700ff;
}

.cell-2 {
  color: #067b03;
}

.cell-3 {
  color: #f92b24;
}

.cell-4 {
  color: #05017b;
}

.cell-5 {
  color: #7c0503;
}

.cell-6 {
  color: #2c8383;
}

.cell-7 {
  color: #000;
}

.cell-8 {
  color: #7c7c7c;
}

.cell-9.digged {
  background-color: #ff0202;
}
</style>
