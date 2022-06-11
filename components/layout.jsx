import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/list">
          <a>Reenactment groups</a>
        </Link>
        <Link href="/subscribe">
          <a>Join the site</a>
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
