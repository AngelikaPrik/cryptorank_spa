'use client'
import axios from 'axios'
import useSWR, { Fetcher } from 'swr'
import { styled } from 'styled-components'
import { getConverting, validate } from '@/utils'
import { ChangeEvent, useState } from 'react'
import { ConversionData } from '@/types'
import { CONVERT_API_URL } from '@/constants'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 0 20px;
`
const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const inputOrSelectStyle = `
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border-radius: 10px;
  border: none;
  max-width: 350px;
`
const Input = styled.input`
  ${inputOrSelectStyle}
`
const Select = styled.select`
  ${inputOrSelectStyle}
`
const AmountBox = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  font-size: 12px;
  margin-bottom: 5px;
`

const ConvertBtn = styled.button`
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: #c5e8ff;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const fetcher: Fetcher<ConversionData, string> = async (url: string) => {
  const { data } = await axios.get(url)
  return data
}

export default function Converter() {
  const { data, error } = useSWR<ConversionData>(CONVERT_API_URL, fetcher)

  const [inputValue, setInputValue] = useState<string>('1')
  const [from, setFrom] = useState<string>('BTC')
  const [to, setTo] = useState<string>('USD')

  if (error) return <Container>Error loading data</Container>
  if (!data) return <Container>Loading...</Container>

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
          data-testid="amount-input"
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
