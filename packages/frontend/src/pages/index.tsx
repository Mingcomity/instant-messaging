import { ReactElement, memo } from "react";
import type { FC } from "react";
import Login from "@/components/login";
import { Typography  } from 'antd';
import styles from './index.module.scss'
const { Title } = Typography;

export interface IProps {
  children?: ReactElement
  // ...
}

const Index: FC<IProps> = memo(function(props) {
  const {children} = props
  
  return (
    <div className={styles.index}>
      <Title className={styles.title}>登录 / 注册</Title>
      <Login/>
    </div>
  )
})

export default Index;
Index.displayName = 'Index' // 方便以后调试用的
