<template>
<div>
    <v-top-bar ><i @click="onSide" class="icon icon_menu"></i></v-top-bar>
    <v-side-bar :hideBar="hideBar" @close="onSide"></v-side-bar>
    <router-view></router-view>
</div>
</template>

<script>
import topBar from '@/components/top-bar'
import sideBar from '@/components/side-bar'
export default {
  data () {
      return {
          hideBar:false,
      }
  },
  components:{
    'v-top-bar':topBar,
    'v-side-bar':sideBar,
    },
  methods: {
    onSide () {
        var select = this.hideBar
        this.hideBar=!select
        this.hideBar?document.body.className="no_scroll":document.body.className=""
    }

  }

}
    
</script>

<style lang="">
.no_scroll{position: fixed;width: 100%;}
.icon_menu{background: url(../../static/image/icon_menu.png) no-repeat center;background-size: 24px 24px;}
</style>