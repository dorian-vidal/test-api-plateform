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

import { Form } from "../../../components/category/Form";
import { PagedCollection } from "../../../types/collection";
import { Category } from "../../../types/Category";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getCategory = async (id: string | string[] | undefined) =>
  id ? await fetch<Category>(`/categories/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: category } = {} } = useQuery<
    FetchResponse<Category> | undefined
  >(["category", id], () => getCategory(id));

  if (!category) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{category && `Edit Category ${category["@id"]}`}</title>
        </Head>
      </div>
      <Form category={category} />
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
  const paths = await getItemPaths(
    response,
    "categories",
    "/categorys/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
