import styled, { css } from "styled-components";

const Container = styled.span.attrs((props) => ({
  className: `coin-${props.slot}`,
}))`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export default Container;
