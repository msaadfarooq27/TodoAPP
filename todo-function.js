// get Saved todos

const getSavedTodos = function(){
    const todoJSON = localStorage.getItem('todos')

    if(todoJSON !== null){
        todos = JSON.parse(todoJSON)
    }else{
        return []
    }
}

// save todos to local storage

const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}

// remove Todo

const removeTodo = function(id){
    const findTodo = todos.findIndex(function(todo){
        return todo.id === id
    })

    if(findTodo > -1){
        todos.splice(findTodo, 1)
    }
}

// changing state

// const changeState = function(todo){
//     const findState = todos.findIndex(function(todo){
//         return todo.id === id
//     })

//     if(findState > -1){
//         console.log(id)
//         console.log('clicked')
//     }
// }

// rendering Todos

const renderTodos = function(todos, filters){
    let filteredTodos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter(function(todo){
        return !filters.hideCompleted || !todo.completed
    })

    const incompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    
    document.querySelector('#todos').appendChild(generateSummary(incompleteTodos))
    filteredTodos.forEach(function(todo){
        document.querySelector('#todos').appendChild(generateTodos(todo))
    })
}

// Generate Summary DOM

const generateSummary = function(incompleteTodos){
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}

// Generate Todos DOM

const generateTodos = function(todo){
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todotext = document.createElement('span')
    const removeButton = document.createElement('button')


    checkbox.setAttribute('type', 'checkbox')
    // checkbox.addEventListener('change',function(){
    //     changeState(todo)
    //     saveTodos(todos)
    //     renderTodos(todos, filters)
    // })
    console.log()
    todoEl.appendChild(checkbox)
    todotext.textContent = todo.text

    todoEl.appendChild(todotext)

    removeButton.setAttribute('style', 'margin-left:10px;background:red')

    removeButton.textContent = 'x'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    todoEl.appendChild(removeButton)
    return todoEl
}