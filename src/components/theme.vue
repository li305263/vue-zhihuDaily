<template>
<div>
    <div class="banner_item">
        <div class="mask"></div>
        <img :src="background" alt="">
        <p>{{description}}</p>
    </div>
    <v-article v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100" :articleList="articleList" :editors="editors"></v-article>
</div>
</template>

<script>
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
import article from '@/components/article'
Vue.use(infiniteScroll)
export default {
  data () {
      return {
          articleList:[],
          background:'',
          description:'',
          editors:'',
          id:'',
          busy:true,
          hideBar:false,
      }
  },
  created(){
      let id = this.$route.params.id
      this.getThemeList(id)
  },
  components:{
    'v-article':article,
    },
  methods: {
    loadMore: function() {
        var that = this
        var lastId = that.articleList.slice(-1)[0].data.stories.slice(-1)[0].id
        that.busy=true
            this.axios.get('api/theme/'+that.id+'/before/'+lastId)
            .then(function(res){
                 
                that.articleList = that.articleList.concat(res)
                that.busy=false
            })
            .catch(function(err){
                console.log(err)
            })

    },
    getThemeList(id){
      var that = this
      that.id = id
      this.axios.get('api/theme/'+id)
      .then(function(res){
          var resData = res.data
            that.articleList = that.articleList.concat(res)
            that.background = resData.background
            that.description = resData.description
            that.editors = resData.editors
        that.busy=false
      })
      .catch(function(err){
          console.log(err)
      })
    }

  },
  watch:{
      '$route'(to,form){
          this.getThemeList(to.params.id)
      }
  }

}
    
</script>
