// import type Solflare from '@solflare-wallet/sdk'

// export default defineNuxtPlugin(() => {
//   // @ts-expect-error no types for solflare
//   if (!globalThis.solflare) {
//     console.log('Solflare wallet not found')
//   }

//   // @ts-expect-error no types for solflare
//   const wallet: Solflare = globalThis.solflare

//   // const connected = computed(() => wallet.isConnected)
//   console.log('Solflare connected', wallet.isConnected)

//   return {
//     provide: {
//       solflare: {
//         wallet,
//         // connected,
//         connect: () => wallet.connect(),
//         disconnect: () => wallet.disconnect()
//       }
//     }
//   }

//   // if (window.solflare) {
//   //   await wallet.connect()
//   // }

//   // get solana balance
//   // if (wallet.isConnected) {
//   //   wallet.sign()
//   // }

//   // wallet.addListener('connect', () => {
//   //   console.log('connected', wallet.publicKey.toString())
//   // })

//   // wallet.on('connect', () => {
//   //   console.log('connected', wallet.publicKey.toString())
//   // })
//   // wallet.on('disconnect', () => {
//   //   console.log('disconnected')
//   // })

//   // const connectSolflare = async () => {
//   //   const provider = window.solflare
//   //   const res = await provider.connect()
//   //   return {
//   //     provider,
//   //     publicKey: res.publicKey.toString()
//   //   }
//   // }

//   // if (window.solflare) {
//   //   const { provider, publicKey } = await connectSolflare()
//   //   console.log('Connected to Solflare with public key:', publicKey)
//   // }
// })
