<template >
  <div class="page-header navbar navbar-fixed-top">
      <div class="page-header-inner">
        <!-- logo start -->
        <div class="page-logo">
          <a href="#">
            <span class="logo-default">HOMO SAPIENS</span>
          </a>
        </div>
        <!-- logo end -->
        <ul class="nav navbar-nav navbar-left in">
          <li>
            <a href="#" class="menu-toggler sidebar-toggler">
              <i class="icon-menu"></i>
            </a>
          </li>
        </ul>
        <!-- start mobile menu -->
        <a
          href="javascript:;"
          class="menu-toggler responsive-toggler"
          data-toggle="collapse"
          data-target=".navbar-collapse"
        >
          <span></span>
        </a>
        <!-- end mobile menu -->
        <!-- start header menu -->
        <div class="top-menu">
          <ul class="nav navbar-nav pull-right">
            <notification />
            <!-- start manage user dropdown -->
            <li class="dropdown dropdown-user">
              <a
                href="javascript:;"
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
                data-close-others="true"
              >
                <img alt="avatar user" class="img-circle" src="/static/img/dp.jpg" />
                <span class="username username-hide-on-mobile">{{ currentUser.name }}</span>
                <i class="fa fa-angle-down"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-default animated jello">
                <li>
                  <a href="/profile">
                    <i class="icon-user"></i> Profile
                  </a>
                </li>
                <li>
                  <a href="/admin/login">
                    <i class="icon-logout"></i> Log Out
                  </a>
                </li>
              </ul>
            </li>
            <li class="dropdown dropdown-quick-sidebar-toggler">
              <a id="headerSettingButton" class="mdl-button mdl-js-button mdl-button--icon pull-right" data-upgraded=",MaterialButton">
                <i class="material-icons">settings</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import notification from '@/components/commons/Notification'
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderComponent',
  components: {
    notification
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  }
};
</script>
