<!--======登陆模块=======-->
<template>
  <div class="login-container" style="background-image: url(../../images/login_background.png);">
    <el-form
      ref="loginForm2"
      :model="loginForm2"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">商家后台管理系统</h3>
      </div>

      <!-- ======================= 使用账号密码登入 =========================  -->
      <transition name="el-fade-in-linear">
        <div v-if="isShowUPLogin">
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="loginForm2.username"
              placeholder="请输入用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              v-model="loginForm2.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-form-item prop="code" style="position: relative;">
            <span class="svg-container">
              <svg-icon icon-class="code" style="font-size: 18px;" />
            </span>
            <el-input
              v-model="loginForm2.code"
              placeholder="请输入网页验证码"
              name="phone"
              type="text"
              tabindex="1"
              auto-complete="on"
              maxlength="4"
            />
            <el-button
              :loading="codeLoading"
              type="info"
              plain
              style="opacity: 0.5; position: absolute; top: 5px;right: 10px;;"
              @click="getCode"
            >{{ htmlCode }}
            </el-button>
          </el-form-item>
        </div>
      </transition>
      <!-- ======================= 使用账号密码登入(结束) =========================  -->

      <!-- ======================= 使用验证码登入 =========================  -->
      <div v-if="isShowCodeLogin">
        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="phone" style="font-size: 18px;" />
          </span>
          <el-input
            v-model="loginCodeForm.phone"
            placeholder="请输入你的手机号"
            name="phone"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="sendCode" style="position: relative;">
          <span class="svg-container">
            <svg-icon icon-class="code" style="font-size: 18px;" />
          </span>
          <el-input
            v-model="loginCodeForm.code"
            placeholder="请输入手机验证码"
            name="phone"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
          <el-button
            :loading="sendLoading"
            type="info"
            plain
            style="opacity: 0.5; position: absolute; top: 5px;right: 10px;;"
            @click="sendCode"
          >{{ sendCodeBtn }}
          </el-button>

        </el-form-item>
      </div>
      <!-- ======================= 使用验证码登入(结束) =========================  -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登入
      </el-button>
      <transition name="el-fade-in-linear">
        <div class="tips">
          <span v-if="isShowUPLogin">
            <el-link type="primary" @click="isUseCodeOrUpByState(false)">验证码登入</el-link>
          </span>
          <span v-if="isShowCodeLogin">
            <el-link type="primary" @click="isUseCodeOrUpByState(true)">账号登入</el-link>
          </span>
          <span style="margin-right:20px;">
            <el-link type="primary">忘记密码</el-link>
          </span>
        </div>
      </transition>
    </el-form>

    <div style="position: fixed; bottom: 0px;">
      <el-alert
        title="使用系统前提介绍"
        type="info"
        close-text="知道了,前往下载"
        description="为了提高用户体验,使用本系统请尽量使用谷歌浏览器(Chrome)"
        @close="gotoDownLoadChrome"
      />
    </div>
  </div>
</template>

<script>
import {
  validUsername
} from '@/utils/validate'
import {
  productAjaxPost,
  productAjaxGet
} from '@/api/table.js'
import { getToken, setToken, removeToken } from '@/api/cookieUtil'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6 || value.length > 11) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 20) {
        callback(new Error('密码在6-20位内'))
      } else {
        callback()
      }
    }
    return {
      // 网页验证码
      htmlCode: '',
      codeLoading: true,
      sendLoading: false,
      // 验证码倒计时定时器
      isSendInterVal: '',
      // 发送验证码倒数秒
      isSendLastInt: 60,
      // 是否可以发送验证码
      isSendFlagCode: true,
      // 发送验证码的按钮名字
      sendCodeBtn: '发送验证码',
      // 验证码登入Form
      loginCodeForm: {
        phone: '',
        code: ''
      },
      // 是否使用验证码登入
      isShowCodeLogin: false,
      // 是否使用用户名登入
      isShowUPLogin: true,
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginForm2: {
        username: '',
        password: '',
        code: ''
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    // 获取验证码
    getCode() {
      this.codeLoading = true
      this.$post('/member/code').then(res => {
        this.htmlCode = res
        this.codeLoading = false
      })
        .catch(err => {
          console.log(err)
          console.log('err')
        })
    },
    // 前往下载Chrome
    gotoDownLoadChrome() {
      window.open('https://www.google.cn/chrome/')
    },
    // 发送验证码
    sendCode() {
      if (this.isSendFlagCode) {
        this.sendLoading = true
        this.sendCodeBtn = ''
        this.isSendFlagCode = false
        this.$message({
          showClose: true,
          message: '发送成功,请查看手机短信。',
          type: 'success'
        })

        // 发送短信业务逻辑

        // 调用倒计时函数
        this.lastInt()
      }
    },
    // 验证码倒计时函数
    lastInt() {
      this.isSendInterVal = setInterval(() => {
        this.sendLoading = false
        this.isSendLastInt = this.isSendLastInt - 1
        this.sendCodeBtn = '剩余' + this.isSendLastInt + '秒'
        if (this.isSendLastInt <= 0) {
          clearInterval(this.isSendInterVal)
          this.isSendLastInt = 120
          // 打开重新发送的Flag
          this.isSendFlagCode = true
          this.sendCodeBtn = '发送验证码'
        }
      }, 1000)
    },
    // 使用验证码或账号登入
    // state == true 使用账号 state == false 使用验证码
    isUseCodeOrUpByState(state) {
      if (state) {
        this.isShowUPLogin = true
        this.isShowCodeLogin = false
      } else {
        this.isShowUPLogin = false
        this.isShowCodeLogin = true
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    // 登录
    handleLogin() {
      if (this.loginForm2.username.replace(/\s/g, '').length >= 20 || this.loginForm2.username.replace(/\s/g, '').length < 6) {
        this.$message({
          showClose: true,
          message: '密码长度在6-20位',
          type: 'warning'
        })
        return
      } else if (this.loginForm2.password.replace(/\s/g, '').length > 11 || this.loginForm2.password.replace(/\s/g, '').length < 6) {
        this.$message({
          showClose: true,
          message: '用户名长度在6-11位',
          type: 'warning'
        })
        return
      } else {
        this.loading = true
        this.$post('/member/login', {
          username: this.loginForm2.username,
          password: this.loginForm2.password,
          code: this.loginForm2.code
        }).then(res => {
          if (res.status == 200 || res.status == 201) {
            this.loading = true
            setToken(this.$store.state.app.sidebar.userCookieKey, res.data[0])
            setToken(this.$store.state.app.sidebar.userNameCookieKey, res.data[1])
            this.$store
              .dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({
                  path: this.redirect || '/'
                })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            this.loading = false
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            })
          }
        })
          .catch(err => {
            this.loading = false
            console.log(err)
            console.log('err')
          })
      }
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
