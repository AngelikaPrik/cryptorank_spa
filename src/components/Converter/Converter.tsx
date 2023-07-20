'use client'
import useSWR from 'swr'
import { getConverting, validate } from '@/utils'
import { ChangeEvent, useState } from 'react'
import { ConversionData } from '@/types'
import { CONVERT_API_URL } from '@/constants'
import {
  AmountBox,
  Container,
  Label,
  Input,
  Box,
  Select,
  ConvertBtn,
} from './style'
import { Loader } from '../ui/Loader'
import { fetcher } from '@/api/fetcher'

export const Converter = () => {
  const { data, error, isLoading } = useSWR<ConversionData, Error>(
    CONVERT_API_URL,
    fetcher
  )

  const [inputValue, setInputValue] = useState<string>('1')
  const [from, setFrom] = useState<string>('BTC')
  const [to, setTo] = useState<string>('USD')

  if (error) return <Container>Error loading data</Container>
  if (isLoading || !data) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(validate(e.target.value))
  }

  const flipCurrency = () => {
    setFrom(to)
    setTo(from)
  }

  const convert = getConverting(
    data.data.values[from].price,
    data.data.values[to].price,
    inputValue
  )

  const keyValues = Object.keys(data.data.values)

  return (
    <Container>
      <AmountBox>
        <Label htmlFor='amount-label'>Amount</Label>
        <Input
          type='text'
          value={inputValue}
          onChange={onChangeInput}
          name='amount'
          id='amount-label'
          data-testid='amount-input'
        />
      </AmountBox>
      <Box>
        <Select
          name='from'
          value={from}
          onChange={e => setFrom(e.target.value)}
          data-testid='from'
        >
          {keyValues.map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
        <ConvertBtn data-testid='flipCurrency' onClick={flipCurrency}>
          FLIP
        </ConvertBtn>
        <Select
          name='to'
          value={to}
          onChange={e => setTo(e.target.value)}
          data-testid='to'
        >
          {keyValues.map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
      </Box>
      {data && (
        <h3 data-testid='result'>
          {inputValue} {from} = {convert} {to}
        </h3>
      )}
    </Container>
  )
}
