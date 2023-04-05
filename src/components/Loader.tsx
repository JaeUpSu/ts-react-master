import styled, { css } from "styled-components";

const Loader = styled.span.attrs((props) => ({
  className: `coin-${props.slot}`,
}))`
  text-align: center;
  display: block;
`;

export default Loader;
