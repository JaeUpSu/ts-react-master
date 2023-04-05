import styled from "styled-components";
import { StylesProps } from "@/styles/styled";

const Overview = styled.div.attrs((props) => ({
  className: `overview-${props.slot}`,
}))`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

export default Overview;
