import { fetcher } from '@/api/fetcher'
import useSWR from 'swr'

export const UseFetching = <T>(API: string) => {
  return useSWR<T, Error>(API, fetcher)
}
