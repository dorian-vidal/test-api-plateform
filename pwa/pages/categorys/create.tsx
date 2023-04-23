import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/category/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Category</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
