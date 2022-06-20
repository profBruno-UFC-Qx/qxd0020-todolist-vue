const { createApp } = Vue

const root =  {
    data() {
      return {
        tasks: []
      }
    },
    computed: {
         numberOfTasks() {
             return this.tasks.length
         },
         numberOfTasksDone() {
            return this.tasks.filter( task => task.done ).length
         },
         percentageDone() {
            if (this.numberOfTasks) {
                return (this.numberOfTasksDone / this.numberOfTasks) * 100
            }
            return 0 
         }
    },
    methods: {
        addTask(description) {
            const nextId = this.tasks.length === 0 ? 0 : this.tasks[this.tasks.length - 1].id + 1
            this.tasks.push({
                id: nextId,
                description: description,
                done: false
            })
        },
        removeTask(pos) {
            this.tasks.splice(pos, 1)
        }

    },
  }

const taskForm = {
    data() {
        return { newTask: ''}
    },
    emit: ['add'],
    computed: {
        isEmpty() {
            return this.newTask.length === 0
        }
    },
    methods: {
        add() {
            this.$emit('add', this.newTask)
            this.newTask = ""
        }
    },
    template: `
    <form class="row g-3">
        <div class="col">
            <label for="newTask" class="visually-hidden">Awesome TodoList</label>
            <input type="text" class="form-control" id="newTask" placeholder="O que você precisa hoje?" v-model="newTask">
        </div>
        <div class="col-auto">
            <input type="button" id="addButton" class="btn btn-primary" :class="{ disabled: isEmpty }" value="Add" @click="add">
        </div>
    </form>
    `
  }

const taskItem = {
    props: {
        id: Number,
        description: String,
        done: Boolean
    },
    emit: ['remove', 'update:done'],
    computed : {
        modelDone: {
            get() {
                return this.done
            },
            set(value) {
                this.$emit('update:done', value);
            }
        }
    },
    template: `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="modelDone">
            <label class="form-check-label" for="flexCheckDefault" :class="{ done: done}">
            {{ description }}
            </label>
            <button type="button" class="btn btn-sm float-end" @click="this.$emit('remove', id)"><i class="bi bi-x-lg"></i></button>
        </div>
    `
  }

  const progressBar = {
      props: {
          percentagedone: Number
      },
      template: `
      <div id="progress" class="progress mt-1 ">
        <div class="progress-bar" role="progressbar" :style="{ width: percentagedone + '%'}" :aria-valuenow="percentagedone" aria-valuemin="0" aria-valuemax="100">{{ percentagedone }}%</div>
      </div>
      `

  }
  
  const app = createApp(root)
  app.component('task-form', taskForm)
  app.component('task-item', taskItem)
  app.component('progress-bar', progressBar)
  app.mount('#app')