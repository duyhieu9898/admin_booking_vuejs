<template>
  <div class="page-container">
    <sidebar-container/>
    <!-- start page content -->
    <div class="page-content-wrapper">
      <transition name="fade-down" mode="out-in" appear>
          <router-view></router-view>
      </transition>
    </div>
    <!-- end page content -->
  </div>
</template>
<script>
import sidebarContainer from '@/components/commons/SidebarContainer'
export default {
  name: 'ContainerComponent',
  components: {
    sidebarContainer
  }
}
</script>
<style lang="css">
@import '../../assets/stylesheets/container.css';
</style>
