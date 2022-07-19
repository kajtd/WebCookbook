<template>
  <div class="loader inline-block relative w-[80px] h-[80px]">
    <div></div>
    <div></div>
    <p class="text-black font-semibold text-sm text-center mt-3">
      <slot />
    </p>
  </div>
</template>

<style scoped>
.loader div {
  @apply absolute border-4 border-primary opacity-100 rounded-full;
  animation: pulse 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.loader div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes pulse {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
