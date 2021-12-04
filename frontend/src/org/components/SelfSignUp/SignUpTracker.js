class SignUpTracker {
  constructor() {
    this.signUpState = 1;
  }

  next() {
    this.signUpState += 1;
  }

  back() {
    this.signUpState -= 1;
  }

  setState(num) {
    this.signUpState = num;
  }

  getState() {
    return this.signUpState;
  }
}

export default new SignUpTracker();
