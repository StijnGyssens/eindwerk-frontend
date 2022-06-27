import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

const Subscribe = ({ fight, region, timeperiode }) => {
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
      .post(`${process.env.NEXT_PUBLIC_BASEPATH}/groups`, data, {
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
      <Heading mb={10}>Create a new group</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired mb={5}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </FormControl>
        <FormControl isRequired mb={5}>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            id="location"
            type="text"
            placeholder="location"
            {...register("location", { required: true })}
          />
        </FormControl>
        <FormControl isRequired mb={5}>
          <FormLabel htmlFor="descr">Description</FormLabel>
          <Textarea id="descr" {...register("description", {})} />
        </FormControl>
        <FormControl mb={5}>
          <FormLabel htmlFor="style">Fight style</FormLabel>
          <Select id="style" {...register("fightingStyle")}>
            {fights.map((f) => (
              <option key={f["@id"]} value={f["@id"]}>
                {f.fightingStyle}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel htmlFor="region">Historical region</FormLabel>
          <Select
            id="region"
            {...register("historicalRegion", { required: true })}
          >
            {regions.map((r) => (
              <option key={r["@id"]} value={r["@id"]}>
                {r.historicalRegion}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel htmlFor="time">Time periode</FormLabel>
          <Select id="time" {...register("timeperiode", { required: true })}>
            {timeperiodes.map((t) => (
              <option key={t["@id"]} value={t["@id"]}>
                {t.timeperiode}
              </option>
            ))}
          </Select>
        </FormControl>

        <Input type="submit" value="send" />
      </form>
    </Layout>
  );
};

export default Subscribe;
export const getStaticProps = async () => {
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
    props: { fight, region, timeperiode },
    revalidate: 60,
  };
};
