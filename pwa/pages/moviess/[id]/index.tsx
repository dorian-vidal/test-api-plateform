import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Show } from "../../../components/movies/Show";
import { PagedCollection } from "../../../types/collection";
import { Movies } from "../../../types/Movies";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getMovies = async (id: string | string[] | undefined) =>
  id ? await fetch<Movies>(`/movies/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: movies, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Movies> | undefined>(["movies", id], () =>
      getMovies(id)
    );
  const moviesData = useMercure(movies, hubURL);

  if (!moviesData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Movies ${moviesData["@id"]}`}</title>
        </Head>
      </div>
      <Show movies={moviesData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["movies", id], () => getMovies(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Movies>>("/movies");
  const paths = await getItemPaths(response, "movies", "/moviess/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
