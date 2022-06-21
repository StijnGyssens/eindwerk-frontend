import Layout from "../../../components/layout";

const detail = ({ id }) => {
  return <Layout>{id}</Layout>;
};

export default detail;

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  return {
    props: { id },
  };
};
