import {
  useQuery,
  QueryClient,
  dehydrate,
  DehydratedState,
} from "@tanstack/react-query";
import styled from "styled-components";
import { GetServerSidePropsResult } from "next";
import { getCoinInfo, getCoinTicker } from "./api/api";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
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
const Description = styled.p`
  margin: 20px 0px;
`;

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

const Chart = dynamic(() => import("../components/Chart"));
const Price = dynamic(() => import("../components/Price"));

export default function Coin({ params }: Params) {
  const { id } = params || {};
  const router = useRouter();
  const { component } = router.query;

  const { data: info, isLoading: infoLoading } = useQuery(
    ["info", id],
    getCoinInfo,
    {
      onSuccess: (data) => {
        console.log("coin success", data);
      },
    }
  );
  const { data: priceInfo, isLoading: priceLoading } = useQuery(
    ["ticker", id],
    getCoinTicker,
    {
      onSuccess: (data) => {
        console.log("ticker success", data);
      },
    }
  );
  const { e: page, id: _ } = router.query;

  const renderComponent = () => {
    switch (page) {
      case "Chart":
        return <Chart />;
      case "Price":
        return <Price />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header>
        <Title>{infoLoading ? "Loading..." : info?.name}</Title>
      </Header>
      {infoLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
      <nav>
        <ul>
          <li>
            <a href={`/${id}?e=Price`}>Price</a>
          </li>
          <li>
            <a href={`/${id}?e=Chart`}>Chart</a>
          </li>
        </ul>
      </nav>
      {renderComponent()}
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
