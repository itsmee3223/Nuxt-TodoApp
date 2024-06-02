<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <AddTodo />
        <TodoList class="mt-6" />
      </v-col>
    </v-row>
  </v-container>
  <ThemeToggle />
</template>
<script setup>
onMounted(() => {
  document.title = 'Todo App'
})
</script>