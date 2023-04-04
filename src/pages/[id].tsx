import { useState } from "react";
import {
  useQuery,
  QueryClient,
  dehydrate,
  DehydratedState,
  QueryFunctionContext,
} from "@tanstack/react-query";
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

interface Params {
  params: {
    id: string;
  };
}

export default function Coin({ params }: Params) {
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

interface Props {
  params: {
    id: string | null | undefined;
    dehydratedState: DehydratedState | null;
  };
}

export async function getServerSideProps({
  params,
}: Props): Promise<GetServerSidePropsResult<Props>> {
  try {
    // TypeScript 컴파일러에게 params?.id 표현식을 string 유형인 것처럼 처리하도록 지시
    const id = params?.id as string;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["info", id], getCoinInfo);
    await queryClient.prefetchQuery(["ticker", id], getCoinTicker);

    return {
      props: {
        params: {
          id,
          dehydratedState: dehydrate(queryClient),
        },
      },
    };
  } catch (error) {
    // Handle the error
    console.error("Error in Coin SSR", error);
    return <p>Something went wrong...</p>;
  }
}
