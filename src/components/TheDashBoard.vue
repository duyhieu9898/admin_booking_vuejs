<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">Dashboard</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home" />&nbsp;
            <a class="parent-item" href="#">Home</a>&nbsp;
            <i class="fa fa-angle-right" />
          </li>
          <li class="active">Dashboard</li>
        </ol>
      </div>
    </div>
    <state-overview />
    <chart-booking />
    <div class="row">
      <div class="col-lg-7">
        <div class="card-box">
          <div class="card-header">Todo List</div>
          <div class="card-body">
            <div class="row">
              <todo-list />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card-box">
          <div class="card-header">Send Notification</div>
          <div class="card-body">
            <div class="row">
              <sent-notification />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stateOverview from '@/components/commons/StateOverview'
import chartBooking from '@/components/commons/ChartBooking'
import todoList from '@/components/commons/TodoList'
import sentNotification from '@/components/commons/SentNotification'

export default {
  components: {
    stateOverview,
    chartBooking,
    todoList,
    sentNotification
  }
}
</script>
