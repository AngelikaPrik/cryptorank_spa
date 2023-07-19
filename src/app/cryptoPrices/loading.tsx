'use client'

import { Loader } from '@/components/Loader'
import { styled } from 'styled-components'

const Container = styled.div`
  max-width: 80%;
  margin: 0 auto;
`

export default function Loading() {
  return (
    <Container>
      <Loader />
    </Container>
  )
}
