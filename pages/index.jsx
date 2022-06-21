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
        Living History
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
        form at "Join the site", if you have a different fighting style than in
        the options you can contact me
      </Text>
      <Heading as={"h3"} size="lg">
        Fighting styles
      </Heading>
      <TableContainer>
        <Table>
          <Tbody>
            {fight.map(({ fightingStyle, description }) => (
              <Tr>
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
    `https://wdev2.be/fs_stijn/eindwerk/api/styles`
  );
  return {
    props: { data },
    revalidate: 60,
  };
};
