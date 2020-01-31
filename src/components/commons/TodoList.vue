<template>
  <div class="col lg-12 todo_list">
    <!-- TODO LIST -->
    <div class="container bg-light">
      <!-- HEADER -->
      <div class="row header justify-content-center">
        <h1 class="header__content text-center text-danger">
          TODO LIST
          <span class="badge badge-dark">{{ numTask }}</span>
        </h1>
      </div>
      <!-- CONTENT -->
      <div class="row justify-content-center">
        <div class="task col-sm-11 col-10 p-3">
          <!-- Task input -->
          <div class="task__input input-group mb-3">
            <input
              id
              v-model="task"
              type="text"
              class="form-control"
              name
              :placeholder="placeholder.taskInput"
              @keyup.enter="createTask()"
            >
            <!-- Task button -->
            <div class="input-group-append">
              <button
                class="btn btn-dark"
                data-toggle="button"
                aria-pressed="true"
                type="button"
                @click="createTask()"
              >
                <span class="ion-plus-round" title="create" aria-hidden="true" />
              </button>
              <button class="btn btn-danger" type="button" @click="task=null">Clear</button>
            </div>
          </div>
          <!-- Task Todo -->
          <div class="task__list-todo mb-3">
            <h6>
              Task To-do
              <span class="badge badge-secondary">{{ task_todo }}</span>
            </h6>
            <div v-if="listTask.length" class="task__list-group">
              <ul v-for="(taskTodo, index) in listTask" :key="taskTodo._id" class="list-group">
                <li v-if="!taskTodo.complete" class="list-group-item">
                  <div class="row">
                    <!-- Task Todo content -->
                    <div class="task__content col-sm-9">
                      <div v-if="!taskTodo.isEdit" class="row">
                        <span class="align-middle col-sm-7">{{ taskTodo.content }}</span>
                        <span
                          class="col-sm-5 d-flex text-nowrap justify-content-end date"
                        >{{ formatTimeZone(taskTodo.created_at) }}</span>
                      </div>
                      <input
                        v-else
                        v-model="taskTodo.content"
                        type="text"
                        class="form-control"
                        @keyup.enter="updateTaskTodo(taskTodo)"
                      >
                    </div>

                    <!-- Task Todo content edit-->
                    <div
                      v-if="!taskTodo.isEdit"
                      class="task__action col-sm-3 btn-group justify-content-end"
                    >
                      <button
                        class="btn btn-outline-success"
                        type="button"
                        @click="updateTaskCompleted(taskTodo)"
                      >
                        <span
                          class="ion-checkmark-round"
                          title="tick completed"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        class="btn btn-outline-primary"
                        type="button"
                        @click="taskTodo.isEdit = true"
                      >
                        <span class="ion-edit" title="edit" aria-hidden="true" />
                      </button>
                      <button
                        class="btn btn-outline-danger"
                        type="button"
                        @click="deleteTaskTodo(taskTodo, index)"
                      >
                        <span class="ion-trash-b" title="trash" aria-hidden="true" />
                      </button>
                    </div>
                    <!-- Task Todo button-->
                    <div v-else class="task__action col-sm-3 btn-group justify-content-end">
                      <button
                        class="btn btn-dark"
                        type="button"
                        @click="updateTaskTodo(taskTodo)"
                      >
                        save
                      </button>
                      <button class="btn btn-danger" type="button" @click="getListTask()">cancel</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- Task completed -->
          <div class="task__list-completed">
            <h6>
              Completed Tag
              <span class="badge badge-success">{{ task_completed }}</span>
            </h6>
            <div v-if="listTask.length " class="task__list-group">
              <ul
                v-for="(taskCompleted, index) in listTask"
                :key="taskCompleted._id"
                class="list-group"
              >
                <li v-if="taskCompleted.complete" class="list-group-item">
                  <div class="row">
                    <!-- Task completed content-->
                    <div class="task__content col-sm-9">
                      <div class="row">
                        <span class="col-sm-7 align-middle">{{ taskCompleted.content }}</span>
                        <span
                          class="col-sm-5 d-flex text-nowrap justify-content-end date"
                        >{{ formatTimeZone(taskCompleted.updatedAt) }}</span>
                      </div>
                    </div>
                    <!-- Task completed button-->
                    <div class="task__action col-sm-3 btn-group justify-content-end">
                      <button
                        class="btn btn-outline-danger"
                        type="button"
                        @click="deleteTaskTodo(taskCompleted,index)"
                      >
                        <span class="oi oi-trash" title="trash" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import moment from 'moment-timezone'
import apiUrl from '../../constants/apiUrl'

export default {
  data () {
    return {
      task: null,
      placeholder: {
        taskInput: 'Add new task'
      },
      listTask: [],
      task_todo: 0,
      task_completed: 0,
      isShow: false
    }
  },
  computed: {
    numTask () {
      return this.listTask.length
    }
  },
  watch: {
    numTask () {
      // when numTask chane then handle count task_todo and task_complete
      let sum = 0
      for (const value of this.listTask) {
        if (value.complete === false) sum++
      }
      this.task_todo = sum
      this.task_completed = this.numTask - this.task_todo
    },
    task_todo: {
      // when task_todo chane then handle count task_complete
      handler: function () {
        this.task_completed = this.numTask - this.task_todo
      },
      deep: true
    },
    task_completed: {
      // when task_complete chane then handle count task_todo
      handler: function () {
        this.task_todo = this.numTask - this.task_completed
      },
      deep: true
    }
  },
  created () {
    this.getListTask()
  },
  methods: {
    async createTask () {
      if (this.checkRequiredContentTask && this.task !== null) {
        try {
          await this.axios.post(apiUrl.CREATE_TASK, { task: this.task })
          this.getListTask()
          this.task = null
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getListTask () {
      try {
        const { data } = await this.axios.get(apiUrl.GET_TASK)
        this.listTask = data
        this.listTask.forEach(taskTodo => {
          this.$set(taskTodo, 'isEdit', false)
        })
      } catch (error) {
        console.log(error)
      }
    },
    formatTimeZone (fulltime = null) {
      let result = ''
      if (fulltime) {
        var date = moment(fulltime)
        result = date.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
      } else {
        result = moment().format('YYYY-MM-DD HH:mm:ss')
      }
      return result
    },
    async updateTaskCompleted (taskTodo) {
      try {
        await this.axios.put(
          apiUrl.UPDATE_TASK_BY_ID.replace(':id', taskTodo._id),
          {
            complete: taskTodo.complete
          }
        )
        taskTodo.complete = true
        this.task_todo--
      } catch (error) {
        console.log(error)
      }
    },
    async updateTaskTodo (taskTodo) {
      try {
        await this.axios.put(
          apiUrl.UPDATE_TASK_BY_ID.replace(':id', taskTodo._id),
          {
            content: taskTodo.content
          }
        )
        taskTodo.isEdit = false
      } catch (error) {
        console.log(error)
      }
    },
    async deleteTaskTodo (taskTodo, index) {
      try {
        this.axios.delete(
          apiUrl.DETELE_TASK_BY_ID.replace(':id', taskTodo._id)
        )
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="css" >
.errorMessage {
  width: 200px;
  height: 30px;
  display: none;
  visibility: hidden;
  background: #343a40;
  color: white;
  position: absolute;
  bottom: 100%;
  margin-bottom: 10px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  opacity: 0.9;
  -ms-text-align-last: center;
  text-align-last: center;
}
.errorMessage span {
  vertical-align: middle;
}
.errorMessage::after {
  content: "";
  width: 13px;
  display: block;
  height: 13px;
  background: #343a40;
  margin-top: -3px;
  margin-left: 50%;
  transform: rotate(45deg) translate(-50%, +50%);
}
.errorMessage.show {
  display: block;
  visibility: visible;
}
</style>
