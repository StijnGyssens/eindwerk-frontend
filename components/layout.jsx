import { Container, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";

const Layout = ({ children, title }) => {
  return (
    <Container maxW="container.xl" p={0} className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Flex justify="space-around">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/list">
            <a>Reenactment groups</a>
          </Link>
          <Link href="/login_register">
            <a>Join the site</a>
          </Link>
        </Flex>
      </nav>
      <Container maxW="container.xl">
        <main>{children}</main>
      </Container>

      <footer>Made by Stijn Gyssens</footer>
    </Container>
  );
};

export default Layout;
