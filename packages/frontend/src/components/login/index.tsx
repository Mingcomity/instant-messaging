import { ReactElement, memo, useContext } from "react";
import { Button, Form, Input, Typography, message, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import type { FC } from "react";
import styles from './index.module.scss'
import { LoginApi, RegisterApi } from "@/service/indexApi";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import SocketContext from "@/context/socket-context";
const { Text } = Typography;

export interface IProps {
  children?: ReactElement
  // ...
}

const Login: FC<IProps> = memo(function (props) {
  const { children } = props
  const [messageApi, contextHolder] = message.useMessage();
  const [api, contextHolder2] = notification.useNotification()
  const router = useRouter()
  // 验证成功后的回调
  const useFinish = ({ username: name, password }: { username: string, password: string }) => {
    messageApi.open({
      type: 'loading',
      content: '登录中...',
      duration: 0,
    });
    const value = { name, password }
    RegisterApi(value).then(res => {
      return Promise.resolve(LoginApi(value))
    }).then((res) => {
      messageApi.destroy()
      if (res.data.code === 1002) {
        api.info({
          message: '请检查密码是否正确！'
        })
      } else {
        messageApi.destroy()
        messageApi.open({
          type: 'success',
          content: '登录成功！'
        });
        // 同时进行页面跳转
        router.replace('/home')
      }
    }).catch((err: Error) => {
        messageApi.destroy()
        notification.open({
        type: 'error',
        message: '请求发生错误！',
        description:
          err.message,
        })
    })
  };
  return (
    <div className="Login">
      {contextHolder}
      {contextHolder2}
      <Form
        name="normal_login"
        className={styles['login-form']}
        onFinish={useFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名！' },
            { pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, message: '以字母开头，长度在5~16之间。' }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码！' },
            { pattern: /^[a-zA-Z]\w{5,17}$/, message: '字母、数字和下划线，长度在6~18之间。' }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          {/* <Link href='' replace> */}
          <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
            Log in
          </Button>
          {/* </Link> */}
          <Text type="secondary" strong className={styles.hintText}>* 未注册用户将自动注册登录！</Text>
        </Form.Item>
      </Form>
    </div>
  )
})

export default Login;
Login.displayName = 'Login' // 方便以后调试用的
