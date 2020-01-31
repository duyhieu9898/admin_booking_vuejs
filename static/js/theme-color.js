/* global jQuery */
jQuery(document).ready(function () {
  jQuery(document).on('click', '.theme-light-dark button', function () {
    const logoColor = 'logo-' + jQuery(this).attr('data-theme')
    const sidebarColor = jQuery(this).attr('data-theme') + '-sidebar-color'
    jQuery('body').removeClass('white-sidebar-color dark-sidebar-color blue-sidebar-color indigo-sidebar-color green-sidebar-color red-sidebar-color cyan-sidebar-color logo-white logo-dark logo-blue logo-indigo logo-red logo-cyan logo-green')
    jQuery('body').addClass(sidebarColor)
    jQuery('body').addClass(logoColor)
  })
  jQuery(document).on('click', '.sidebar-theme a', function () {
    const sidebarColor = jQuery(this).attr('data-theme') + '-sidebar-color'
    jQuery('body').removeClass('white-sidebar-color dark-sidebar-color blue-sidebar-color indigo-sidebar-color green-sidebar-color red-sidebar-color cyan-sidebar-color')
    jQuery('body').addClass(sidebarColor)
  })
  jQuery(document).on('click', '.logo-theme a', function () {
    const logoColor = jQuery(this).attr('data-theme')
    jQuery('body').removeClass('logo-white logo-dark logo-blue logo-indigo logo-red logo-cyan logo-green')
    jQuery('body').addClass(logoColor)
  })
  jQuery(document).on('click', '.header-theme a', function () {
    const headerColor = jQuery(this).attr('data-theme')
    jQuery('body').removeClass('header-white header-dark header-blue header-indigo header-red header-cyan header-green')
    jQuery('body').addClass(headerColor)
  })
})
