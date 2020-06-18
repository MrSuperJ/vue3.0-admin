<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="@/assets/imgs/vue-antd-logo.png" />
          <span class="title">登录</span>
        </div>
        <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
      </div>
      <div class="login">
        <a-form @submit="onSubmit" :form="form">
          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="账户密码登录" key="1">
              <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
              <a-form-item>
                <a-input size="large" placeholder="admin" v-decorator="['name', {rules: [{ required: true, message: '请输入账户名'}]}]" >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item
              >
                <a-input size="large" placeholder="123456" type="password" v-decorator="['password', {rules: [{ required: true, message: '请输入密码'}]}]">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane tab="手机号登录" key="2">
              <a-form-item>
                <a-input size="large" placeholder="mobile number" >
                  <a-icon slot="prefix" type="mobile" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button style="width: 100%" class="captcha-button" size="large">获取验证码</a-button>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <div>
            <a-checkbox :checked="true" >自动登录</a-checkbox>
            <a style="float: right">忘记密码</a>
          </div>
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
          <div>
            其他登录方式
            <a-icon class="icon" type="alipay-circle" />
            <a-icon class="icon" type="taobao-circle" />
            <a-icon class="icon" type="weibo-circle" />
            <router-link style="float: right" to="/dashboard/workplace" >注册账户</router-link>
          </div>
        </a-form>
      </div>
    </div>
    <global-footer :link-list="linkList" :copyright="copyright" />
  </div>
</template>

<script>
import { setToken } from '@/utils/auth'

import GlobalFooter from '../../layouts/GlobalFooter'
import { toRefs, reactive } from '@vue/composition-api'
import { Form, Row, Col, Tabs, Checkbox, Input, Alert, Icon } from 'ant-design-vue'
import { login } from '@/api/index'

const components = {
  GlobalFooter
}
const { Item } = Form
components[Form.name] = Form
components[Item.name] = Item

components[Row.name] = Row
components[Col.name] = Col
const { TabPane } = Tabs
components[Tabs.name] = Tabs
components[TabPane.name] = TabPane
components[Checkbox.name] = Checkbox
components[Input.name] = Input
components[Alert.name] = Alert
components[Icon.name] = Icon

export default {
  setup (props, { root }) {
    const state = reactive({
      logging: false,
      error: '',
      form: root.$form.createForm(root),
      name: '',
      password: '',
      linkList: [
        { link: 'https://pro.ant.design', name: 'Pro首页' },
        { link: 'https://github.com/iczer/vue-antd-admin', icon: 'github' },
        { link: 'https://ant.design', name: 'Ant Design' }
      ],
      copyright: '2018 ICZER 工作室出品'
    })
    const onSubmit = (e) => {
      e.preventDefault()
      state.form.validateFields(async (err) => {
        if (!err) {
          state.logging = true
          try {
            const data = await login({
              loginType: 1,
              password: state.form.getFieldValue('password'),
              phoneNumber: state.form.getFieldValue('name'),
              rand: '',
              remember: true,
              systemToken: 'def6de56080b4056be7550b1d2c1b28a',
              ticket: ''
            })
            setToken(data.userToken)
            root.$router.push({
              name: 'Home'
            })
          } catch (error) {
          }
        }
      })
    }
    return {
      ...toRefs(state),
      onSubmit
    }
  },
  components: components
}
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .login{
        width: 368px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;

          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
</style>
