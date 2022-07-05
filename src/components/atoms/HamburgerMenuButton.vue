<template>
  <div class="z-40 md:hidden inline-flex">
    <input
      type="checkbox"
      id="nav-checkbox"
      @click="$emit('toggleMobileNav')"
      class="hidden nav-checkbox"
      :checked="checked"
    />
    <label class="hamburger block relative w-[32px] h-[32px] z-50 cursor-pointer" for="nav-checkbox">
      <button class="lines block cursor-pointer">
        <div class="line-wrapper absolute left-[7px] top-[15px] top">
          <div class="line h-[2px] w-[16px] rounded-[3px] top"></div>
        </div>
        <div class="line-wrapper absolute left-[7px] top-[15px] bottom">
          <div class="line h-[2px] w-[16px] rounded-[3px] bottom"></div>
        </div>
      </button>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  checked: boolean
}>()
defineEmits(['toggleMobileNav'])
</script>

<style scoped>
.line-wrapper.top {
  transform: translateY(-3px) scaleX(0.88235);
}
.line-wrapper.bottom {
  transform: translateY(3px) scaleX(0.88235);
}
.nav-checkbox:checked + label .line-wrapper .line.bottom {
  transform: rotateZ(45deg);
}
.nav-checkbox:checked + label .line-wrapper .line.top {
  transform: rotateZ(-45deg);
}
.nav-checkbox:checked + label .line-wrapper.bottom {
  transform: none;
}
.nav-checkbox:checked + label .line-wrapper.top {
  transform: none;
}
.nav-checkbox:checked + label .line.bottom {
  transform: none;
  transition-delay: 0.1s;
}
.nav-checkbox:checked + label .line.top {
  transform: none;
  transition-delay: 0.1s;
}
.line-wrapper {
  transition: transform 0.2s ease-in-out 0.1s;
}
.nav-checkbox:checked + label .line-wrapper {
  transition-delay: 0s;
}
.line {
  transition: transform 0.2s ease-in-out;
  @apply bg-gray-900;
}
.lines {
  all: unset;
}
.lines * {
  pointer-events: none;
}
</style>
