export interface CoinData {
  name: string
  category: string
  circulatingSupply: number
  values: {
    USD: {
      marketCap: number
      price: number
    }
  }
  symbol: string
}

export interface CurrencyListData {
  data: CoinData[]
}

export interface ConversionData {
  data: {
    values: {
      [x: string]: {
        price: number
      }
    }
  }
}
