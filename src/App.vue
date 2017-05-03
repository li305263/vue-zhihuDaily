<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>


<style  rel="stylesheet">
body{background: #f3f3f3;color: #2c3e50;}
.flex{display: flex}
.mask{position: absolute;height: 40%; left: 0;right: 0;bottom: 0; z-index: 10; background: linear-gradient(rgba(0, 0, 0,0.0),rgba(0, 0, 0,0.3))}
#app{max-width: 640px;margin: 0 auto;background: #fff;}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
