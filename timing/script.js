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
  methods: {
    formatNumber(num) {
      return num < 10 ? `0${num}` : num;
    },
  },
  computed: {
    month() {
      return this.formatNumber(this.date.getMonth() + 1);
    },
    day() {
      return this.formatNumber(this.date.getDate());
    },
    hour() {
      return this.formatNumber(this.date.getHours());
    },
    minute() {
      return this.formatNumber(this.date.getMinutes());
    },
    cursorVisible() {
      return this.date.getSeconds() % 2 === 0 ? "visible" : "invisible";
    },
  },
});
