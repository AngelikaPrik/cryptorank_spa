'use client'

import { styled } from 'styled-components'
import { Loader } from '@/components/ui/Loader'

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
