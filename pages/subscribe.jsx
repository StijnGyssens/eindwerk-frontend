import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from "@chakra-ui/react";
import Layout from "../components/layout";
import axios from "axios";

const subscribe = ({ fight, region, timeperiode }) => {
  const fights = fight["hydra:member"];
  const regions = region["hydra:member"];
  const timeperiodes = timeperiode["hydra:member"];
  return (
    <Layout>
      <form action="">
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" type="text" />
          <FormErrorMessage>Type a name</FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea id="description" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input id="location" type="text" />
          <FormErrorMessage>Give a traininglocation</FormErrorMessage>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Fight style</FormLabel>
          <RadioGroup defaultValue="">
            <HStack spacing="24px">
              <Radio value="">none</Radio>
              {fights.map((f) => (
                <Radio value={f["@id"]}>{f.fightingStyle}</Radio>
              ))}
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Historical region</FormLabel>
          <RadioGroup defaultValue="">
            <HStack spacing="24px">
              {regions.map((r) => (
                <Radio value={r["@id"]}>{r.historicalRegion}</Radio>
              ))}
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Timeperiode</FormLabel>
          <RadioGroup defaultValue="">
            <HStack spacing="24px">
              {timeperiodes.map((t) => (
                <Radio value={t["@id"]}>{t.timeperiode}</Radio>
              ))}
            </HStack>
          </RadioGroup>
        </FormControl>
      </form>
    </Layout>
  );
};

export default subscribe;
export const getStaticProps = async () => {
  const { data: fight } = await axios.get(
    `https://wdev2.be/fs_stijn/eindwerk/api/styles`
  );
  const { data: region } = await axios.get(
    `https://wdev2.be/fs_stijn/eindwerk/api/regions`
  );
  const { data: timeperiode } = await axios.get(
    `https://wdev2.be/fs_stijn/eindwerk/api/timeperiodes`
  );
  return {
    props: { fight, region, timeperiode },
    revalidate: 60,
  };
};
