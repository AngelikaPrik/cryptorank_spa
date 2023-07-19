import { styled } from 'styled-components'

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 0 20px;
`
export const Box = styled.div`
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
export const Input = styled.input`
  ${inputOrSelectStyle}
`
export const Select = styled.select`
  ${inputOrSelectStyle}
`
export const AmountBox = styled.div`
  display: flex;
  flex-direction: column;
`
export const Label = styled.label`
  font-size: 12px;
  margin-bottom: 5px;
`

export const ConvertBtn = styled.button`
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: #c5e8ff;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
