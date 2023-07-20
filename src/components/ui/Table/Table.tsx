import { StyledTable } from './style'

export const Table = ({ theads, children }: PropsType) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {theads.map(thead => (
            <th key={thead}>{thead}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </StyledTable>
  )
}

interface PropsType {
  theads: string[]
  children: React.ReactNode
}
