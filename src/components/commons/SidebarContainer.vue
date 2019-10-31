<template>
    <div class="sidebar-container">
      <div class="sidemenu-container navbar-collapse collapse fixed-menu">
        <div id="remove-scroll">
          <ul
            class="sidemenu page-header-fixed p-t-20"
            data-keep-expanded="false"
            data-auto-scroll="true"
            data-slide-speed="200"
          >
            <li class="sidebar-toggler-wrapper hide">
              <div class="sidebar-toggler">
                <span></span>
              </div>
            </li>
            <li class="sidebar-user-panel">
              <div class="user-panel">
                <div class="row">
                  <div class="sidebar-userpic">
                    <img src="/static/img/dp.jpg" class="img-responsive" alt="avater user" />
                  </div>
                </div>
                <div class="profile-usertitle">
                  <div class="sidebar-userpic-name">{{ currentUser.name }}</div>
                  <div class="profile-usertitle-job">Manager</div>
                </div>
              </div>
            </li>
            <li class="menu-heading">
              <span>-- Main</span>
            </li>
            <li class="nav-item start js-route-link">
              <router-link :to="{ name: 'dash-board'}" class="nav-link nav-toggle">
                <span class="title">Dashboard</span>
                <span class="selected"></span>
              </router-link>
            </li>
            <li class="nav-item js-route-link">
              <router-link :to="{ name: 'list-category'}">
                <i class="material-icons">widgets</i>
                <span class="title">Category</span>
                <span class="selected"></span>
              </router-link>
            </li>
            <li class="nav-item js-route-link">
              <router-link :to="{ name: 'list-booking'}">
                <i class="material-icons">business_center</i>
                <span class="title">Booking</span>
                <span class="selected"></span>
              </router-link>
            </li>
            <li class="nav-item js-route-link">
              <router-link :to="{ name: 'list-room'}" class="nav-link nav-toggle">
                <i class="material-icons">vpn_key</i>
                <span class="title">Rooms</span>
                <span class="selected"></span>
              </router-link>
            </li>
            <li class="nav-item js-route-link">
              <router-link :to="{ name: 'list-user'}">
                <i class="material-icons">group</i>
                <span class="title">User</span>
                <span class="selected"></span>
              </router-link>
            </li>
            <li class="nav-item js-route-link">
                <router-link :to="{ name: 'list-convenient'}">
                <i class="material-icons">store</i>
                <span class="title">Conveniences</span>
                <span class="selected"></span>
              </router-link>
            </li>
            <li class="nav-item js-route-link">
                <router-link :to="{ name: 'basic-information'}">
                <i class="material-icons">store</i>
                <span class="title">Basic infomation</span>
                <span class="selected"></span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBarContainer',
  computed: {
    ...mapGetters([
      'currentUser'
      ])
  },
  mounted() {
    $(".js-route-link").click(function(e) {
      $(".js-route-link").removeClass("active");
      e.currentTarget.classList.add("active");
    });
  },
};
</script>
