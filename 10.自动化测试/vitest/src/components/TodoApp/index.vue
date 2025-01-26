<template>
  <section class="todoapp">
    <TodoHeader @new-todo="handleNewTodo" />
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TodoHeader from './TodoHeader.vue';
import TodoItem from './TodoItem.vue';
const todos = ref<{ id: number, text: string, done: boolean }[]>([{ id: 1, text: 'foo', done: false }])
function handleNewTodo(text: string) {
  const lastTodo = todos.value[todos.value.length - 1]
  todos.value.push({
    id: lastTodo ? lastTodo.id + 1 : 1,
    text,
    done: false
  })
}

</script>

<style scoped></style>