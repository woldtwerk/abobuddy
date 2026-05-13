import { BrowserProvider, getDefaultProvider, formatEther } from 'ethers'

export default defineNuxtPlugin({
  name: 'ethers',
  setup: async () => {
    let signer = null

    let provider
    // @ts-expect-error no types for window.ethereum
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log('MetaMask not installed; using read-only defaults')
      provider = getDefaultProvider()
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.

      // @ts-expect-error no types for window.ethereum
      provider = new BrowserProvider(window.ethereum)

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner()
      const address = await signer.getAddress()
      console.log('Connected to MetaMask with address:', address)
      const balance = await provider.getBalance(address)
      console.log('Balance of', address, ':', formatEther(balance))
    }
  }
})
