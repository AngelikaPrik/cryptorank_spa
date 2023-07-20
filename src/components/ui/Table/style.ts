import { styled } from 'styled-components'


export const StyledTable = styled.table`
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  overflow: hidden;
  border-spacing: 0;

  thead tr {
    background-color: #d5eeff;
  }
  tbody tr:nth-child(even) {
    background-color: #f4faff;
  }

  th,
  td {
    padding: 20px 10px;
    text-align: left;
  }
  th:first-child,
  td:first-child {
    padding-left: 30px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    th,
    td {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`