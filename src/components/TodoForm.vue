<template>
  <div class="todo-form-container">
    <h2>Add Todo</h2>
    <input
      v-model.trim="todoText"
      type="text"
      placeholder="New Todo"
      @keyup.enter="addTodo"
      ref="todoInput"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TodoForm",
  data() {
    return {
      todoText: ""
    };
  },

  computed: {
    ...mapGetters(["editedTodo"])
  },

  watch: {
    editedTodo(todo) {
      this.todoText = todo ? todo.text : "";
      if (!todo) return this.blurInput();
      this.focusInput();
    }
  },

  methods: {
    addTodo() {
      if (!this.todoText) return;

      this.$store.commit("ADD_TODO", this.todoText);
      this.todoText = "";
    },
    focusInput() {
      this.$refs.todoInput.focus();
    },
    blurInput() {
      this.$refs.todoInput.blur();
    }
  },

  mounted() {
    this.focusInput();
  }
};
</script>
