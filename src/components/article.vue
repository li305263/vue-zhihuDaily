<template>
    <div class="article">
        <div v-if="editors" class="editors">
            <span>主编</span>
            <img v-for="item in editors" :src="item.avatar" alt="" class="avatar">
        </div>
        <div v-for="item in articleList" class="article_list">
            <h5 v-if="editors==undefined"  class="article_title">{{item.data.date | dateFilter}}</h5>
            <router-link v-for="items in item.data.stories" :key="items.id" class="article_list_item" :to="{name:'detail',params:{id:items.id}}">
                <p>{{items.title}}</p>
                <img v-if="items.images" :src="items.images" alt="">
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  props:['articleList','editors'],
  filters:{
    dateFilter (val){
         let date = new Date(),
             year = date.getFullYear().toString(),
             month = (date.getMonth()+1).toString() ,
             day = date.getDate().toString(),
             weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
             
        let beforY = val.slice(0,4),
            beforM = val.slice(4,6),
            beforD = val.slice(6,8),
            beforDate = new Date(beforY,beforM-1,beforD).getDay(),
            week = weekArray[beforDate],
            arr =  val.replace(/\d{4}/,'').split("")

             if(month<10){
                 month= "0"+month
             }

            let time = year+month+day
            if(time===val){
                return '今日热闻'
            }else{
                arr.splice(2,0,"月")
               return arr.join("")+' '+week
            }

    },
  }
}
    
</script>

<style lang="">
.icon_back{background: url(../../static/image/icon_back.png) no-repeat center;background-size: 24px 24px;}
.icon_comment{background: url(../../static/image/icon_comment.png) no-repeat center;background-size: 20px 20px;}
.icon_like{background: url(../../static/image/icon_like.png) no-repeat center;background-size: 22px 22px;}   
.article{padding: 10px;background: #eee;}
.article_title{color: #999;margin-bottom: 10px;}
.article_list .article_list_item{
    padding: 10px;margin-bottom: 10px;border-radius: 3px;background: #fff; border: 1px solid #eee;display: flex;box-shadow: 2px 2px 4px #ddd;color: #2c3e50;
}
.article_list img{
    width: 80px;height: 80px;
}
.article_list p{
    flex: 1;margin-right: 10px;
}
.editors{padding-bottom: 10px;}
.editors span{font-size:12px;}
.editors .avatar{width: 24px;height: 24px;border-radius: 50%;margin:0 10px ;}
</style>