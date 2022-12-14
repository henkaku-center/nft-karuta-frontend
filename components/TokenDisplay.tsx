import { useState, useEffect } from 'react'
import { useNetwork } from 'wagmi'
import { Badge, Box, Link, Image, Heading, Text } from '@chakra-ui/react'
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { useTokenURI } from '../hooks'
import {
  getContractAddress,
  openSeaTokenAddress
} from '../utils/contractAddress'
import { TokenIdWithKana } from '../utils/tokenIds'
interface MetadataProperty {
  [key: string]: string | number | boolean
}
interface Metadata {
  name: string
  image: string
  traits: MetadataProperty[]
  [key: string]: string | number | boolean | MetadataProperty[]
}
interface TokenIdWithKanaBraced {
  token: TokenIdWithKana
}

export function TokenDisplay({ token }: TokenIdWithKanaBraced) {
  const { chain } = useNetwork()
  const erc1155Contract = getContractAddress({
    name: 'erc1155Contract',
    chainId: chain?.id
  })
  const { processedTokenURI } = useTokenURI(
    erc1155Contract,
    token.tokenId || '0'
  )
  const [tokenMetadata, setTokenMetadata] = useState<Metadata>()
  useEffect(() => {
    if (processedTokenURI.length === 0) return

    //IPFS not supported yet
    if (processedTokenURI.indexOf('ipfs://') === 0) return

    const fetchTokenMetadata = async () => {
      try {
        const response = await fetch(processedTokenURI)
        if (response.ok !== true) {
          throw 'Error fetching metadata: ' + response.status
        }
        const newData = await response.json()
        setTokenMetadata(newData)
      } catch (error) {
        console.log('error: ', error)
      }
    }
    fetchTokenMetadata()
  }, [processedTokenURI])
  return (
    <>
      <Box w="176px" h="200px">
        {JSON.stringify(tokenMetadata) !== '{}' ? (
          <>
            <Image src={tokenMetadata?.image} alt={tokenMetadata?.name} />
            <Link href={openSeaTokenAddress + token.tokenId}>
              <Heading as="h3" size="sm" mt="1em">
                {tokenMetadata?.name}
              </Heading>
            </Link>
            <Text mt="1em">Available properties:</Text>
            {tokenMetadata?.traits.map(({ value }, index) => (
              <Badge colorScheme="green" mr="4px" key={index}>
                <CheckIcon></CheckIcon>
                {value}
              </Badge>
            ))}
          </>
        ) : (
          <>
            <Box w="176px" h="176px"></Box>
            <Link href={processedTokenURI}>
              <Badge colorScheme="red">Could not fetch: {token.kana}</Badge>
            </Link>
          </>
        )}
      </Box>
    </>
  )
}
