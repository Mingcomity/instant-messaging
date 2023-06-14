import {memo} from "react";
import type {FC} from "react";
import styles from './index.module.scss'
import {Avatar, Typography} from "antd";

const {Text, Title} = Typography

export interface IProps {
  isInput: boolean
  info: {
    avatar: string
    name: string
  }
}

const UserBar: FC<IProps> = memo(function (props) {
  const {isInput,info} = props
  return (
      <div className={styles.userBar}>
        <div className={styles.box}>
          <Avatar className={styles.avatar} size={35} alt="头像"
                  src={info.avatar}>
          </Avatar>
          <div className={styles.info}>
            <Title level={5}>{info.name}</Title>
            <Text type="secondary" strong style={{visibility: isInput ? 'visible' : 'hidden' }}>对方正在输入中...</Text>
          </div>
        </div>
      </div>
  )
})

export default UserBar;
UserBar.displayName = 'UserBar' // 方便以后调试用的
