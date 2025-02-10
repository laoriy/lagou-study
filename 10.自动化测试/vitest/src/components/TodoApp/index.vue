<template>
  <section class="todoapp">
    <TodoHeader @new-todo="handleNewTodo" />
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input v-model="toggleAll" data-testid="toggle-all" id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @delete-todo="handleDelteTodo"
          @edit-todo="handleEditTodo" />
      </ul>
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <TodoFooter :todos="todos" @clear-completed="handleClearCompleted" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import TodoHeader from './TodoHeader.vue';
import TodoItem from './TodoItem.vue';
import TodoFooter from './TodoFooter.vue';
const todos = ref<{ id: number, text: string, done: boolean }[]>([{ id: 1, text: 'foo', done: false }])

const toggleAll = computed({
  get() {
    return todos.value.length && todos.value.every(todo => todo.done)
  },
  set(value) {
    todos.value.forEach(todo => {
      todo.done = value
    })
  }
})
function handleNewTodo(text: string) {
  const lastTodo = todos.value[todos.value.length - 1]
  todos.value.push({
    id: lastTodo ? lastTodo.id + 1 : 1,
    text,
    done: false
  })
}

function handleDelteTodo(todoId: number) {
  const index = todos.value.findIndex(t => t.id === todoId)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
}
function handleEditTodo({ id, text }: { id: number, text: string }) {
  const todo = todos.value.find(t => t.id === id)
  if (!todo) {
    return
  }
  if (!text.trim().length) {
    // 执行删除操作
    return handleDelteTodo(id)
  }
  // 执行修改操作
  todo.text = text
}

</script>

<style scoped></style>