import { Console } from '@woowacourse/mission-utils';
import LOTTO from '../constants/lotto.js';
import MESSAGE from '../constants/message.js';
import { MessageFormat } from '../utils/messageFormat.js';

class LottoChecker {
  constructor(lotto) {
    this.lotto = lotto;
  }

  /**
   * 당첨 통계 헤더를 출력합니다.
   */
  printResultHeader() {
    Console.print(MESSAGE.output.resultHeader);
  }

  /**
   * 당첨 번호를 로또 티켓들과 비교하고, 결과를 반환합니다.
   * @param {string} bonusNumber 보너스 번호
   * @param {Array} lottoList 로또 티켓들
   * @returns {Object} 당첨 통계 결과
   */
  compareWinningAndLotto(bonusNumber, lottoList) {
    this.printResultHeader();

    const { winningMin, bonus } = LOTTO.number;
    const { count: bonusCount, key: bonusKey } = bonus;

    const result = {
      3: 0,
      4: 0,
      5: 0,
      '5_bonus': 0,
      6: 0,
    };

    lottoList.forEach((lotto) => {
      const matchedNumbers = this.lotto.numbers.map(Number).filter((num) => lotto.includes(num));
      const matchedNumbersKey = matchedNumbers.length;
      const hasBonusNumber = lotto.includes(Number(bonusNumber));

      if (matchedNumbers.length < winningMin) return;

      const key = hasBonusNumber && matchedNumbersKey === bonusCount ? bonusKey : matchedNumbersKey;
      result[key] = (result[key] || 0) + 1;
    });

    return result;
  }

  /**
   * 당첨 통계 결과를 출력합니다.
   * @param {Object} result 당첨 통계 결과
   */
  printTotalResult(result) {
    Array.from(LOTTO.lottoPrizesMap.keys()).forEach((key) => {
      Console.print(MessageFormat.resultRow(key, result[key]));
    });
  }
}
export default LottoChecker;