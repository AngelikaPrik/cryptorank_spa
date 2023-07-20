import { ConversionData, CurrencyListData } from '../types/index'
import { fetcher } from '@/api/fetcher'
import { BASE_URL } from '@/constants'
import useSWR from 'swr'

const CONVERT_API_URL = `${BASE_URL}v1/currencies/1?api_key=${process.env.customKey}`
const COINDATA_API_URL = `${BASE_URL}v1/currencies?api_key=${process.env.customKey}`

export const useGetCurrencyListData = () => {
  return useSWR<CurrencyListData, Error>(COINDATA_API_URL, fetcher)
}
export const useGetConversionData = () => {
  return useSWR<ConversionData, Error>(CONVERT_API_URL, fetcher)
}
