import 'normalize.css'
import '@/styles/globals.scss'
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import wrapper from '@/store'
import { Provider } from 'react-redux'
import SocketContext from '@/context/socket-context';
import { io } from "socket.io-client";

export default function App({ Component, ...rest }: AppProps) {
  const socket = io(String(process.env.NEXT_PUBLIC_SOCKETAPIURL))
  // Redux 接入 App
  const {store, props} = wrapper.useWrappedStore(rest)
  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
    </SocketContext.Provider>
  )
}
