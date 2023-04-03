import { GetServerSidePropsResult } from "next";

interface Props {
  params: { id: string };
}

export default function Coin({ params }: Props) {
  const { id } = params || {};
  return (
    <div>
      <h4>Coin : {id}</h4>
    </div>
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
