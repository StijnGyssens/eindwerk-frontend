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
import { useForm } from "react-hook-form";
import axios from "axios";

export default function StyleModal({ allStyles, group }) {
  const styles = allStyles["hydra:member"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data = JSON.stringify(data);
    console.log(data);
    axios.patch(`${process.env.NEXT_PUBLIC_BASEPATH}/groups/${group}`, data, {
      headers: {
        accept: "application/ld+json",
        "Content-Type": "application/merge-patch+json",
      },
      withCredentials: true,
    });
    onClose();
  };
  /* console.log(errors); */

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>change style</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>change style</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <select {...register("fightingStyle")}>
                {styles.map((s) => (
                  <option key={s["@id"]} value={s["@id"]}>
                    {s.fightingStyle}
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
