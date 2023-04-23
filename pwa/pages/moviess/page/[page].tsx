import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getMoviess,
  getMoviessPath,
} from "../../../components/movies/PageList";
import { PagedCollection } from "../../../types/collection";
import { Movies } from "../../../types/Movies";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getMoviessPath(page), getMoviess(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Movies>>("/movies");
  const paths = await getCollectionPaths(
    response,
    "movies",
    "/moviess/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
