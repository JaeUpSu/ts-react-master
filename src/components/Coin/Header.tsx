import styled from "styled-components";

const Header = styled.header.attrs((props) => ({
  className: `coin-${props.slot}`,
}))`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Header;
