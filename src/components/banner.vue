<template>
      <swiper  class="banner" :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide  v-for="item in banner" :key="item.id">
              <router-link tag="div" class="banner_item" :to="{name:'detail',params:{id:item.id}}">
                <div class="mask"></div>
                <img :src="item.image" alt="">
                <p>{{item.title}}</p>
              </router-link>
          </swiper-slide>
          <!-- Optional controls -->
          <div id="pagination" class="swiper-pagination"  slot="pagination"></div>
      </swiper>
</template>

<script>
import Vue from 'vue'
import swiper from 'vue-awesome-swiper'
Vue.use(swiper)
export default {
    name: 'carrousel',
    props:['banner'],
    data() {
      return {
        swiperOption: {
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 3000,
          loop:true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
            // console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        },

      }
    },
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //   console.log('this is current swiper instance object', this.swiper)
    }
  }
</script>

<style lang="css">
#pagination{width: auto;margin-left: 20px;}
#pagination .swiper-pagination-bullet{margin: 0 2px;}
#pagination .swiper-pagination-bullet-active{background: #fff}
.banner_item{position: relative;height: 0;padding-bottom: 60%;overflow: hidden}
.banner_item img{
    max-width: 100%;position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.banner_item p{position: absolute;width: 60%; bottom: 12.5%;left: 20px;color: #fff; z-index: 11}
</style>