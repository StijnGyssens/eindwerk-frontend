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
  Textarea,
  useDisclosure,
  useInputGroupStyles,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function DescriptionModal({ change, group }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    change({ ...group, description: data.description });
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
      <Button onClick={onOpen}>change description</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>change description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                defaultValue={group.description}
                {...register("description", { required: true })}
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
