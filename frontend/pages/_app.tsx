import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MyHead from '../components/MyHead'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MyHead />
      <NavBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
