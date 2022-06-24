import {
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import slug from "slug";
import Layout from "../components/layout";
import axios from "axios";

const list = ({ data }) => {
  const groups = data["hydra:member"];
  return (
    <Layout title="list">
      <TableContainer>
        <Table>
          <TableCaption placement="top">
            List of reenactment groups
          </TableCaption>
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th>Fightstyle</Th>
              <Th>Historical region</Th>
              <Th>Timeperiode</Th>
              <Th>Training location</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {groups.map(
              ({
                id,
                name,
                location,
                fightingStyle: { fightingStyle },
                historicalRegion: { historicalRegion },
                timeperiode: { timeperiode },
              }) => (
                <Tr key={id}>
                  <Td>{name}</Td>
                  <Td>{fightingStyle}</Td>
                  <Td>{historicalRegion}</Td>
                  <Td>{timeperiode}</Td>
                  <Td>{location}</Td>
                  <Td>
                    <Link href={`/detail/${id}/${slug(name)}`}>more info</Link>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default list;

export const getStaticProps = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/groups`
  );
  return {
    props: { data },
    revalidate: 60,
  };
};
