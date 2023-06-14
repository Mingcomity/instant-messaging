import {  memo } from "react";
import type { FC } from "react";
import { Avatar } from "antd";
import styles from './index.module.scss'

export interface IProps {
  avatarUrl: string
  name: string
  // ...
}

const UserInfo: FC<IProps> = memo(function (props) {
  const { avatarUrl,
    name } = props
  return (
    <div className={styles.userInfo}>
      <div className={styles.box}>
        <div className={styles.avatarBox}>
          <Avatar className={styles.avatar} size={50} alt="头像" src={avatarUrl}>
          </Avatar>
        </div>
        <div className={styles.name}>
          <h2>{name}</h2>
        </div>
      </div>
    </div>
  )
})

export default UserInfo;
UserInfo.displayName = 'UserInfo' // 方便以后调试用的
