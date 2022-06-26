import {
  FormLabel,
  Heading,
  Input,
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
import { useState } from "react";

const List = ({ data }) => {
  const groups = data["hydra:member"];
  const [grouplist, setGrouplist] = useState(groups);

  const handlefilter = (e) => {
    setGrouplist(groups.filter((g) => g.name.includes(e.target.value)));
  };

  return (
    <Layout title="list">
      <Heading>Find a reenactment group</Heading>
      <Input
        placeholder="Search group by name"
        onChange={handlefilter}
        htmlSize={30}
        width="auto"
      />
      <TableContainer>
        <Table>
          <TableCaption placement="top" fontSize="2xl">
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
            {grouplist.map(
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

export default List;

export const getStaticProps = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/groups`
  );
  return {
    props: { data },
    revalidate: 60,
  };
};
