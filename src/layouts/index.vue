<template>
  <div>1111</div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'

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
  }
}
</script>
