import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import BitcoinIcon from '../../icons/btc.tsx';
import DogeIcon from '../../icons/doge.tsx';
import EthereumIcon from '../../icons/eth.tsx';
import SolanaIcon from '../../icons/sol.tsx';
import { CoinSymbol } from '../../state/coinsSlice.tsx';
import store from '../../store/store.tsx';
import './coin.scss';

const coinLabels = {
  [CoinSymbol.BTCUSDT]: 'Bitcoin',
  [CoinSymbol.ETHUSDT]: 'Ethereum',
  [CoinSymbol.DOGEUSDT]: 'Doge',
  [CoinSymbol.SOLUSDT]: 'Solana',
};
/**
 * Parses a number and returns it as a string with two decimal places.
 * if the number is negative but less then 0.00 it returns '0.00' instead.
 *
 * @param num - The number to be parsed.
 * @returns The parsed number as a string with two decimal places and in US format
 */
const parseNumber = (num: number) => {
  const parsed = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (parsed.startsWith('-') && +parsed === 0) return '0.00';

  return parsed;
};
/**
 * React component for displaying a coin with its icon, name, price, and change percentage.
 *
 * @component
 * @param {Object} props - The props for the Coin component.
 * @param {CoinSymbol} props.symbol - The symbol of the coin.
 * @returns {JSX.Element} - The rendered Coin component.
 */
const Coin = React.memo(function Coin(props: { symbol: CoinSymbol }) {
  const { symbol } = props;

  const coin = useSelector(
    (state: ReturnType<typeof store.getState>) => state.coins[symbol]
  );

  const { priceParsed, changeParsed, loadingClass } = useMemo(
    () => ({
      priceParsed: parseNumber(coin.price),
      loadingClass: coin.initialPrice === 0 ? 'loading' : '',
      changeParsed: parseNumber(coin.percentChange),
    }),
    [coin]
  );

  const changeClass = useMemo(
    () => (+changeParsed === 0 ? '' : +changeParsed < 0 ? 'red' : 'green'),
    [changeParsed]
  );

  const icon = useMemo(
    () =>
      ({
        BTCUSDT: <BitcoinIcon />,
        ETHUSDT: <EthereumIcon />,
        DOGEUSDT: <DogeIcon />,
        SOLUSDT: <SolanaIcon />,
      }[symbol]),
    [symbol]
  );

  return (
    <>
      <section>
        {icon}
        <h2>{coinLabels[symbol]}</h2>
        <span className={`price ${loadingClass}`}>Price: ${priceParsed}</span>
        <span className={`change ${changeClass} ${loadingClass}`}>
          Change: {changeParsed}%
        </span>
      </section>
    </>
  );
});

export default Coin;
