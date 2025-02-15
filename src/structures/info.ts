const info = {
  paused: false,
  captcha: false,
  totalcaptcha: 0,

  getPaused(): boolean {
    return this.paused;
  },

  setPaused(state: boolean) {
    this.paused = state;
  },

  getCaptcha(): boolean {
    return this.captcha;
  },

  setCaptcha(state: boolean) {
    this.captcha = state;
  },

  increaseCaptcha() {
    this.totalcaptcha++;
  },
};

export default info;
