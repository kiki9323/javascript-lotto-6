import CONSTANTS from '../constants/constans.js';
import Lotto from '../Lotto.js';
import WinningChecker from '../domain/Lotto/WinningChecker.js';
import { inputWithRetry } from '../lib/utils.js';

class LottoController {
  constructor({ inputHandler, purchaseAmount, resultReturn }) {
    this.inputHandler = inputHandler;
    this.purchaseAmount = purchaseAmount;
    this.resultReturn = resultReturn;
  }

  async playLotto() {
    const amount = await this.lottoTicketsAfterUserInput();
    const lottoTickets = this.createLottoTiekcts(amount);
    const { winningNumbers, bonusNumber } = await this.getNumbersFromUser();

    const lottoCheckerResult = this.checkWinning(winningNumbers, bonusNumber, lottoTickets);

    this.printTotalResult(lottoCheckerResult);
    this.calculateReturnRate(lottoCheckerResult, amount);
  }

  async lottoTicketsAfterUserInput() {
    return await inputWithRetry(() => this.inputHandler.purchaseAmount());
  }

  createLottoTiekcts(amount) {
    return this.purchaseAmount.purchaseLotto(amount);
  }

  async getNumbersFromUser() {
    const winningNumbers = await inputWithRetry(() => this.inputHandler.winningNumbers());
    const bonusNumber = await inputWithRetry(() => this.inputHandler.bonusNumber(winningNumbers));
    return { winningNumbers, bonusNumber };
  }

  checkWinning(winningNumbers, bonusNumber, lottoTickets) {
    const validatedNumbers = new Lotto(winningNumbers.split(CONSTANTS.string.comma).map(Number));
    const winningChecker = new WinningChecker(validatedNumbers.numbers);
    return winningChecker.compareWinningAndLotto(bonusNumber, lottoTickets);
  }

  printTotalResult(lottoCheckerResult) {
    const winningChecker = new WinningChecker();
    winningChecker.printTotalResult(lottoCheckerResult);
  }

  calculateReturnRate(lottoCheckerResult, amount) {
    this.resultReturn.calculateReturnRate(lottoCheckerResult, amount);
  }
}

export default LottoController;
