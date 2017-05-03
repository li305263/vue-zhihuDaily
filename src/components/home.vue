<template>
<div>
    <v-banner :banner="bannerList"></v-banner>
    <v-article v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100" :articleList="articleList" ></v-article>
</div>
</template>

<script>
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
import banner from '@/components/banner'
import article from '@/components/article'
Vue.use(infiniteScroll)
export default {
  data () {
      return {
          bannerList:[],
          articleList:[],
          date:'',
          busy:true,
      }
  },
  created(){
      var that = this
      this.axios.get('api/news/latest')
      .then(function(res){
          var resData = res.data
          that.date=res.data.date
          that.articleList = that.articleList.concat(res)
          that.bannerList=resData.top_stories
        that.busy=false
      })
      .catch(function(err){
          console.log(err)
      })
  },
  components:{
    'v-banner':banner,
    'v-article':article,
    },
  methods: {
    loadMore: function() {
        var that = this
        var date = this.date
        that.busy=true
            this.axios.get('api/news/before/'+date)
            .then(function(res){
                 
                var resData = res.data
                that.date=res.data.date
             
                that.articleList = that.articleList.concat(res)
                
                that.busy=false
            })
            .catch(function(err){
                console.log(err)
            })

    },

  },

}
    
</script>