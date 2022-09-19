import { useContractRead } from 'wagmi'
import erc1155Contract from '../utils/abis/erc1155Contract.json'

export const useTokenURI = (contract: string, tokenId: string) => {
  const {
    data: tokenURI,
    isError,
    error
  } = useContractRead({
    addressOrName: contract,
    contractInterface: erc1155Contract,
    functionName: 'uri',
    args: [tokenId]
  })
  const processedTokenURI = processTokenURI(
    typeof tokenURI == 'string' ? tokenURI : '',
    tokenId
  )
  return {
    tokenURI,
    processedTokenURI,
    tokenUriIsError: isError,
    tokenUriError: error
  }
}

// OpenSea does not return an URI for the token's metadata, but a pattern
// We need to replace the ID in '0x{id}' with the token ID in hex
const processTokenURI = (tokenURI: string, tokenId: string): string => {
  //Return empty string if we got 0 as a tokenURI
  if (tokenId == '0') return ''
  // Do not alter the URI if it is not an OpenSea API one
  if (tokenURI.indexOf('api.opensea.io/api') == -1) return tokenURI

  // Do not alter the URI if it does not come with '0x{id}' at the end
  const tokenIdIndex = tokenURI.indexOf('0x{id}')
  if (tokenIdIndex == -1) return tokenURI

  const processedTokenURI = tokenURI.substring(0, tokenIdIndex) + '0x'
  const tokenIdHex = BigInt(tokenId).toString(16)
  return processedTokenURI + tokenIdHex //+ '?format=json'
}
