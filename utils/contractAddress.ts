import { chainId } from 'wagmi'

interface ContractAddress {
  [name: string]: {
    [chainId: number]: string
  }
}

interface getContractAddressArg {
  name: keyof ContractAddress
  chainId: number | undefined
}

const defaultChainID = process.env.production
  ? chainId.polygon
  : chainId.polygon

const contractAddress: ContractAddress = {
  erc1155Contract: {
    [chainId.polygon]: '0x2953399124f0cbb46d2cbacd8a89cf0599974963'
  }
}

const getContractAddress = ({ name, chainId }: getContractAddressArg) => {
  return contractAddress[name][chainId || defaultChainID]
}

const openSeaTokenAddress =
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/'
export {
  contractAddress,
  defaultChainID,
  getContractAddress,
  openSeaTokenAddress
}
