import Head from "next/head";
import { useEffect, useState } from "react";

const Admin = () => {
  // Load the admin client-side
  const [DynamicAdmin, setDynamicAdmin] = useState(<p>Loading...</p>);
  useEffect(() => {
    (async () => {
      const HydraAdmin = (await import("@api-platform/admin")).HydraAdmin;
      const ResourceGuesser  = (await import("@api-platform/admin")).ResourceGuesser;
      

      setDynamicAdmin(<HydraAdmin entrypoint={window.origin}>
       <ResourceGuesser name="movies"></ResourceGuesser> 
       <ResourceGuesser name="categories"></ResourceGuesser> 
      </HydraAdmin>);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>API Platform Admin</title>
      </Head>

      {DynamicAdmin}
    </>
  );
};
export default Admin;
