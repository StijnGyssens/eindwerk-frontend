import Layout from "../../../components/layout";
import axios from "axios";
import slug from "slug";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Loginform from "../../../components/forms/loginform";

const Detail = ({ id, group }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <p>name {group.name}</p>
      <p>description: {group.description}</p>
      {group.events.length > 0 && (
        <div>
          Events:
          {group.events.map()}
        </div>
      )}
      <div>Fighting style: {group.fightingStyle.fightingStyle}</div>
      <div>Region: {group.historicalRegion.historicalRegion}</div>
      {group.members.length > 0 && (
        <div>
          <p>Members:</p>
          {group.members.map((group) => (
            <p key={group["@id"]}>
              {group.firstName} {group.lastName}
            </p>
          ))}
        </div>
      )}
      <p>timeperiode: {group.timeperiode.timeperiode}</p>
      <Button onClick={onOpen}>login</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>log in</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Loginform onSubmit={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default Detail;

export async function getStaticPaths() {
  const { data: groups } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/groups`
  );
  return {
    paths: groups["hydra:member"].map(({ id, name }) => ({
      params: { id: id.toString(), slug: slug(name) },
    })),
    fallback: "blocking", // false or 'blocking'
  };
}

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const { data: group } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/groups/${id}`
  );
  return {
    props: { id, group },
    revalidate: 60,
  };
};
