<template>
  <v-card class="pa-5" max-width="600">
    <v-card-title>
      <h2>Add New Todo</h2>
    </v-card-title>
    <v-card-text>
      <v-btn @click="showModal = true" color="primary" large>Add Todo</v-btn>
    </v-card-text>


  </v-card>
  <v-dialog v-model="showModal" max-width="800">
    <v-card>
      <v-card-title>Add New Todo</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addTodo">
          <v-text-field v-model="title" label="Title" outlined required></v-text-field>
          <v-textarea v-model="description" label="Description" outlined></v-textarea>
          <v-text-field v-model="place" label="Place" outlined></v-text-field>
          <v-text-field v-model="date" label="Date" type="date" outlined></v-text-field>
          <v-text-field v-model="time" label="Time" type="time" outlined></v-text-field>
          <v-btn type="submit" class="mr-2" color="primary">Add Todo</v-btn>
          <v-btn @click="cancelAdd" color="warning">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

const showModal = ref(false)
const title = ref('')
const description = ref('')
const date = ref('')
const time = ref('')
const place = ref('')
const store = useStore()

const addTodo = () => {
  if (!title.value.trim()) return
  store.dispatch('addTodo', {
    id: Date.now(),
    title: title.value,
    description: description.value,
    date: date.value,
    time: time.value,
    place: place.value,
    completed: false
  })
  title.value = ''
  description.value = ''
  date.value = ''
  time.value = ''
  place.value = ''
  showModal.value = false
}

const cancelAdd = () => {
  showModal.value = false
}

</script>

<style scoped>
.v-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
