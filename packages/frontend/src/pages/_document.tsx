import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
        <title>即时通讯-Web应用</title>
      <Head>
        <meta name='keywords' content='通讯，聊天，交流，生活'/>
        <meta name='description' content='即时通讯系统是一个可以与用户进行实时聊天的Web应用'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
