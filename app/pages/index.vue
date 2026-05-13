<script setup lang="ts">
const username = 'wwoldt'
const amount = ref(10)
const paypalLink = computed(() => `https://paypal.me/${username}/${amount.value}EUR`)

const eurcPayLink = `solana:3TkF4zrieqbfijX1osRz6KLWX4DsYPqiuV5L4g7XXmou?${new URLSearchParams({
  'spl-token': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  'amount': '10',
  'label': 'Abo Buddy',
  'message': 'Subscription payment'
}).toString()}`

type BitvavoTickerMessage = {
  event?: string
  market?: string
  bestBid?: string
  bestAsk?: string
}

const solPrice = ref<number>()
const ethPrice = ref<number>()

const solanaPayLink = computed(() =>
  solPrice.value
    ? `solana:3TkF4zrieqbfijX1osRz6KLWX4DsYPqiuV5L4g7XXmou?${new URLSearchParams({
      amount: (amount.value / (solPrice.value || 1)).toFixed(6),
      label: 'Abo Buddy',
      message: 'Subscription payment'
    }).toString()}`
    : ''
)

const ethPayLink = computed(() =>
  ethPrice.value
    ? `ethereum:0xEd49b799B6d8fae4D0eC6e2f227c3BF764B8a905?${new URLSearchParams({
      value: Math.round(((amount.value / (ethPrice.value || 1)) * 1e18)).toString()
    }).toString()}`
    : ''
)

const requestId = ref(0)
const { send } = useWebSocket<BitvavoTickerMessage>('wss://ws.bitvavo.com/v2', {
  autoReconnect: true,
  onConnected() {
    send(
      JSON.stringify({
        action: 'getTickerPrice',
        requestId: requestId.value,
        market: 'SOL-EUR'
      })
    )
    send(
      JSON.stringify({
        action: 'getTickerPrice',
        requestId: requestId.value,
        market: 'ETH-EUR'
      })
    )
  },
  onMessage(_, event) {
    const data: {
      response: {
        market: string
        price: string
      }
    } = JSON.parse(event.data)

    if (data.response.market === 'SOL-EUR') solPrice.value = parseFloat(data.response.price)
    if (data.response.market === 'ETH-EUR') ethPrice.value = parseFloat(data.response.price)
  }
})
useIntervalFn(() => {
  requestId.value = requestId.value + 1
  send(
    JSON.stringify({
      action: 'getTickerPrice',
      requestId: requestId.value,
      market: 'SOL-EUR'
    })
  )
  requestId.value = requestId.value + 1
  send(
    JSON.stringify({
      action: 'getTickerPrice',
      requestId: requestId.value,
      market: 'ETH-EUR'
    })
  )
}, 2000)
</script>

<template>
  <div>
    <UPageSection>
      <div class="mb-4 text-sm">
        <div>SOL Price: {{ solPrice ?? "-" }}</div>
        <div>ETH Price: {{ ethPrice ?? "-" }}</div>
        <UFormField
          required
          label="Amount"
        >
          <UInputNumber
            v-model="amount"
            :format-options="{
              style: 'currency',
              currency: 'EUR',
              currencyDisplay: 'code',
              currencySign: 'accounting'
            }"
            placeholder="Enter amount"
          />
        </UFormField>
      </div>
      <div class="grid grid-cols-3 gap-16">
        <QrCode
          :url="paypalLink"
          logo="logos:paypal"
        />
        <QrCode
          :url="solanaPayLink"
          logo="token-branded:solana"
        />
        <QrCode
          :url="ethPayLink"
          logo="token-branded:eth"
        />
        <QrCode
          :url="eurcPayLink"
          logo="token-branded:eurc"
        />
      </div>
    </UPageSection>
  </div>
</template>
