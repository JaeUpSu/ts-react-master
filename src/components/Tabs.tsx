import styled, { css } from "styled-components";

const Tabs = styled.ul.attrs((props) => ({
  className: `coin-${props.slot}`,
}))`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

export default Tabs;
