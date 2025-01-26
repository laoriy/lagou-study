<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus data-testid="new-todo"
      @keyup.enter="handleNewTodo">
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits(['new-todo'])
function handleNewTodo(e: KeyboardEvent) {
  const value = (e as any).target.value.trim()
  if (!value.length) {
    return
  }
  emit('new-todo', value)
  e.target.value = ''
}
</script>

<style scoped></style>