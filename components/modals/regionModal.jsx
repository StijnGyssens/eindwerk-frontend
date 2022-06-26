import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function RegionModal({ allRegions, group, change }) {
  const regions = allRegions["hydra:member"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const regionName = regions.filter(
      (r) => r["@id"] === data.historicalRegion
    )[0].historicalRegion;
    change({
      ...group,
      historicalRegion: { historicalRegion: regionName },
    });
    data = JSON.stringify(data);
    axios.patch(
      `${process.env.NEXT_PUBLIC_BASEPATH}/groups/${group.id}`,
      data,
      {
        headers: {
          accept: "application/ld+json",
          "Content-Type": "application/merge-patch+json",
        },
        withCredentials: true,
      }
    );
    onClose();
  };
  /* console.error(errors); */

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>change historical region</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>change historical region</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Select {...register("historicalRegion")}>
                {regions.map((r) => (
                  <option key={r["@id"]} value={r["@id"]}>
                    {r.historicalRegion}
                  </option>
                ))}
              </Select>

              <Input type="submit" value="send" />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
