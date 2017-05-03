<template>
<div>
    <v-top-bar>
        <i class="icon icon_back" @click="onComeBack" ></i>
    </v-top-bar>

    <div class="long_comments" :style="{minHeight:longHeight+'px'}">
        <div class="comments_title">{{longNum}} 条长评论</div>
        <div v-if="longNum" class="comments_list flex" v-for="(item,index) in comments.long">
            <img :src="item.avatar" alt="">
            <div>          
                <p class="author">
                    {{item.author}}
                    <span class="like fr"><i class="icon_small_like"></i>{{item.likes}}</span>
                </p>
                <p class="content">{{item.content}}</p>
                <p v-if="item.reply_to" class="reply" :data="index">//{{item.reply_to.author}}:<span class="c6">{{item.reply_to.content}}</span></p>
                <div class="time">{{item.time | getTime}}
                </div>
            </div>
        </div>
        <div v-if="longNum==0" class="empty_long posCenter">
            <img src="../../static/image/empty.png" alt="">
            <p class="mt20 f12">深度长评虚位以待</p>
        </div>
    </div>
    <div  class="short_comments" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
        <div class="comments_title"  @click.once="getShortComment" @click="toggleScroll">{{commentNum-longNum}} 条短评论<i  class="fr" :class="shortOff?'icon_arrow_down':'icon_arrow_up'"></i></div>
        <div v-if="shortOff==false" class="comments_list flex" v-for="(item,index) in comments.short">
            <img :src="item.avatar" alt="">
            <div class="item">          
                <p class="author">
                    {{item.author}}
                    <span class="like fr"><i class="icon_small_like"></i>{{item.likes}}</span>
                </p>
                <p class="content">{{item.content}}</p>
                <p v-if="item.reply_to" class="reply c0" :data="index">//{{item.reply_to.author}}:<span class="c6">{{item.reply_to.content}}</span></p>
                <div class="time">{{item.time | getTime}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
import topBar from '@/components/top-bar'
Vue.use(infiniteScroll)
     export default {
        components:{
            'v-top-bar':topBar
        },
        created(){
            let that = this;
            let wHeight = window.screen.height
            this.longHeight = wHeight-50
             this.id = this.$route.params.id
             this.commentNum = this.$route.params.commentNum
  
            this.axios.all([this.getLongComment(),this.getCommentNum()])
            .then(function(acct,perms){
                let resLong = acct[0].data.comments
                that.comments.long = resLong
                that.longNum = resLong.length
                that.commentNum=acct[1].data.comments
            })
           
         },
        data(){
            return {
                id:'',
                commentNum:0,
                longHeight:0,
                longNum:0,
                shortOff:true,
                busy:true,
                comments:{
                    long:[],
                    short:[]
                },
            }
        },
        methods:{
            onComeBack () {
                window.history.go(-1)
            },
            getLongComment() {
                return this.axios('api/story/'+this.id+'/long-comments')
            },
            getCommentNum() {
                return this.axios('api/story-extra/'+this.id)
            },
            getShortComment(){
                let that = this;
                
                this.axios.get('api/story/'+this.id+'/short-comments')
                    .then(function(res){
                    
                        that.comments.short = res.data.comments
                        
                        that.busy=false
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                    
            },
            toggleScroll(){
                let toggle = this.shortOff,
                    longComments = document.querySelector(".long_comments"),
                    time,bottom,
                    longCommentsH =bottom= getComputedStyle(longComments,null).height.replace("px","")
                this.shortOff =!toggle
                if(toggle){
                    time = setInterval(function () {
                        longCommentsH = longCommentsH/2
                        if(longCommentsH<1){
                            clearInterval(time)
                        }else{
                        document.body.scrollTop = bottom - longCommentsH
                        }
                    },100)
                }else{
                    time = setInterval(function () {
                        longCommentsH = longCommentsH/2
                        if(longCommentsH<1){
                            clearInterval(time)
                        }else{
                            document.body.scrollTop = longCommentsH
                        }
                    },100)
                }
            },
            loadMore: function() {
                var that = this,
                    lastId = that.comments.short.slice(-1)[0].id
                that.busy=true
                    this.axios.get('api/story/'+that.id+'/short-comments/before/'+lastId)
                    .then(function(res){
                        
                        var resData = res.data.comments
                            for(let i=0;i<resData.length;i++){

                                that.comments.short.push(resData[i])
                            }
                       
                        that.busy=false
                        if(resData.length==0)that.busy=true
                    })
                    .catch(function(err){
                        console.log(err)
                    })

            },
        },
        filters:{
            getTime(time){
                let date = new Date(parseInt(time)*1000),
                    month = date.getMonth()+1,
                    day = date.getDate(),
                    hours = date.getHours(),
                    min = date.getMinutes()
                return month+'月'+day+'日 '+hours+':'+min
            }
        },
    }   
</script>

<style>
.tag{padding: 2px 8px;background: #DEF0FF;color: #666;}
.long_ellipsis{ display: -webkit-box;-webkit-line-clamp: 2;text-overflow: ellipsis;-webkit-box-orient: vertical;overflow: hidden;}
.icon_small_like,.icon_arrow_down,.icon_arrow_up{display: inline-block;width: 16px;height: 16px;}
.icon_small_like{background: url(../../static/image/icon_small_like.png);background-size: 100% 100%;margin-right: 4px;}
.icon_arrow_down,.icon_arrow_up{background: url(../../static/image/icon_arrow_down.png);background-size: 100% 100%;margin-right: 4px;}
.icon_arrow_up{transform: rotate(180deg)}
.comments_title{font-size: 12px;padding: 15px;border-bottom: 1px solid #ddd;} 
.comments_list{padding: 15px;border-bottom: 1px solid #ddd;font-size: 14px}
.long_comments {position: relative;}
.long_comments .comments_list:last-child{border: none;}
.short_comments .comments_title{border-top: 1px solid #ddd}
.comments_list .item{flex: 1;}
.comments_list .like{color: #bfbfbf;font-weight: 400;}
.comments_list img{width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;}
.comments_list .author{color: #333;font-weight: 700;margin-bottom: 10px;}
.comments_list .time{color: #999;font-size: 12px;margin-top: 20px;}
.empty_long{text-align: center; color: #8f8f8f;}
.posCenter{position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)}
</style>