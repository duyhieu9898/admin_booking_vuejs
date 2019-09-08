<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">Dashboard</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home"></i>&nbsp;
            <a class="parent-item" href="#">Home</a>&nbsp;
            <i class="fa fa-angle-right"></i>
          </li>
          <li class="active">Dashboard</li>
        </ol>
      </div>
    </div>
    <state-overview></state-overview>
    <chart-booking></chart-booking>
    <div class="row">
      <div class="col-lg-7">
        <div class="card-box">
          <div class="card-header">Todo List</div>
          <div class="card-body">
            <div class="row">
              <todo-list-component></todo-list-component>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card-box">
          <div class="card-header">Send Notification</div>
          <div class="card-body">
            <div class="row">
              <sent-notification></sent-notification>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
