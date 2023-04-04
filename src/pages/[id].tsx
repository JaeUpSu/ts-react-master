import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { GetServerSidePropsResult } from "next";
import { getCoinInfo, getCoinTicker } from "./api/api";

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

export default function Coin({ params }: Props) {
  const { id } = params || {};
  const info = useQuery(["info", id], getCoinInfo, {
    onSuccess: (data) => {
      console.log("coin success", data);
    },
  });
  const ticker = useQuery(["ticker", id], getCoinTicker, {
    onSuccess: (data) => {
      console.log("ticker success", data);
    },
  });

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
