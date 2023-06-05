import Head from "next/head";
import styles from "@/styles/Main.module.css";

export default function Marketing() {
  return (
    <>
      <Head>
        <title>Plugin Manager</title>
        <meta name="description" content="Plugin Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>Lets manage some plugins</main>
    </>
  );
}
