import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ApolloClient, InMemoryCache, useMutation, gql } from "@apollo/client";
import Link from "next/link";

const fields = [
  { label: "firstName", field: "firstName", type: "text" },
  { label: "lastName", field: "lastName", type: "text" },
  { label: "userName", field: "userName", type: "text" },
  { label: "email", field: "email", type: "email" },
  { label: "phone", field: "phone", type: "text" },
  { label: "role", field: "role", type: "text" },
  { label: "gender", field: "gender", type: "text" },
  { label: "birthDate", field: "birthDate", type: "date" },
  { label: "temporary password", field: "password", type: "password" },
];

export default function Home({ data }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (formData) =>
    (async () => {
      const { resultData } = await client.mutate({
        mutation: gql`
          mutation signUp(
            $firstName: String!
            $lastName: String!
            $userName: String!
            $password: String!
            $email: String!
            $phone: String!
            $role: String!
            $birthDate: String!
            $gender: String!
          ) {
            signUp(
              firstName: $firstName
              lastName: $lastName
              userName: $userName
              password: $password
              email: $email
              phone: $phone
              role: $role
              birthDate: $birthDate
              gender: $gender
            ) {
              firstName
              lastName
              userName
              email
              phone
              role
              birthDate
              gender
            }
          }
        `,
        variables: {
          firstName: "jeanss",
          lastName: "carlosss",
          userName: "jeanc18ss",
          password: "ROma-1515+s",
          email: "jeanc18rlos@gmail.co",
          phone: "+58-424-1823782",
          role: "admin",
          birthDate: "Fri Apr 12 1996 00:00:00 GMT-0400 (Venezuela Time)",
          gender: "male",
        },
      });

      
    })();
  const client = new ApolloClient({
    uri: process.env.API_URL,
    cache: new InMemoryCache(),
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Accounts</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Accounts</h1>
        <br />
        <div className="h-full">
          <div className="border-b-2 block md:flex">
            <div className="w-full md:w-2/5 p-4 bg-white shadow-md">
              <div className="flex flex-col justify-between">
                <span className="mb-6 text-xl font-semibold block">
                  Account Links
                </span>
                {data.length >= 1 &&
                  data.map((i, k) => (
                    <Link
                      href={`/${i.id}`}
                      className="mt-2 mb-2 flex text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
                    >
                      {i.firstName}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="w-full md:w-3/5 p-4 bg-white md:ml-4 shadow-md">
              <div className="flex flex-col justify-between">
                <span className="mb-6 text-xl font-semibold block">
                  create account
                </span>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {fields.map((i, k) => {
                    return (
                      <div key={`${i}-${k}`} className="pb-6">
                        <label
                          htmlFor={i.field}
                          className="font-semibold text-gray-700 block pb-1"
                        >
                          {i.label}
                        </label>
                        <div className="flex">
                          <input
                            name={i.field}
                            type={i.type}
                            ref={register({ required: true })}
                            id={i.field}
                            className="border border-black  rounded-r px-4 py-2 w-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                  {/* register your input into the hook by invoking the "register" function */}
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                  <input
                    className="flex text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
                    type="submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        getAllUsers {
          id
          firstName
        }
      }
    `,
  });

  return {
    props: {
      data: data.getAllUsers,
    },
  };
}
