<template>
  <div class="todos-filters" v-if="todos.length > 0">
    <div>
      Active Todos: <span>{{ activeTodos.length }}</span>
    </div>
    <div>
      Completed Todos: <span>{{ completedTodos.length }}</span>
    </div>
    <button :disabled="completedTodos.length === 0" @click="clearCompleted">
      Clear Completed
    </button>
    <button :disabled="showFilters === 'all'" @click="changeFilter('all');">
      Show All
    </button>
    <button
      :disabled="activeTodos.length === 0 || showFilters === 'active'"
      @click="changeFilter('active');"
    >
      Show Active
    </button>
    <button
      :disabled="completedTodos.length === 0 || showFilters === 'completed'"
      @click="changeFilter('completed');"
    >
      Show Completed
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "TodoFilters",

  computed: {
    ...mapGetters(["todos", "showFilters"]),
    ...mapState({
      activeTodos: ({ todos }) => todos.filter(({ completed }) => !completed),
      completedTodos: ({ todos }) => todos.filter(({ completed }) => completed)
    })
  },

  methods: {
    ...mapActions(["clearCompleted", "changeFilter"])
  }
};
</script>
