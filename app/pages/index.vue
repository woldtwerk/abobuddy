<script setup lang="ts">
const username = "wwoldt";
const amount = "10";
const paypal = new URL(`https://paypal.me/${username}/${amount}EUR`);

const eurcPayLink = `solana:3TkF4zrieqbfijX1osRz6KLWX4DsYPqiuV5L4g7XXmou?${new URLSearchParams({
  "spl-token": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  amount: "10",
  label: "Abo Buddy",
  message: "Subscription payment",
}).toString()}`;

type BitvavoTickerMessage = {
  event?: string;
  market?: string;
  bestBid?: string;
  bestAsk?: string;
};

const solPrice = ref<number>();
const ethPrice = ref<number>();

const solanaPayLink = computed(
  () =>
    `solana:3TkF4zrieqbfijX1osRz6KLWX4DsYPqiuV5L4g7XXmou?${new URLSearchParams({
      amount: "10",
      label: "Abo Buddy",
      message: "Subscription payment",
    }).toString()}`,
);

const ethPayLink = computed(() => `ethereum:0xEd49b799B6d8fae4D0eC6e2f227c3BF764B8a905`);

const requestId = ref(0);
const { send } = useWebSocket<BitvavoTickerMessage>("wss://ws.bitvavo.com/v2", {
  autoReconnect: true,
  onConnected() {
    send(
      JSON.stringify({
        action: "getTickerPrice",
        requestId: requestId.value,
        market: "SOL-EUR",
      }),
    );
  },
  onMessage(_, event) {
    const data: {
      response: {
        market: string;
        price: string;
      };
    } = JSON.parse(event.data);

    if (data.response.market === "SOL-EUR") solPrice.value = parseFloat(data.response.price);
    if (data.response.market === "ETH-EUR") ethPrice.value = parseFloat(data.response.price);
  },
});
useIntervalFn(() => {
  requestId.value = requestId.value + 1;
  send(
    JSON.stringify({
      action: "getTickerPrice",
      requestId: requestId.value,
      market: "SOL-EUR",
    }),
  );
  requestId.value = requestId.value + 1;
  send(
    JSON.stringify({
      action: "getTickerPrice",
      requestId: requestId.value,
      market: "ETH-EUR",
    }),
  );
}, 5000);
</script>

<template>
  <div>
    <UPageSection>
      <div class="mb-4 text-sm">
        <div>SOL Price: {{ solPrice ?? "-" }}</div>
        <div>ETH Price: {{ ethPrice ?? "-" }}</div>
      </div>
      <div class="grid grid-cols-3 gap-16">
        <QrCode :url="paypal" logo="logos:paypal" />
        <QrCode :url="solanaPayLink" logo="token-branded:solana" />
        <QrCode :url="ethPayLink" logo="token-branded:eth" />
        <QrCode :url="eurcPayLink" logo="token-branded:eurc" />
      </div>
    </UPageSection>
  </div>
</template>
