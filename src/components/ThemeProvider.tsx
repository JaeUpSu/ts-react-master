import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";
import { lightTheme, darkTheme } from "@/styles/theme";
import { isDarkAtom } from "../atom";

type AppProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: AppProps) => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const handleTheme = () => setIsDark((_isDark) => !_isDark);

  return (
    <StyledThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <button onClick={handleTheme}>Theme Change</button>
      {children}
    </StyledThemeProvider>
  );
};
