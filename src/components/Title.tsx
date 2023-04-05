import styled, { css } from "styled-components";

const Title = styled.h1.attrs((props) => ({
  className: `coin-${props.slot}`,
}))`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

export default Title;
