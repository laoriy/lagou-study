<template>
    <ul class="error-messages">
        <template v-for="(messages, field) in errors" :key="field">
            <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
            </li>
        </template>
    </ul>
</template>

<script setup lang="ts">
defineProps({
    errors: {
        type: Object,
        default: () => ({}),
    },
})
</script>

<style scoped></style>
