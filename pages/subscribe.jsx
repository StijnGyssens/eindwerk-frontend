import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import axios from "axios";
import { Input, Select, Textarea } from "@chakra-ui/react";

const subscribe = ({ fight, region, timeperiode }) => {
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
    </Layout>
  );
};

export default subscribe;
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
