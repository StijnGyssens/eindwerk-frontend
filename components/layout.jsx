import { Container, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ children, title }) => {
  return (
    <Container minH="100vh" maxW="container.xl" p={0}>
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
          <Link href="/subscribe">
            <a>Join the site</a>
          </Link>
        </Flex>
      </nav>
      <Container minH="max" maxW="container.xl">
        <main>{children}</main>
      </Container>

      <footer>Made by Stijn Gyssens</footer>
    </Container>
  );
};

export default Layout;
