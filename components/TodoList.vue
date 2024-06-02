<template>
  <v-card class="pa-5" max-width="600">
    <v-card-title>
      <h2>Todo List</h2>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-select v-model="filter" :items="['all', 'completed', 'pending']" label="Filter"></v-select>
        </v-col>
        <v-col cols="6">
          <v-select v-model="sortBy" :items="['title', 'date']" label="Sort By"></v-select>
        </v-col>
      </v-row>
      <v-list>
        <v-list-item v-for="todo in filteredAndSortedTodos" :key="todo.id">
          <v-list-item-content>
            <v-list-item-title class="title">{{ todo.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="todo.description">{{ todo.description }}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="todo.date || todo.time">
              <v-icon class="mr-1">mdi-calendar</v-icon>{{ formatDate(todo.date) }} {{ formatTime(todo.time) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="todo.place">
              <v-icon class="mr-1">mdi-map-marker</v-icon>{{ todo.place }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn class="my-2 mx-1" small icon @click="toggleStatus(todo.id)">
              <v-icon>{{ todo.completed ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}</v-icon>
            </v-btn>
            <v-btn class="my-2 mx-1" small icon @click="openEditDialog(todo)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteTodo(todo.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
    <EditTodoModal 
      :editDialog="editDialog" 
      :todo="selectedTodo" 
      @update="handleUpdate" 
      @cancel="handleCancel" 
      @update:editDialog="editDialog = $event"
    />
  </v-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import EditTodoModal from './EditTodoModal.vue'

const store = useStore()
const filter = ref('all')
const sortBy = ref('title')
const editDialog = ref(false)
const selectedTodo = ref({})

const toggleStatus = (id) => {
  store.dispatch('toggleTodoStatus', id)
}

const deleteTodo = (id) => {
  store.dispatch('deleteTodo', id)
}

const openEditDialog = (todo) => {
  selectedTodo.value = { ...todo }
  editDialog.value = true
}

const handleUpdate = () => {
  editDialog.value = false
}

const handleCancel = () => {
  editDialog.value = false
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatTime = (time) => {
  if (!time) return ''
  return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const filteredAndSortedTodos = computed(() => {
  return store.getters.getFilteredAndSortedTodos(filter.value, sortBy.value)
})

watch([filter, sortBy], () => {
  store.dispatch('sortTodos', sortBy.value)
})
</script>

<style scoped>
.v-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.title {
  font-weight: bold;
}
</style>
