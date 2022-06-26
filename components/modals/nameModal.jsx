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
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function NameModal({ change, group }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    change({ ...group, name: data.name });
    data = JSON.stringify(data);
    console.log(data);
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
  console.log(errors);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>change name</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>change groupname</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                defaultValue={group.name}
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
              />

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
