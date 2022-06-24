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
import { useContext } from "react";
import { userContext } from "../../_app";
import NameModal from "../../../components/modals/nameModal";
import DescriptionModal from "../../../components/modals/descriptionModal";
import EventModal from "../../../components/modals/eventModal";

const Detail = ({ id, group, fight, region, timeperiode, event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    userid: { value, change },
  } = useContext(userContext);

  return (
    <Layout>
      <p>
        name {group.name}
        {!value && <NameModal nameG={group.name} />}
      </p>
      <p>
        description: {group.description}
        {!value && <DescriptionModal descr={group.description} />}
      </p>
      {group.events.length > 0 && (
        <div>
          Events:
          {group.events.map((e) => (
            <p key={e["@id"]}>{e.name}</p>
          ))}
        </div>
      )}
      {!value && <EventModal all={event} events={group.events} />}
      <div>Fighting style: {group.fightingStyle.fightingStyle}</div>
      {value && <Button>change</Button>}
      <div>Region: {group.historicalRegion.historicalRegion}</div>
      {value && <Button>change</Button>}
      {group.members.length > 0 && (
        <div>
          <p>Members:</p>
          {group.members.map((group) => (
            <p key={group["@id"]}>
              {group.firstName} {group.lastName}
            </p>
          ))}
          {value && <Button>add member</Button>}
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
            <Loginform onClose={onClose} />
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
  const { data: fight } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/styles`
  );
  const { data: region } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/regions`
  );
  const { data: timeperiode } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/timeperiodes`
  );
  const { data: event } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/events`
  );
  return {
    props: { id, group, fight, region, timeperiode, event },
    revalidate: 10,
  };
};
