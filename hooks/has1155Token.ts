import { useContractRead } from 'wagmi'
import erc1155Contract from '../utils/abis/erc1155Contract.json'

export const useHas1155Token = (
  contract: string,
  owners: (string | undefined)[],
  tokenIds: string[]
) => {
  const {
    data: balanceOfBatch,
    isError,
    error
  } = useContractRead({
    addressOrName: contract,
    contractInterface: erc1155Contract,
    functionName: 'balanceOfBatch',
    args: [owners, tokenIds]
  })

  return {
    balanceOfBatch,
    balances: balanceOfBatch,
    isError,
    error
  }
}
