<template>
  <div class="todos-container" v-if="todos.length > 0">
    <h2>Todos</h2>
    <ul class="todos-header">
      <li>
        <span>#</span> <span>Edit</span> <span>Status</span> <span>Task</span>
        <span>Remove</span>
      </li>
    </ul>
    <hr />
    <ul class="todos">
      <TodoItem
        v-for="(todo, index) in todos"
        :key="todo.id"
        :id="todo.id"
        :text="todo.text"
        :completed="todo.completed"
        :index="index"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoItem from "./TodoItem.vue";

export default {
  name: "TodosList",
  components: { TodoItem },

  computed: {
    ...mapGetters(["todos"])
  }
};
</script>

<style scoped>
.todos-container ul.todos-header li {
  display: flex;
  justify-content: space-between;
}
.todos-container ul.todos-header li span:nth-child(2) {
  width: 80px;
}
.todos-container ul.todos-header li span:nth-child(4) {
  width: 200px;
}
.todos-container ul.todos {
  display: flex;
  flex-direction: column;
}
</style>
