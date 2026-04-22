<script setup lang="ts">
import { qrcode, type QRCodeSVGOptions } from "etiket";
import { defu } from "defu";

const props = defineProps<{
  url: string | URL;
  logo?: string;
  settings?: QRCodeSVGOptions;
}>();

const theme = useColorMode();

const qrOptions = computed(() =>
  defu(
    {
      color: theme.value === "dark" ? "var(--ui-bg)" : "var(--ui-text)",
      background: theme.value === "dark" ? "var(--ui-text)" : "var(--ui-bg)",
      margin: 1,
      ...(props.logo
        ? {
            logo: {
              size: 0.3,
            },
          }
        : {}),
    },
    props.settings,
  ),
);

const logoSizeRatio = computed(() => {
  const size = qrOptions.value.logo?.size;

  if (typeof size !== "number" || Number.isNaN(size)) {
    return 0.3;
  }

  return Math.min(1, Math.max(0, size));
});

const logoStyle = computed(() => ({
  width: `calc(${logoSizeRatio.value * 100}% - ${qrOptions.value.margin * 2}px)`,
  height: `calc(${logoSizeRatio.value * 100}% - ${qrOptions.value.margin * 2}px)`,
}));

const qrCodeSVG = computed(() => qrcode(props.url.toString(), qrOptions.value));
</script>

<template>
  <div>
    <div class="grid place-items-center *:col-start-1 *:row-start-1">
      <div v-html="qrCodeSVG" />
      <Icon v-if="props.logo" :name="props.logo" :style="logoStyle" />
    </div>
    <NuxtLink
      :to="props.url.toString()"
      :external="true"
      class="mt-2 text-sm text-center break-all"
    >
      {{ props.url.toString() }}
    </NuxtLink>
  </div>
</template>
