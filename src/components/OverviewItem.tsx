import styled, { css } from "styled-components";

const OverviewItem = styled.div.attrs((props) => ({
  className: `OverviewItem-${props.slot}`,
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
export default OverviewItem;
