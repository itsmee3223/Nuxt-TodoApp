<template>
  <v-dialog v-model="localDialog" max-width="700">
    <v-card>
      <v-card-title>Edit Todo</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateTodo">
          <v-text-field v-model="localTodo.title" label="Title" outlined required></v-text-field>
          <v-textarea v-model="localTodo.description" label="Description" outlined></v-textarea>
          <v-text-field v-model="localTodo.place" label="Place" outlined></v-text-field>
          <v-text-field v-model="localTodo.date" label="Date" type="date" outlined></v-text-field>
          <v-text-field v-model="localTodo.time" label="Time" type="time" outlined></v-text-field>

          <v-btn class="mr-2" type="submit" color="primary">Save Changes</v-btn>
          <v-btn @click="cancelEdit" color="warning">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  editDialog: Boolean,
  todo: Object
})

const emit = defineEmits(['update', 'cancel', 'update:editDialog'])

const store = useStore()
const localTodo = ref({ ...props.todo })
const localDialog = ref(props.editDialog)

watch(() => props.editDialog, (newVal) => {
  localDialog.value = newVal
})

watch(localDialog, (newVal) => {
  emit('update:editDialog', newVal)
})

watch(() => props.todo, (newVal) => {
  localTodo.value = { ...newVal }
})

const updateTodo = () => {
  store.dispatch('editTodo', localTodo.value)
  emit('update')
}

const cancelEdit = () => {
  emit('cancel')
}
</script>
