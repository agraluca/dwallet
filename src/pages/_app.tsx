import { AppProps } from "next/app";
import { CashFlowProvider } from "contexts";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";
import { Provider as NextAuthProvider } from "next-auth/client";
import { Provider } from "react-redux";
import store from "store/store";
import GlobalStyles from "styles/global";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Provider store={store}>
        <CashFlowProvider>
          <ThemeProvider theme={theme}>
            <Head>
              <title>DWallet - Seu sistema de balanceamento de carteira</title>
              <link rel="shortcut icon" href="/img/icon-512.png" />
              <link rel="apple-touch-icon" href="/img/icon-512.png" />
              <link rel="manifest" href="/manifest.json" />
              <meta
                name="description"
                content="Seu sistema de balanceamento de carteira"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;500;700&display=swap"
                rel="stylesheet"
              />
            </Head>
            <GlobalStyles />
            <NextNprogress
              color={theme.colors.yellow}
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
            />
            <Component {...pageProps} />
          </ThemeProvider>
        </CashFlowProvider>
      </Provider>
    </NextAuthProvider>
  );
}

export default App;
