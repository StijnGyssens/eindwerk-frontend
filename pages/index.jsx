import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import Layout from "../components/layout";

export default function Home({ data }) {
  const fight = data["hydra:member"];
  return (
    <Layout title="Home">
      <Heading as={"h1"} size="2xl">
        Glimpse of the Past
      </Heading>
      <Heading as={"h2"} size="xl">
        Info about the site
      </Heading>
      <Text>
        If you want to find a reenactment group go to the Reenactment groups
        tab, there you can search for what you want and find more details about
        a group.
        <br />
        On this page is also a short description about the fighting styles a
        group can have.
      </Text>
      <Text>
        For reenactment groups: if you want to join the site just fill in the
        form at &quot;Join the site&quot;, if you have a different fighting
        style than in the options you can contact me
      </Text>
      <Heading as={"h3"} size="lg">
        Fighting styles
      </Heading>
      <TableContainer>
        <Table>
          <Tbody>
            {fight.map(({ fightingStyle, description }) => (
              <Tr key={fightingStyle}>
                <Td>{fightingStyle}</Td>
                <Td>{description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/styles`
  );
  return {
    props: { data },
    revalidate: 60,
  };
};
