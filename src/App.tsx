import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import './App.scss';
import Coin from './components/coin/coin';
import { CoinSymbol, setPrice } from './state/coinsSlice';

function App() {
  const [socketUrl] = useState(
    'wss://stream.binance.com:443/ws/btcusdt@ticker/ethusdt@ticker/dogeusdt@ticker/solusdt@ticker'
  );

  const { lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
    retryOnError: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (lastMessage === null) return;

    const data = JSON.parse(lastMessage.data);

    const price = +data.c;
    const symbol = data.s as CoinSymbol;

    dispatch(setPrice({ symbol, price }));
  }, [lastMessage]);

  const coins = useMemo(
    () =>
      (Object.keys(CoinSymbol) as CoinSymbol[]).map((symbol) => (
        <Coin key={symbol} symbol={symbol} />
      )),
    [Coin]
  );

  return (
    <>
      <h1>CRYPTO COINS</h1>

      {coins}
    </>
  );
}

export default App;
