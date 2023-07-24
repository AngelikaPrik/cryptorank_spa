'use client'
import { ChangeEvent, useMemo, useState } from 'react'
import { useGetConversionData } from '@/hooks'
import { ConversionData } from '@/types'
import { getConverting, separateNumberWithComma, validate } from '@/utils'
import { Loader } from '../ui/Loader'
import {
  AmountBox,
  Container,
  Label,
  Input,
  Box,
  Select,
  ConvertBtn,
} from './style'

const ResultMemoized = ({ amount, from, to, values }: PropsType) => {
  const convert = useMemo(
    () => getConverting(values[from].price, values[to].price, amount),
    [amount, from, to, values]
  )

  const separated = useMemo(() => separateNumberWithComma(+amount), [amount])

  return (
    <h3 data-testid="result">
      {separated} {from} = {convert} {to}
    </h3>
  )
}

export const Converter = () => {
  const { data, error, isLoading } = useGetConversionData()

  const [inputValue, setInputValue] = useState('1')
  const [from, setFrom] = useState('BTC')
  const [to, setTo] = useState('USD')

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
        <ResultMemoized
          amount={inputValue}
          from={from}
          to={to}
          values={data.data.values}
        />
      )}
    </Container>
  )
}

interface PropsType {
  amount: string
  from: string
  to: string
  values: ConversionData['data']['values']
}
