<script setup lang="ts">
import { address } from '@solana/kit'

const username = 'wwoldt'
const amount = '10'
const paypal = new URL(`https://paypal.me/${username}/${amount}EUR`)

const solanaPayLink = `solana:3TkF4zrieqbfijX1osRz6KLWX4DsYPqiuV5L4g7XXmou?${new URLSearchParams({
  amount: '10',
  label: 'Abo Buddy',
  message: 'Subscription payment'
}).toString()}`

const eurcPayLink = `solana:3TkF4zrieqbfijX1osRz6KLWX4DsYPqiuV5L4g7XXmou?${new URLSearchParams({
  'spl-token': 'HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr',
  'amount': '10',
  'label': 'Abo Buddy',
  'message': 'Subscription payment'
}).toString()}`
</script>

<template>
  <div>
    <UPageSection>
      <QrCode
        :url="paypal"
        logo="logos:paypal"
      />
      <QrCode
        :url="solanaPayLink"
        logo="token-branded:solana"
      />
      <QrCode
        :url="eurcPayLink"
        logo="token-branded:eurc"
      />
    </UPageSection>
  </div>
</template>
