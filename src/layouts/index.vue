<template>
  <div>
    layouts
    <!-- header -->
    <aside>
        <side-menu></side-menu>
    </aside>
    <!-- main -->
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import SideMenu from './sideMenu/index'

export default {
  setup (props, { root }) {
    console.log(props, root)
    const state = reactive({
      name: 'admin',
      password: '123456'
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    SideMenu
  }
}
</script>
