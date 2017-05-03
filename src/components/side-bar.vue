<template>
    <div  :class="hideBar?'side_bar':''" @click="close">
        <div class="side_scroll" :class="hideBar?'side_scroll_on':''">
            <div class="side_bar_top">
                <iframe src="https://ghbtns.com/github-btn.html?user=li305263&repo=vue-zhihuDaily&type=star&count=true" frameborder="0" scrolling="0" width="110px" height="20px"></iframe>
                <img src="../../static/image/head_img.jpg" width="50" height="50" alt="">
                <p>无颜君</p>
            </div>
            <ul class="side_list">
                <router-link tag="li" to="/"  class="item"><i class="icon_home"></i>首页</router-link>
                <router-link tag="li" :to="{name:'theme',params:{id:item.id}}"  class="item"  v-for="item in others" :key="item.id">
                            {{item.name}}
                            <i class="icon_arrow_right fr"></i>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:['hideBar'],
    created(){
        var that = this;
        this.axios('api/themes')
        .then(function(res){
            that.others = res.data.others
        })
        .catch(function(){

        })
    },
    data(){
        return{
            others:[],
        }
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style lang="">
.icon_home{width: 24px;height: 24px;display: inline-block;vertical-align: top;margin-right: 8px; background: url(../../static/image/icon_home.png) no-repeat center;background-size: 24px 24px;}
.side_bar{position: fixed;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0, 0, 0, 0.8);z-index: 98;}
.side_scroll{position: absolute;top: 0;bottom: 0;left: -60%;width: 60%;overflow-y: scroll;background: #fff; transition:left 300ms ease-in-out;z-index: 99;}
.side_bar_top{padding: 15px;background: #23B5EC;display: flex;align-items: center}
.side_bar_top img{border-radius: 50%;margin-right: 8px;}
.side_bar_top p{flex: 1; color: #fff;font-size: 14px;}
.side_position{padding: 10px 15px;}
.side_list .item{padding: 15px;}
.side_list .item a{color:#2c3e50;}
.side_list .item.active{background: #eee;}
.side_list .item.active a{color: #23B5EC;}
.icon_arrow_right{display: block; width: 22px;height: 22px;background: url(../../static/image/icon_arrow_right.png);background-size: 100% 100%;}
.side_scroll_on{left: 0;}
</style>