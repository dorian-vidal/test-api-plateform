import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Movies } from "../../types/Movies";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getMoviessPath = (page?: string | string[] | undefined) =>
  `/movies${typeof page === "string" ? `?page=${page}` : ""}`;
export const getMoviess = (page?: string | string[] | undefined) => async () =>
  await fetch<PagedCollection<Movies>>(getMoviessPath(page));
const getPagePath = (path: string) =>
  `/moviess/page/${parsePage("movies", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: moviess, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Movies>> | undefined
  >(getMoviessPath(page), getMoviess(page));
  const collection = useMercure(moviess, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Movies List</title>
        </Head>
      </div>
      <List moviess={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
