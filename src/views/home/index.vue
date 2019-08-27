<template>
  <el-container class="mycontainer">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="logo" :class="{minilogo:isCollapse}"></div>
      <el-menu
        default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-menu"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-menu"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-menu"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-menu"></i>
          <span slot="title">fans管理</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-menu"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-menu"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="roll()" class="el-icon-s-fold"></span>
        <span class="text">江苏传智管理有限公司</span>
        <el-dropdown class="dropmenu" @command='checkItem'>
          <span class="el-dropdown-link">
            <img :src="photo" alt="">
            <span class="name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-tools" command="setting">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-close" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Store from '@/store'
export default {
  props: {},
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  computed: {},
  created () {
    this.name = Store.getUser().name
    this.photo = Store.getUser().photo
  },
  mounted () {},
  watch: {},
  methods: {
    roll () {
      this.isCollapse = !this.isCollapse
    },
    checkItem (command) {
      this[command]()
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      this.$router.push('/lg')
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.mycontainer {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
    .logo {
      height: 60px;
      width: 100%;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .minilogo {
      background-image: url(../../assets/images/logo_admin_01.png) no-repeat
        center;
      background-size: 36px auto;
    }
    .el-menu-vertical-demo {
      border: none;
    }
  }
  .el-header {
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 20px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .dropmenu{
      float: right;
      img {
        height: 30px;
        width: 30px;
        vertical-align: middle;
      }
      .name{
        vertical-align: middle;
        font-weight: bold;
      }
    }
  }
}
</style>
