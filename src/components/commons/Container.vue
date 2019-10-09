<template>
  <div class="page-container">
    <sidebar-container-component />
    <!-- start page content -->
    <div class="page-content-wrapper">
      <transition name="fade-down" mode="out-in" appear>
          <router-view></router-view>
      </transition>
    </div>
    <!-- end page content -->
  </div>
</template>
<style lang="css">
@import '../../assets/stylesheets/container.css';
</style>