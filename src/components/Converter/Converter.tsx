'use client'
import { getConverting, separateNumberWithComma, validate } from '@/utils'
import { ChangeEvent, useState } from 'react'
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
import { useGetConversionData } from '@/hooks'

export const Converter = () => {
  const { data, error, isLoading } = useGetConversionData()

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
        <Label htmlFor="amount-label">Amount</Label>
        <Input
          type="text"
          value={inputValue}
          onChange={onChangeInput}
          name="amount"
          id="amount-label"
          data-testid="amount-input"
        />
      </AmountBox>
      <Box>
        <Select
          name="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          data-testid="from"
        >
          {keyValues.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
        <ConvertBtn data-testid="flipCurrency" onClick={flipCurrency}>
          FLIP
        </ConvertBtn>
        <Select
          name="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          data-testid="to"
        >
          {keyValues.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
      </Box>
      {data && (
        <h3 data-testid="result">
          {separateNumberWithComma(+inputValue)} {from} = {convert} {to}
        </h3>
      )}
    </Container>
  )
}
