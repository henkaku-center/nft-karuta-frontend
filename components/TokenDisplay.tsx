import { useNetwork } from 'wagmi'
import { Badge, ListItem, Link } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useTokenURI } from '../hooks/'
import { getContractAddress } from '../utils/contractAddress'
import { tokenIdWithKana } from '../utils/tokenIds'

export function TokenDisplay({ token }: { token: tokenIdWithKana }) {
  const { chain } = useNetwork()
  const erc1155Contract = getContractAddress({
    name: 'erc1155Contract',
    chainId: chain?.id
  })
  const { processedTokenURI } = useTokenURI(
    erc1155Contract,
    token.tokenId || '0'
  )
  return (
    <>
      <ListItem key={token.tokenId}>
        <Link href={processedTokenURI}>
          <Badge colorScheme="green" mr="0.5em">
            <CheckIcon></CheckIcon> {token.kana}
          </Badge>
        </Link>
      </ListItem>
    </>
  )
}
