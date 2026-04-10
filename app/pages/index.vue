<script setup lang="ts">
import { renderSVG } from "uqr";

const username = "wwoldt";
const amount = "10";

const paypalme = () => {
  const url = new URL(`https://paypal.me/${username}/${amount}EUR`);
  return renderSVG(url.toString());
};

console.log(paypalme());
</script>

<template>
  <div>
    <UPageSection>
      <div class="w-80" v-html="paypalme()" />
    </UPageSection>
  </div>
</template>
