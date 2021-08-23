import { AppProps } from "next/app";
import { AuthProvider } from "contexts";
import Head from "next/head";

import GlobalStyles from "styles/global";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
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
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
