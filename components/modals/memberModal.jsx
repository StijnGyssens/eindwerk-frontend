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

export default function MemberModal({ allMembers, members, groupid, group }) {
  let member = allMembers["hydra:member"];
  const {
    register: registerChange,
    handleSubmit: handleSubmitChange,
    formState: { errors: errorsChange },
  } = useForm();

  const onSubmitChange = (data) => {
    data.members = [...members, data.members];
    data = JSON.stringify(data);
    axios.patch(`${process.env.NEXT_PUBLIC_BASEPATH}/groups/${group}`, data, {
      headers: {
        accept: "application/ld+json",
        "Content-Type": "application/merge-patch+json",
      },
      withCredentials: true,
    });
    onClose();
  };
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
  console.log(errors);
  /* console.log(errors); */

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>add member</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>add member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Choose an member</p>
            <form onSubmit={handleSubmitChange(onSubmitChange)}>
              <select {...registerChange("members")}>
                {member.map((m) => (
                  <option key={m["@id"]} value={m["@id"]}>
                    {m.firstName} {m.lastName}
                  </option>
                ))}
              </select>

              <input type="submit" />
            </form>
            <p>add member</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
              />
              <input
                type="password"
                placeholder="password"
                {...register("password", { required: true })}
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
              <input
                type="hidden"
                placeholder="groups"
                defaultValue={groupid}
                {...register("groups", {})}
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
