import { createSlice } from '@reduxjs/toolkit';

export enum CoinSymbol {
  BTCUSDT = 'BTCUSDT',
  ETHUSDT = 'ETHUSDT',
  DOGEUSDT = 'DOGEUSDT',
  SOLUSDT = 'SOLUSDT',
}

export const coinsSlice = createSlice({
  name: 'coins',
  initialState: Object.keys(CoinSymbol).reduce(
    (acc, symbol) => ({
      ...acc,
      [symbol]: {
        initialPrice: 0,
        price: 0,
        percentChange: 0,
      },
    }),
    {}
  ) as {
    [sym in CoinSymbol]: {
      initialPrice: number;
      price: number;
      percentChange: number;
    };
  },
  reducers: {
    setPrice: (
      state,
      action: {
        payload: {
          symbol: CoinSymbol;
          price: number;
        };
      }
    ) => {
      const { symbol, price } = action.payload;

      if (!state[symbol].initialPrice) {
        state[symbol].initialPrice = state[symbol].price = price;
        return;
      }

      if (state[symbol].price === price) return;

      state[symbol].price = price;

      state[symbol].percentChange =
        (price - state[symbol].initialPrice) / state[symbol].initialPrice;
    },
  },
});

export const { setPrice } = coinsSlice.actions;
export default coinsSlice.reducer;
