new Vue({
  el: "#app",
  data() {
    return {
      date: new Date(),
      // month: date.getMonth() + 1,
      // day: date.getDate() + 1,
    };
  },
  created() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  computed: {
    month() {
      return this.date.getMonth() + 1;
    },
    day() {
      return this.date.getDate();
    },
    hour() {
      return this.date.getHours();
    },
    minute() {
      return this.date.getMinutes();
    },
    cursorVisible() {
      return this.date.getSeconds() % 2 === 0 ? "visible" : "invisible";
    },
  },
});
