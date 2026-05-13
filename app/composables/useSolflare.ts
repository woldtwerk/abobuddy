import type Solflare from '@solflare-wallet/sdk'

export const useSolflare = () => {
  // const solflare = {
  //   wallet: null,
  //   connected: computed(() => wallet?.isConnected ?? false),
  //   connect: async () => {},
  //   disconnect: async () => {}
  // }

  // if (!import.meta.client) {
  //   return {
  //     wallet: null,
  //     connected,
  //     connect: async () => {},
  //     disconnect: async () => {}
  //   }
  // }

  // if (!('solflare' in globalThis)) {
  //   return {
  //     wallet: null,
  //     connected,
  //     connect: async () => {},
  //     disconnect: async () => {}
  //   }
  // }

  // @ts-expect-error no types for solflare
  const wallet: Solflare = globalThis.solflare
  const clientConnected = computed(() => wallet?.isConnected ?? false)

  return {
    wallet,
    connected: clientConnected,
    connect: () => wallet?.connect(),
    disconnect: () => wallet?.disconnect()
  }
}
