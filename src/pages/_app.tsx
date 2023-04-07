import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@/components/ThemeProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}
}
`;
const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <GlobalStyle />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
