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
import axios from "axios";
import { useForm } from "react-hook-form";

export default function RegionModal({ allRegions }) {
  const regions = allRegions["hydra:member"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data = JSON.stringify(data);
    axios.patch(`${process.env.NEXT_PUBLIC_BASEPATH}/groups`, data, {
      withCredentials: true,
    });
    onClose();
  };
  console.error(errors);

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
              <select {...register("historicalRegion")}>
                {regions.map((r) => (
                  <option key={r["@id"]} value={r["@id"]}>
                    {r.historicalRegion}
                  </option>
                ))}
              </select>

              <input type="submit" />
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
