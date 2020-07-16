<template>
    <div id="leo">
        {{msg}}
        <router-link to="/ricwn">日程</router-link>
        <router-link to="/daiban">待办</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'leo',
    data(){
        return{
            msg:'啊'
        }
    }
    
}
</script>

<style lang="stylus" scoped>

</style>
