const info = {
  paused: false,
  captcha: false,
  totalcaptcha: 0,
  getPaused() {
    return this.paused;
  },
  setPaused(state) {
    this.paused = state;
  },
  getCaptcha() {
    return this.captcha;
  },
  setCaptcha(state) {
    this.captcha = state;
  },
  increaseCaptcha() {
    this.totalcaptcha++;
  },
};
export default info;
