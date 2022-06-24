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
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Input, Select, Textarea } from "@chakra-ui/react";

const Detail = ({ id, group, fight, region, timeperiode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    userid: { value, change },
  } = useContext(userContext);

  const fights = fight["hydra:member"];
  const regions = region["hydra:member"];
  const timeperiodes = timeperiode["hydra:member"];
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data = JSON.stringify(data);
    axios
      .patch(`${process.env.NEXT_PUBLIC_BASEPATH}/groups${id}`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/ld+json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        router.push("/list");
      })
      .catch((error) => console.error(error));
  };
  console.log(errors);

  return (
    <Layout>
      {!value && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            <Input
              type="text"
              placeholder="location"
              {...register("location", { required: true })}
            />
            <Textarea {...register("description", {})} />
            <Select {...register("fightingStyle")}>
              <option value="">none</option>
              {fights.map((f) => (
                <option key={f["@id"]} value={f["@id"]}>
                  {f.fightingStyle}
                </option>
              ))}
            </Select>
            <Select {...register("historicalRegion", { required: true })}>
              {regions.map((r) => (
                <option key={r["@id"]} value={r["@id"]}>
                  {r.historicalRegion}
                </option>
              ))}
            </Select>
            <Select {...register("timeperiode", { required: true })}>
              {timeperiodes.map((t) => (
                <option key={t["@id"]} value={t["@id"]}>
                  {t.timeperiode}
                </option>
              ))}
            </Select>

            <Input type="submit" />
          </form>
        </div>
      )}
      {value && (
        <div>
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
                <Loginform onClose={onClose} />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
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
  return {
    props: { id, group, fight, region, timeperiode },
    revalidate: 10,
  };
};
