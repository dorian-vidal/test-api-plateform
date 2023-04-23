import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getCategorys,
  getCategorysPath,
} from "../../../components/category/PageList";
import { PagedCollection } from "../../../types/collection";
import { Category } from "../../../types/Category";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getCategorysPath(page), getCategorys(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Category>>("/categories");
  const paths = await getCollectionPaths(
    response,
    "categories",
    "/categorys/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
