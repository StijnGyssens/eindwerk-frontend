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

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.groups = [data.groups];
    data = JSON.stringify(data);
    console.log(data);
    axios.post(`${process.env.NEXT_PUBLIC_BASEPATH}/members`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/ld+json",
      },
      withCredentials: true,
    });
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Register</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
              />
              <input
                type="password"
                placeholder="password"
                {...register("simplePassword", { required: true })}
              />
              <input
                type="text"
                placeholder="firstName"
                {...register("firstName", { required: true })}
              />
              <input
                type="text"
                placeholder="lastName"
                {...register("lastName", { required: true })}
              />
              <input
                type="checkbox"
                placeholder="leader"
                {...register("leader", {})}
              />

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
