import { GetServerSidePropsResult } from "next";
import Link from "next/link";
import styled from "styled-components";
import {
  useQuery,
  dehydrate,
  DehydratedState,
  QueryClient,
} from "@tanstack/react-query";
import { getAllCoins } from "./api/api";

const Container = styled.div`
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

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Home() {
  const { data: coins, isLoading } = useQuery(["coins"], getAllCoins);
  console.log("data", coins);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinList>
        {!isLoading &&
          coins?.map((coin: CoinInterface) => (
            <Coin key={coin.id}>
              <Link href={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
      </CoinList>
    </Container>
  );
}
interface Props {
  dehydratedState: DehydratedState | null;
  data: CoinInterface[] | null | undefined;
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["coins"], getAllCoins);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        data: queryClient.getQueryData(["coins"]),
      },
    };
  } catch (e) {
    console.log("Error in coins ssr func", e);

    return {
      props: {
        dehydratedState: null,
        data: null,
      },
    };
  }
}
