import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/movies/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Movies</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
