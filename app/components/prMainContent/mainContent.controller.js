const DEFAULT_MESSAGE = 'svete!';

export default class mainController {

  constructor() {
    this.message = DEFAULT_MESSAGE;
  }

  resetToDefault() {
    this.message = DEFAULT_MESSAGE;
  }
}
