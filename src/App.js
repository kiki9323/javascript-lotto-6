import InputHandler from './view/InputHanlder.js';
import LottoController from './controller/LottoController';
import LottoGenerator from './domain/Purchase/LottoGenerator.js';
import PurchaseAmount from './domain/Purchase/PurchaseAmount.js';
import ResultReturn from './domain/Lotto/ResultReturn.js';

class App {
  #lottoController;

  constructor() {
    this.#lottoController = new LottoController({
      inputHandler: new InputHandler(),
      purchaseAmount: new PurchaseAmount(new LottoGenerator()),
      resultReturn: new ResultReturn(),
    });
  }

  async play() {
    await this.#lottoController.playLotto();
  }
}

export default App;
