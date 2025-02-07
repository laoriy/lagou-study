<template>
  <li data-testid="todo-item" :class="{
    completed: todo.done,
    editing: isEditing
  }">
    <div class="view">
      <input v-model="theTodo.done" data-testid="todo-done" class="toggle" type="checkbox" />
      <label data-testid="todo-text" @dblclick="isEditing = true">{{ todo.text }}</label>
      <button data-testid="delete" class="destroy" @click="$emit('delete-todo', todo.id)"></button>
    </div>
    <input :value="todo.text" v-focus="isEditing" class="edit" data-testid="todo-edit" @blur="isEditing = false"
      @keyup.enter="handleEditTodo" @keyup.esc="handleCancelEdit" />
  </li>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  todo: {
    id: number
    text: string
    done: boolean
  }
}>()
const emit = defineEmits(['delete-todo', 'edit-todo'])

const vFocus = {
  mounted: (el) => {
    el.focus()
  },
  updated: (el) => {
    el.focus()
  }
}
const isEditing = ref(false)
const theTodo = ref(props.todo)
watchEffect(() => {
  theTodo.value = props.todo
})


function handleEditTodo(e: any) {
  emit('edit-todo', {
    id: props.todo.id,
    text: e.target.value
  })
  // 取消编辑状态
  isEditing.value = false
}

function handleCancelEdit() {
  isEditing.value = false
}
</script>

<style scoped></style>