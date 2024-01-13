<template>
    <button class="button" :class="typeClass">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue"

export type Props = {
    type?: "default" | "primary"
}

const props = withDefaults(defineProps<Props>(), {
    type: "default",
})
defineOptions({
    name: "lGButton",
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
