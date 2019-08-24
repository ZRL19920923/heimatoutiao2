<template>
    <div class="container">
        <el-card class="mycard">
          <img src="../../assets/images/logo_index.png" alt="">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
              <el-form-item prop="mobile">
                  <el-input v-model="loginForm.mobile" placeholder="请输入11位手机号码"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input v-model="loginForm.code" placeholder="请输入6位数验证码" style="width:220px;">
                  </el-input><el-button type="success">点击发送验证码</el-button>
              </el-form-item>
            <el-form-item>
              <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button @click="login()" type="primary" style="width:100%">登录</el-button>
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
  //  定义一个检测函数 验证手机号的正则
    // const checkMobile = (rule, value, callback) => {
    //   // 第一位是1 第二位是3到9 剩下的随机数字
    //   if (!/^1[3-9]\d{9}$/.text(value)) {
    //     return callback(new Error('手机号格式不对'))
    //   }
    //   callback()
    // }
    const checkMobile = (rule, value, callback) => {
      // 实现校验逻辑
      // 是否符合手机号格式: 第一位数1 第二位数3-9 其余随机数字
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单校验
      loginRules: {
        mobile: [
          // 简单配置规则 复杂配置需要用到组件自带的函数
          // required 不能为空  message 错误提示信息  trigger 触发方式
          { required: true, message: '请输入11位手机号', trigger: 'blur' },
          // 调用组件属性validator 调用上面自定义方法 验证手机号
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入6位数验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度6位', trigger: 'blur' }
        ]
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
    login () {
      // 登录时对表单数据进行校验 利用element组件自带的validate方法
      // 所以要找到相对应的组件实例 利用$refs方法找到element组件的实例 调用validate

      this.$refs.loginform.validate((valid) => {
        if (valid) {
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then((res) => {
              // 成功跳转 没有配置路由 前往router中配置该路由
              this.$router.push('/')
            })
            .catch(() => {
              // 失败提示信息
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
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
