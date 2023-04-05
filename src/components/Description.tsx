import styled, { css } from "styled-components";

const Description = styled.p.attrs((props) => ({
  className: `coin-${props.slot}`,
}))`
  margin: 20px 0px;
`;

export default Description;
