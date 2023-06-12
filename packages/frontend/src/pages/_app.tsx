import 'normalize.css'
import '@/styles/globals.scss'
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import wrapper from '@/store'
import { Provider } from 'react-redux'

export default function App({ Component, ...rest }: AppProps) {
  // Redux 接入 App
  const {store, props} = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  )
}
