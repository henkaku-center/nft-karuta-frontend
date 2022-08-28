import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Box, Button } from '@chakra-ui/react'

import { useMounted } from '../hooks'

export function Connect() {
  const isMounted = useMounted()
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  return (
    <Box>
      <Box>
        {isConnected ? (
          <Button onClick={() => disconnect()}>Disconnect Wallet</Button>
        ) : (
          connectors
            .filter((x) => isMounted && x.ready && x.id !== connector?.id)
            .map((x) => (
              <Button key={x.id} onClick={() => connect({ connector: x })}>
                Connect {x.name}
                {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
              </Button>
            ))
        )}
      </Box>

      {error && <Box>{error.message}</Box>}
    </Box>
  )
}
