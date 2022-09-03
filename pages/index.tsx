import type { NextPage } from 'next'
import { Container, Heading, Box } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { Connect } from '../components'
import { Erc1155Balance } from '../components'
import { useMounted } from '../hooks'

const Home: NextPage = () => {
  const isMounted = useMounted()
  const { isConnected } = useAccount()

  return (
    <Container maxW="container.lg" mt="2em">
      <Heading>ヘンカク カルタ</Heading>
      {isMounted && (
        <Box mt="2em">
          <Connect />
        </Box>
      )}
      {isMounted && (
        <Box mt="2em">
          <Erc1155Balance />
        </Box>
      )}
    </Container>
  )
}

export default Home
