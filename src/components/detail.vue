<template>
<div>
    <v-top-bar>
      <i class="icon icon_back" @click="onComeIndex" ></i>
      <router-link class="icon_box" :to="{name:'comment',params:{comment:detail.id}}">
        <i class="icon icon_comment"></i><span>{{commentNum}}</span>
      </router-link>
      <div class="icon_box">
        <i class="icon icon_like"></i><span>{{likeNum}}</span>
      </div>
    </v-top-bar>
    <div v-if="detail.image" class="detail_top_box">
        <div class="detail_top">
            <div class="mask"></div>
            <img :src="detail.image" alt="">
            <p class="titele">{{detail.title}}</p>
            <p class="img_form">{{detail.image_source}}</p>
        </div>
    </div>
    <div class="detail_cont" v-html="detail.body"></div>
</div>
</template>

<script>
import topBar from '@/components/top-bar'
export default {
    components:{
        'v-top-bar':topBar
    },
    data(){
        return {
            detail:'',
            commentNum:'',
            likeNum:''
        }
    },
    created(){
        var that = this
        var id = this.$route.params.id
        this.axios('api/news/'+id)
        .then(function(res){
            that.detail=res.data
        })
        this.axios('api/story-extra/'+id)
        .then(function(res){
            that.commentNum=res.data.comments
            that.likeNum=res.data.popularity
        })

    },
    watch:{
        '$route'(to,from){
            console.log(to,from)
        }
    },
    methods:{
      onComeIndex(){
        window.history.go(-1)
      }
    },
}  
</script>

<style lang="">
img{max-width: 100%;}
h1{font-size: 24px}h2{font-size: 20px;}
.icon-arrow-right{width: 24px;height: 24px;background: url(../../static/image/icon_arrow_right.png);background-size: 100% 100%;position: absolute;right: 0;top: 50%;transform: translateY(-50%)}
.detail_top_box{height: 0;padding-bottom: 60%}
.detail_top{position: fixed;top: 0; width: 100%; height: 0;padding-bottom: 60%;overflow: hidden;}
.detail_top img{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.detail_top .titele{position: absolute;bottom: 24px;left: 20px;color: #fff;z-index: 10;margin-right: 20px;}
.detail_top .img_form{position: absolute;bottom: 4px;right: 10px;color: #ddd;font-size: 12px;}
.detail_cont{z-index: 10;position: relative;background: #fff;}
.headline-background a{display: block; color: #333;position: relative;}
.heading-content{width: 90%;}
.content-wrap{padding: 20px;}
.question-title{font-size: 20px;font-weight: 700;}
.meta{margin: 15px 0;font-size: 14px;}
.meta .avatar{width: 30px;height: 30px; border-radius: 4px;}
.meta .author{margin: 0 6px}
.meta .bio{color: #999;}
.content p {margin-bottom: 20px;}
.content p img{display: block; margin: 0 auto}
.view-more{text-align: center;background: #ddd;padding: 4px 0;border-radius: 3px;}
.view-more a{color: #333;font-size: 12px;line-height: 24px;}
</style>