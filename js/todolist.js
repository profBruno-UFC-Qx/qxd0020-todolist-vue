function addTask(listDiv, tasks, task) {
    const taskDiv = createTaskElement(task.description)
    listDiv.appendChild(taskDiv)
    tasks.push(task)

}

function createTaskElement(texto) {

    const checkboxDiv = document.createElement('div')
    checkboxDiv.className = "form-check"

    const checkboxInput = document.createElement('input')
    checkboxInput.setAttribute('type', 'checkbox')
    checkboxInput.className = "form-check-input"

    checkboxInput.addEventListener('click', (event) => {
        const label = event.target.nextElementSibling
        label.classList.toggle('done')
    })


    const checkboxLabel = document.createElement('label')
    //checkboxLabel.setAttribute('for')
    checkboxLabel.className = "form-check-label"
    checkboxLabel.appendChild(document.createTextNode(texto))

    checkboxDiv.appendChild(checkboxInput)
    checkboxDiv.appendChild(checkboxLabel)


   /* const deleteButton = document.createElement('button')
    deleteButton.appendChild(document.createTextNode('deletar'))
    deleteButton.addEventListener('click', (event) => {
       checkboxDiv.remove()
    })

    checkboxDiv.appendChild(deleteButton)*/

    return checkboxDiv
}

function markTaskAsDone(task) {

}

function deleteTask() {
    
}

window.addEventListener('load', () => {

    const app = document.getElementById('app')
    const addButton = document.getElementById('addButton')
    const newTaskInput = document.getElementById('newTask')
    const todoList = document.getElementById('todolist')
    

    const tasks = []
    let currentId = 0

    addButton.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()

        const task =  {
            id: ++currentId,
            description: newTaskInput.value,
            done: false
        }

        addTask(todoList, tasks, task)
        newTaskInput.value = ""
        
    })

    /*
    const alert = document.createElement('div')
    alert.className ='alert alert-danger alert-dismissible fade show'    
    alert.appendChild(document.createTextNode("Testando"))
    
    const closeButton = document.createElement('button')
    closeButton.className = 'btn-close'
    closeButton.setAttribute('data-bs-dismiss', "alert")
    closeButton.setAttribute('arial-label', "Close")

    alert.appendChild(closeButton)

    app.appendChild(
        alert
    )
    */
})