import {  memo } from "react";
import { Avatar, Typography } from "antd";
import type { FC } from "react";
import styles from './index.module.scss'
import classNames from "classnames";

const { Text } = Typography
export enum LocationX {
  Left = 'left',
  Right = 'right'
}

export interface IProps {
  locationX: LocationX
  isFirst: boolean

  info: {
    avatar: string
    content: string
  }
}

const MessageBox: FC<IProps> = memo(function (props) {
  const {  locationX, isFirst,info } = props
  return (
    <div className={classNames(styles.messageBox,styles[locationX])} style={{marginTop:isFirst?'15px' :'10px'}}>
      <div className={classNames(styles.box)}>
        <Avatar style={{visibility:isFirst?'inherit' :'hidden'}} className={styles.avatar} size={35} alt="头像" src={info.avatar}>
        </Avatar>
        <div className={styles.message}>
          <Text type="secondary" strong>
            {info.content}
          </Text>
        </div>
      </div>
    </div>
  )
})

export default MessageBox;
MessageBox.displayName = 'MessageBox' // 方便以后调试用的
