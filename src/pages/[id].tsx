import { useState } from "react";
import styled from "styled-components";
import { GetServerSidePropsResult } from "next";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Container = styled.span`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  params: { id: string };
}
interface State {
  name: string;
}

export default function Coin({ params }: Props) {
  const { id } = params || {};

  return (
    <Container>
      <Header>
        <Title>{id || "Loading..."}</Title>
      </Header>
    </Container>
  );
}
export async function getServerSideProps({
  params,
}: Props): Promise<GetServerSidePropsResult<Props>> {
  return {
    props: {
      params,
    },
  };
}
