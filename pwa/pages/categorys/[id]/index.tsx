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

import { Show } from "../../../components/category/Show";
import { PagedCollection } from "../../../types/collection";
import { Category } from "../../../types/Category";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getCategory = async (id: string | string[] | undefined) =>
  id ? await fetch<Category>(`/categories/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: category, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<Category> | undefined>(["category", id], () =>
    getCategory(id)
  );
  const categoryData = useMercure(category, hubURL);

  if (!categoryData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Category ${categoryData["@id"]}`}</title>
        </Head>
      </div>
      <Show category={categoryData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["category", id], () => getCategory(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Category>>("/categories");
  const paths = await getItemPaths(response, "categories", "/categorys/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
