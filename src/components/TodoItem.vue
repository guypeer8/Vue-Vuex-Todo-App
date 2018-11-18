<template>
  <li v-show="show">
    <span>{{ index + 1 }}.</span>
    <span @click="toggleEdit(id);">
      <font-awesome-icon icon="ban" v-if="isEditing()" />
      <font-awesome-icon icon="edit" v-else />
    </span>
    <input type="checkbox" v-model="completed" />
    <span
      :style="{
        'text-decoration': completed ? 'line-through' : 'none'
      }"
      >{{ text }}</span
    >
    <button @click="deleteTodo(id);">x</button>
  </li>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TodoItem",
  props: ["id", "index", "text", "completed"],

  computed: {
    ...mapGetters(["todos", "showFilters", "editedTodo"]),

    show() {
      return this.showFilters === "all"
        ? true
        : this.showFilters === "active"
        ? !this.completed
        : this.completed;
    }
  },

  methods: {
    isEditing() {
      return this.editedTodo && this.editedTodo.id === this.id;
    },
    ...mapActions(["toggleEdit", "deleteTodo"])
  },

  watch: {
    completed(isCompleted) {
      this.$store.commit("COMPLETE_TODO", this);
    }
  }
};
</script>

<style scoped>
.todos-container ul.todos li {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.todos-container ul.todos li span:nth-child(2) {
  width: 40px;
}
.todos-container ul.todos li span:nth-child(4) {
  width: 200px;
}
</style>
