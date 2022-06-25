import Layout from "../../../components/layout";
import axios from "axios";
import slug from "slug";
import {
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Loginform from "../../../components/forms/loginform";
import { useContext } from "react";
import { userContext } from "../../_app";
import NameModal from "../../../components/modals/nameModal";
import DescriptionModal from "../../../components/modals/descriptionModal";
import EventModal from "../../../components/modals/eventModal";
import StyleModal from "../../../components/modals/styleModal";
import RegionModal from "../../../components/modals/regionModal";
import TimeModal from "../../../components/modals/timeModal";
import MemberModal from "../../../components/modals/memberModal";

const Detail = ({ id, group, fight, region, timeperiode, event, member }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    userid: { value, change },
  } = useContext(userContext);

  return (
    <Layout>
      <Heading>
        {group.name}
        {value && <NameModal nameG={group.name} group={id} />}
      </Heading>
      <Text>description:</Text>
      <Text>{group.description}</Text>
      {value && <DescriptionModal descr={group.description} group={id} />}

      <Text>Region: {group.historicalRegion.historicalRegion}</Text>
      {value && <RegionModal allRegions={region} group={id} />}
      <Text>Timeperiode: {group.timeperiode.timeperiode}</Text>
      {value && <TimeModal allTimes={timeperiode} group={id} />}
      <Text>Fighting style: {group.fightingStyle.fightingStyle}</Text>
      {value && <StyleModal allStyles={fight} group={id} />}

      <Flex justifyContent="space-around" m={0} p={0}>
        <Container>
          <Heading size="md">Events:</Heading>
          {group.events.length > 0 && (
            <List>
              {group.events.map((e) => (
                <ListItem key={e["@id"]}>{e.name}</ListItem>
              ))}
            </List>
          )}
          {value && (
            <EventModal
              allEvents={event}
              events={group.events.map((e) => e["@id"])}
              groupid={group["@id"]}
              group={id}
            />
          )}
        </Container>
        <Container>
          <Heading size="md">Members:</Heading>
          {group.members.length > 0 && (
            <List>
              {group.members.map((group) => (
                <ListItem key={group["@id"]}>
                  {group.firstName} {group.lastName}
                </ListItem>
              ))}
            </List>
          )}
          {value && (
            <MemberModal
              allMembers={member}
              members={group.members.map((m) => m["@id"])}
              groupid={group["@id"]}
              group={id}
            />
          )}
        </Container>
      </Flex>

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
  const { data: member } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/members`
  );
  return {
    props: { id, group, fight, region, timeperiode, event, member },
    revalidate: 1,
  };
};
