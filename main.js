// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'vue_todo_list'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index + 1
    })
    todoStorage.uid = todos.length + 1
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',

  data: {
    todos: []
  },

  created() {
    this.todos = todoStorage.fetch()
  },

  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  methods: {
    addTodo: function() {
      var body = this.$refs.body
      if (!body.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        body: body.value,
        date: Date.now(),
      })
      body.value = ''
    },
    deleteTodo: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },
    dateFormat: function (date) {
      return moment(date).format("YYYY/MM/DD HH:mm")
    }
  }
})
