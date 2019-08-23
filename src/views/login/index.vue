<template>
    <div class="container">
        <el-card class="mycard">
          <img src="../../assets/images/logo_index.png" alt="">
          <el-form ref="form" :model="loginform">
              <el-form-item>
                  <el-input v-model="loginform.mobile" placeholder="请输入11位手机号码"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-input v-model="loginform.code" placeholder="请输入6位数验证码" style="width:220px;">
                  </el-input><el-button type="success">点击发送验证码</el-button>
              </el-form-item>
            <el-form-item>
              <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%">登录</el-button>
            </el-form-item>
          </el-form>

        </el-card>
    </div>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {
      loginform: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    width: 100%;
    position: absolute;
    left:0;
    top:0;
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
    .mycard {
      width: 400px;
      height: 350px;
      // background-color: hotpink;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      img {

      }

    }
  }
</style>
