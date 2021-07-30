import AppHead from '../src/components/core/AppHead';
import { ThemeProvider } from 'styled-components'
import theme from '../src/theme'
import { GlobalStyle } from '../src/theme/GlobalStyle';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppHead />

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
