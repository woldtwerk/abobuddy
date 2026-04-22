<script setup lang="ts">
import { qrcode, type QRCodeSVGOptions } from 'etiket'
import { defu } from 'defu'

const props = defineProps<{
  url: string | URL
  logo?: string
  settings?: QRCodeSVGOptions
}>()

const qrOptions = computed(() => defu({
  color: 'var(--ui-text)',
  background: 'var(--ui-bg)',
  margin: 0,
  ...(props.logo
    ? {
        logo: {
          size: 0.3
        }
      }
    : {})
}, props.settings))

const logoSizeRatio = computed(() => {
  const size = qrOptions.value.logo?.size

  if (typeof size !== 'number' || Number.isNaN(size)) {
    return 0.3
  }

  return Math.min(1, Math.max(0, size))
})

const logoStyle = computed(() => ({
  width: `calc(${logoSizeRatio.value * 100}% - ${qrOptions.value.margin * 2}px)`,
  height: `calc(${logoSizeRatio.value * 100}% - ${qrOptions.value.margin * 2}px)`
}))

const qrCodeSVG = computed(() => qrcode(props.url.toString(), qrOptions.value))
</script>

<template>
  <div class="grid place-items-center *:col-start-1 *:row-start-1">
    <div v-html="qrCodeSVG" />
    <Icon
      v-if="props.logo"
      :name="props.logo"
      :style="logoStyle"
    />
  </div>
</template>
