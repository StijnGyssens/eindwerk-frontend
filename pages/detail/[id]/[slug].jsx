import Layout from "../../../components/layout";
import axios from "axios";
import slug from "slug";
import {
  Button,
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
import { useContext, useState } from "react";
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
  const [groups, setGroups] = useState(group);
  console.log(groups);

  return (
    <Layout>
      <Heading>
        {groups.name}
        {value && <NameModal group={groups} change={setGroups} />}
      </Heading>
      <Text fontSize="2xl">description:</Text>
      <Text>{groups.description}</Text>
      {value && <DescriptionModal group={groups} change={setGroups} />}

      <Text fontSize="2xl">Region:</Text>
      <Text> {groups.historicalRegion.historicalRegion}</Text>
      {value && <RegionModal allRegions={region} group={id} />}
      <Text fontSize="2xl">Timeperiode: </Text>
      <Text>{groups.timeperiode.timeperiode}</Text>
      {value && <TimeModal allTimes={timeperiode} group={id} />}
      <Text fontSize="2xl">Fighting style:</Text>
      <Text> {groups.fightingStyle.fightingStyle}</Text>
      {value && <StyleModal allStyles={fight} group={id} />}

      <Heading size="md">Events:</Heading>
      {groups.events.length > 0 && (
        <List>
          {groups.events.map((e) => (
            <ListItem key={e["@id"]}>{e.name}</ListItem>
          ))}
        </List>
      )}
      {value && (
        <EventModal
          allEvents={event}
          events={groups.events.map((e) => e["@id"])}
          groupid={groups["@id"]}
          group={id}
        />
      )}
      <Heading size="md">Members:</Heading>
      {groups.members.length > 0 && (
        <List>
          {groups.members.map((group) => (
            <ListItem key={group["@id"]}>
              {group.firstName} {group.lastName}
            </ListItem>
          ))}
        </List>
      )}
      {value && (
        <MemberModal
          allMembers={member}
          members={groups.members.map((m) => m["@id"])}
          groupid={groups["@id"]}
          group={id}
        />
      )}

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
      {/* <Button onClick={() => setGroups({ ...groups, name: "change" })}>
        change name
      </Button> */}
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
