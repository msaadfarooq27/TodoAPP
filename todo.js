let todos = []

const filters = {
    searchText: '',
    hideCompleted: false
}

getSavedTodos()

renderTodos(todos, filters)

document.querySelector('#hideCompleted').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked

    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', function(e){
    e.preventDefault()
    todos.push({
        id: uuid.v4(),
        text: e.target.elements.text.value,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.text.value = ''
})


document.querySelector('#search-todos').addEventListener('input',function(e){
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

