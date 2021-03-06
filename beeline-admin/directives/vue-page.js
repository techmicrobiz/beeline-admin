import Vue from 'vue'
import Vuex from 'vuex'
import * as VueGoogleMaps from 'vue2-google-maps'
import AsyncComputed from 'vue-async-computed'
import assert from 'assert'

Vue.use(Vuex)
Vue.use(VueGoogleMaps)
Vue.use(AsyncComputed)

// PAGES
Vue.component('RoutesPage', require('../../beeline-admin/pages/routes.vue'))
Vue.component('RoutePassesPage', require('../../beeline-admin/pages/routePasses.vue'))
Vue.component('RoutePage', require('../../beeline-admin/pages/route.vue'))
Vue.component('PromotionPage', require('../../beeline-admin/pages/promotion.vue'))
Vue.component('PromotionsPage', require('../../beeline-admin/pages/promotions.vue'))
Vue.component('ExtendRoutesPage', require('../../beeline-admin/pages/extendRoutes.vue'))

// COMPONENTS
Vue.component('Dropdown', require('../../beeline-admin/components/Dropdown.vue'))
Vue.component('DatasheetCell', require('../../beeline-admin/components/DatasheetCell.vue'))
Vue.component('UibPagination', require('../../beeline-admin/components/UibPagination.vue'))
Vue.component('SortTh', require('../../beeline-admin/components/SortTh.vue'))
Vue.component('TagsView', require('../components/TagsView.vue'))
Vue.component('TagsEditor', require('../components/TagsEditor.vue'))
Vue.component('NumberArrayEditor', require('../components/NumberArrayEditor.vue'))
Vue.component('CompanySelector', require('../components/CompanySelector.vue'))
Vue.component('ExpandableArea', require('../../beeline-admin/components/ExpandableArea.vue'))
Vue.component('ModalHelper', require('../components/ModalHelper'))
Vue.component('PingPath', require('../components/PingPath.vue'))
Vue.component('TripStopMarker', require('../components/TripStopMarker.vue'))
Vue.component('LoadingSpinner', require('../../beeline-admin/components/LoadingSpinner.vue'))
Vue.component('DatePickerDropdown', require('../components/DatePickerDropdown.vue'))
Vue.component('MonthPickerDropdown', require('../components/MonthPickerDropdown.vue'))
Vue.component('MonthPicker', require('../components/MonthPicker.vue'))
Vue.component('PriceInput', require('../components/PriceInput.vue'))
Vue.component('TimeInput', require('../components/TimeInput.vue'))
Vue.component('StopSelector', require('../components/StopSelector.vue'))
Vue.component('Select2', require('../components/Select2.vue'))
Vue.component('SpanSelect', require('../components/SpanSelect.vue'))
Vue.component('UserIdSelector', require('../components/UserIdSelector.vue'))
Vue.component('RouteTagSelector', require('../components/RouteTagSelector.vue'))

Vue.component('Modal', require('../modals/MyModal.vue'))
Vue.component('Tabs', require('vue-strap/src/Tabs.vue'))
Vue.component('Tab', require('vue-strap/src/Tab.vue'))
Vue.component('VueSelect', require('vue-select').default)

angular.module('beeline-admin')
.directive('vuePage', function (vueStore, uiGmapGoogleMapApi) {

  uiGmapGoogleMapApi.then((googleMaps) => {
    window.vueGoogleMapsInit(googleMaps)
  })

  return {
    scope: {
      component: '@',
      props: '<',
    },
    link (scope, el, attributes) {
      assert(scope.component)

      const vm = new Vue({
        el: el[0],
        data: _.pick(scope, ['component', 'props']),
        store: vueStore,
        render(h) {
          return h(
            Vue.component(scope.component),
            { props: scope.props },
            []
          )
        }
      })

      scope.$on('$destroy', () => {
        vm.$destroy()
      })
    }
  }
})
