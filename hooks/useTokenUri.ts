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

  return {
    tokenURI,
    tokenUriIsError: isError,
    tokenUriError: error
  }
}
