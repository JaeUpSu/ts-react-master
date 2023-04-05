import {
  useQuery,
  QueryClient,
  dehydrate,
  DehydratedState,
} from "@tanstack/react-query";
import { GetServerSidePropsResult } from "next";
import { getCoinInfo, getCoinTicker } from "./api/api";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Overview from "@/components/Overview";
import OverviewItem from "@/components/OverviewItem";
import Description from "@/components/Description";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Tab from "@/components/Tab";
import Tabs from "@/components/Tabs";

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
  const { e: component, id: _ } = router.query;

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

  const renderComponent = () => {
    switch (component) {
      case "Chart":
        return <Chart />;
      case "Price":
        return <Price />;
      default:
        return null;
    }
  };

  return (
    <Container slot="coin-containers">
      <Header slot="coin-header">
        <Title slot="coin-title">
          {infoLoading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {infoLoading ? (
        <Loader slot="coin-loader">Loading...</Loader>
      ) : (
        <>
          <Overview slot="overview-1st-contents">
            <OverviewItem slot="overview-1st-item">
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem slot="overview-2nd-item">
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem slot="overview-3rd-item">
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description slot="coin-description">{info?.description}</Description>
          <Overview slot="overview-2nd-contents">
            <OverviewItem slot="overview-2nd-1st-item">
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>{" "}
            <OverviewItem slot="overview-2nd-2nd-item">
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
      <nav>
        <Tabs slot="coin-tabs">
          <Tab isActive={component !== "Price"} slot="coin-1st-tab">
            <a href={`/${id}?e=Price`}>Price</a>
          </Tab>
          <Tab isActive={component !== "Chart"} slot="coin-2nd-tab">
            <a href={`/${id}?e=Chart`}>Chart</a>
          </Tab>
        </Tabs>
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
