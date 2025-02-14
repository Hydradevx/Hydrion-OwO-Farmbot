const info: any = {
  paused: false,

  getPaused() {
    return this.paused;
  },

  setPaused(state: boolean) {
    this.paused = state;
  },
};

export default info;
