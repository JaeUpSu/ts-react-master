// styled 의 value type setting

import "styled-components";

// styled-components module 에 DefaultTheme 이름의 type 선언
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
  }
}

export interface StylesProps {
  slot?: string;
}
