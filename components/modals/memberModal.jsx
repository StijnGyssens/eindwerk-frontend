import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function MemberModal({ allMembers, members, group, change }) {
  let member = allMembers["hydra:member"];
  const {
    register: registerChange,
    handleSubmit: handleSubmitChange,
    formState: { errors: errorsChange },
  } = useForm();

  const onSubmitChange = (data) => {
    const memberFirst = member.filter((m) => m["@id"] === data.members)[0]
      .firstName;
    const memberLast = member.filter((m) => m["@id"] === data.members)[0]
      .lastName;
    const memberList = group.members;
    change({
      ...group,
      members: [
        ...memberList,
        { firstName: memberFirst, lastName: memberLast },
      ],
    });
    data.members = [...members, data.members];
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.groups = [data.groups];
    data = JSON.stringify(data);
    console.log(data);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEPATH}/members`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/ld+json",
        },
        withCredentials: true,
      }
    );
    console.log(response);
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
            <Text fontSize="2xl">Choose an member</Text>
            <form onSubmit={handleSubmitChange(onSubmitChange)}>
              <Select {...registerChange("members")}>
                {member.map((m) => (
                  <option key={m["@id"]} value={m["@id"]}>
                    {m.firstName} {m.lastName}
                  </option>
                ))}
              </Select>

              <Input type="submit" />
            </form>
            <Text fontSize="2xl">add member</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
              />
              <Input
                type="password"
                placeholder="password"
                {...register("simplePassword", { required: true })}
              />
              <Input
                type="text"
                placeholder="first name"
                {...register("firstName", { required: true })}
              />
              <Input
                type="text"
                placeholder="last name"
                {...register("lastName", { required: true })}
              />
              <Checkbox {...register("leader", {})}>Leader</Checkbox>
              <Input
                type="hidden"
                placeholder="groups"
                defaultValue={group["@id"]}
                {...register("groups", {})}
              />

              <Input type="submit" />
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
