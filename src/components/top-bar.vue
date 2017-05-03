<template>
    <div class="top_bar">
        <slot></slot>
    </div>
</template>
<script>

function scroll() {  
    var beforeScrollTop = document.body.scrollTop
    window.addEventListener("scroll", function() {  
        var afterScrollTop = document.body.scrollTop,  
            topBar = document.querySelector('.top_bar'),
            delta = afterScrollTop - beforeScrollTop;  
            beforeScrollTop = afterScrollTop
        if( delta > 0 )   {
            topBar.className = 'top_bar out'
        }else{
            topBar.className = 'top_bar'
        }
         
    }, false);  
}  
scroll();  
</script>
<style lang="">
.icon_box{display: flex;align-items: center;font-size: 12px;color: #fff;}
.top_bar{display: flex; position: fixed;top: 0;left: 0;right: 0;height: 40px;background: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0));z-index: 11;transition: top 300ms ease-in-out; }
.out{top:-40px;}
.icon{width: 40px;height: 40px;display: inline-block;font-size: 0;} 
</style>