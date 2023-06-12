import { ReactElement, memo } from "react";
import type { FC } from "react";
import classNames from "classnames";


export interface IProps {
  children?: ReactElement
  // ...
}

const Layout: FC<IProps> = memo(function(props) {
  const {children} = props
  return (
    <div className={classNames('layout')}>
      <div className="wrapper">
        {children}
      </div>
    </div>
  )
})

export default Layout;
Layout.displayName = 'Layout' // 方便以后调试用的
