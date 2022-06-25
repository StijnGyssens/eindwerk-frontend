import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
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

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
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
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("simplePassword", { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="firstName">First name</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="first name"
                  {...register("firstName", { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="lastName">Last name</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="last name"
                  {...register("lastName", { required: true })}
                />
              </FormControl>
              <Checkbox
                size="lg"
                placeholder="leader"
                {...register("leader", {})}
              >
                Leader
              </Checkbox>

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
