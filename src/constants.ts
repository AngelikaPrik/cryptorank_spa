const BASE_URL = 'https://api.cryptorank.io/'
export const COINDATA_API_URL = `${BASE_URL}v1/currencies?api_key=${process.env.customKey}`
export const CONVERT_API_URL = `${BASE_URL}v1/currencies/1?api_key=${process.env.customKey}`
