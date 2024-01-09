<template>
    <button class="button" :class="typeClass">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue"

defineOptions({
    name: "lGButton",
})
const props = defineProps({
    type: {
        type: String,
        default: "default",
    },
})
const typeClass = computed(() => `button-${props.type}`)
</script>

<style lang="less" scoped>
.button {
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;

    &-default {
        background-color: #eee;
        color: #333;
    }

    &-primary {
        background-color: #007bff;
        color: #fff;
    }
}
</style>
