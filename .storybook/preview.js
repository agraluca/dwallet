import { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/global"
import theme from "styles/theme"
import '../.jest/next-image.mock'

export const parameters = {
  backgrounds: {
    default: 'dwallet-light',
    values: [
      {
        name: 'dwallet-light',
        value: theme.colors.white ,
      },
      {
        name: 'dwallet-dark',
        value: theme.colors.black,
      },
    ],
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles removeBg />
      <Story />
    </ThemeProvider>
  ),
];
