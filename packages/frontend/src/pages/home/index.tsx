import {ReactElement, memo, useRef, useState, useEffect} from 'react'
import {UserOutlined} from '@ant-design/icons'
import React from 'react'
import type {FC} from 'react'
import {Layout, Avatar, Input, Badge, Modal, InputRef, message} from 'antd'
import styles from './index.module.scss'
import classNames from 'classnames'
import UserBar from '@/components/userBar'
import FriendItem from '@/components/friendItem'
import MessageBox from '@/components/messageBox'
import {LocationX} from '@/components/messageBox'
import UserInfo from '@/components/userInfo'
import {GetServerSideProps} from 'next'
import wrapper, {IAppDispatch, IAppRootState} from '@/store'
import {fetchMessageList, fetchFriendList, fetchUserInfo} from '@/store/feature/home'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessageApi, updateAtavarApi} from '@/service/homeApi'

const {Header, Content, Footer, Sider} = Layout
const {Search} = Input

export interface IProps {
  children?: ReactElement
  // ...
}

const Home: FC<IProps> = memo(function (props) {
  const {children} = props

  // 获取Redux中的数据
  const {userInfo, friendList, messageList} = useSelector((rootState: IAppRootState) => {
    return {
      userInfo: rootState.home.userInfo,
      friendList: rootState.home.friendList,
      messageList: rootState.home.messageList
    }
  })
  const dispatch: IAppDispatch = useDispatch()

  // 维护对方是否正在输入
  const [isInput, setIsInput] = useState(false)

  // 维护当前聊天用户
  const [isActiveId, setIsActiveId] = useState(friendList[0].id)
  const friendActive = async (id: number) => {
    setIsActiveId(id)
    messageApi.open({
      type: 'loading',
      content: '正在加载中...',
      duration: 0,
    });
    const receiver = friendList.find(val=>val.id === id)!.name
    await dispatch(
        fetchMessageList({
          receiver
        } as { session: string, receiver: string })
    )
    messageApi.destroy()
  }

  // 更新头像
  const [messageApi, contextHolder] = message.useMessage();
  const [QQNumber,setQQNumber] = useState('')
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const  changeQQNumber = (e:any) => {
    setQQNumber(e.target.value)
  }
  const showModal = () => {
    setOpen(true)
  }
  const handleCancel = () => {
    setOpen(false)
  }
  const handleOk = async () => {
    try {
      const regexp = /[1-9][0-9]{4,}/
      const qqNumber = QQNumber
      if (regexp.test(qqNumber)) {
        const avatar = `https://q2.qlogo.cn/headimg_dl?dst_uin=${qqNumber}&spec=100`
        setConfirmLoading(true)
        await updateAtavarApi({avatar})
        await dispatch(fetchUserInfo())
        setQQNumber('')
        setConfirmLoading(false)
        setOpen(false)
      } else {
        messageApi.open({
          type: 'error',
          content: '请输入正确的QQ号',
          duration: 2
        })
      }
    } catch (error: any) {
      setQQNumber('')
      setConfirmLoading(false)
      messageApi.open({
        type: 'error',
        content: error.message,
        duration: 2
      })
    }
  }

  // 发送消息
  const [messageIpt,setMessageIpt] = useState('')
  const lastMessageRef= useRef<HTMLDivElement>(null)
  useEffect(()=>{
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  },[messageList])
  const  messageIptChange = (e:any) => {
    setMessageIpt(e.target.value)
  }
  const onSearch = async (value: string,e:any) => {
    if(value=='') {
      messageApi.open({
        type: 'error',
        content: '请输入信息后在点击发送！',
        duration: 2
      })
    } else {
      const data = {
        receiver: friendList.find(val => val.id === isActiveId)!.name,
        content: value
      }
      await sendMessageApi(data)
      setMessageIpt('')
    }
  }
  return (
      <div className="home">
        {contextHolder}
        <Layout className={styles.layout}>
          <Sider className={styles.siderAvatar} width={50}>
            <div className={styles.avatarBox} onClick={showModal}>
              <Badge dot>
                <Avatar
                    icon={<UserOutlined/>}
                    className={styles.avatar}
                    size={35}
                    alt="头像"
                    src={
                      userInfo.avatar
                    }
                ></Avatar>
              </Badge>
            </div>
            <Modal
                title="修改头像"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
              <p style={{marginTop: '20px', fontSize: '16px', lineHeight: '10px'}}>输入QQ号：</p>
              <Input value={QQNumber} onChange={e=>changeQQNumber(e)} placeholder="Enter QQ number"/>
            </Modal>
          </Sider>
          <Sider breakpoint="md" collapsedWidth="0" className={styles.siderList}>
            <div className={styles.title}>
              <h1>Chatex</h1>
            </div>
            <div className={styles.friendItem}>
              {
                friendList.map((val, idx) => {
                  return (
                      <FriendItem onFriendClick={friendActive} key={val.id} info={val}
                                  isActive={isActiveId === val.id ? true : false}/>
                  )
                })
              }
            </div>
          </Sider>
          <Layout className={styles.content}>
            <Header className={styles.header}>
              <UserBar info={{
                avatar:  friendList.find(val => val.id === isActiveId)!.avatar
                ,
                name: friendList.find(val => val.id === isActiveId)!.name
              }} isInput={isInput}/>
            </Header>
            <Content className={styles.main}>
              <div className={styles.messageContainer}>
                {
                  messageList && messageList.map((val,index,arr)=>{
                    const  isFirst = arr[index-1]?.sender !== val.sender ;
                    const  locationX = val.sender === userInfo.name ? LocationX.Right : LocationX.Left;
                    const  info = {
                      avatar: locationX === LocationX.Right ? userInfo.avatar : friendList.find(val => val.id === isActiveId)!.avatar
                      ,
                      content: val.content
                    }
                    return (
                        <MessageBox info={info} key={val.id} locationX={locationX} isFirst={isFirst}/>
                    )
                  })
                }
                <div ref={lastMessageRef}/>
              </div>
              <div className={styles.form}>
                <Search
                    placeholder="iEnter the message you want to send"
                    onSearch={onSearch}
                    onChange={e => messageIptChange(e)}
                    enterButton="Send"
                    value={messageIpt}
                />
              </div>
            </Content>
            <Footer className={styles.footer}>
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </Layout>
          <Sider
              breakpoint="lg"
              className={styles.siderRight}
              collapsedWidth={0}
              width={230}
          >
            <UserInfo avatarUrl={userInfo.avatar} name={userInfo.name}/>
          </Sider>
        </Layout>
      </div>
  )
})

export default Home
Home.displayName = 'Home' // 方便以后调试用的

// SSR 服务端渲染
export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps(function (store) {
      return async (context) => {
        // 获取用户列表,当前登录用户信息,获取聊天记录
        await Promise.all([
          store.dispatch(
              fetchFriendList(context.req.cookies as { session: string })
          ),
          store.dispatch(
              fetchUserInfo(context.req.cookies as { session: string })
          )
        ])
        await store.dispatch(
                fetchMessageList({
                  session: context.req.cookies.session,
                  receiver: store.getState().home.friendList[0].name
                } as { session: string, receiver: string })
            )
        return {
          props: {}
        }
      }
    })
