<template>
  <el-container class="mycontainer">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="logo" :class="{minilogo:isCollapse}"></div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
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
        <el-dropdown class="dropmenu">
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" alt="">
            <span class="name">张仁亮</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-tools">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-close">退出登录</el-dropdown-item>
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
export default {
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    roll () {
      this.isCollapse = !this.isCollapse
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
