import {  memo } from "react";
import type { FC } from "react";
import styles from './index.module.scss'
import { Avatar, Typography } from "antd";
import classNames from "classnames";
import { ReturnUserInfoType } from "@/service/homeApi";

const { Title } = Typography
export interface IProps {
  onFriendClick: (id: number) => void,
  isActive:boolean
  info: ReturnUserInfoType
  // ...
}

const FriendItem: FC<IProps> = memo(function (props) {
  const { onFriendClick,isActive,info } = props
  const checkoutIsActive = () => { 
    onFriendClick(info.id)
  }
  return (
    <div className={styles.friendItem} onClick={checkoutIsActive}>
      <div className={classNames(styles.box, `${isActive ? styles.active : ''}`)}>
        <Avatar className={styles.avatar} size={35} alt="头像" src={info.avatar}>
        </Avatar>
        <div className={styles.info}>
          <Title level={5}>{info.name}</Title>
        </div>
      </div>
    </div>
  )
})

export default FriendItem;
FriendItem.displayName = 'FriendItem' // 方便以后调试用的
