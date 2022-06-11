import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Layout from "../components/layout";

const list = () => {
  return (
    <Layout>
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
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Halvard</Td>
              <Td>Eastern</Td>
              <Td>Viking</Td>
              <Td>Early middle ages</Td>
              <Td>Kortrijk</Td>
            </Tr>
            <Tr>
              <Td>Halvard</Td>
              <Td>Eastern</Td>
              <Td>Viking</Td>
              <Td>Early middle ages</Td>
              <Td>Kortrijk</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default list;
