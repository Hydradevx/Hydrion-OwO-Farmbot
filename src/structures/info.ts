const info = {
  paused: false,

  getPaused(): boolean {
    return this.paused;
  },

  setPaused(state: boolean) {
    this.paused = state;
  },
};

export default info;
