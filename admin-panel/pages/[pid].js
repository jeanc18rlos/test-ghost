import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";

export default function Home({ data }) {
  const router = useRouter();
  const { pid } = router.query;
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (pid) {
      (async () => {
        const client = new ApolloClient({
          uri: process.env.API_URL,
          cache: new InMemoryCache(),
        });

        const { data } = await client.query({
          query: gql`
            query User($id: ID!) {
              getUserById(id: $id) {
                id
                firstName
              }
            }
          `,
          variables: { id: pid },
        });

        setUser(data.getUserById);
      })();
    }
  }, [pid]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Accounts</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Accounts</h1>
        {user ? (
          <>
            this page is for{" "}
            <a href={`${process.env.DOMAIN_URL}/${user.id}`}>
              {user.firstName}
            </a>
          </>
        ) : (
          "not found"
        )}
      </main>
    </div>
  );
}
