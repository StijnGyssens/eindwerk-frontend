import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div>
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
    </div>
  );
};

export default Layout;
