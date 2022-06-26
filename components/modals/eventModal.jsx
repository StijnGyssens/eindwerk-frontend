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
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function EventModal({ allEvents, events, group, change }) {
  let event = allEvents["hydra:member"];
  const {
    register: registerChange,
    handleSubmit: handleSubmitChange,
    formState: { errors: errorsChange },
  } = useForm();

  const onSubmitChange = async (data) => {
    data.events = [...events, data.events];
    data = JSON.stringify(data);
    const { data: response } = await axios.patch(
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
    change(response);
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
    axios.post(`${process.env.NEXT_PUBLIC_BASEPATH}/events`, data, {
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
      <Button onClick={onOpen}>add event</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>add event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="2xl">Choose an event</Text>
            <form onSubmit={handleSubmitChange(onSubmitChange)}>
              <Select {...registerChange("events")}>
                {event.map((e) => (
                  <option key={e["@id"]} value={e["@id"]}>
                    {e.name}
                  </option>
                ))}
              </Select>

              <Input type="submit" />
            </form>
            <Text fontSize="2xl">add event</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="datetime-local"
                placeholder="startDate"
                {...register("startDate", { required: true })}
              />
              <Input
                type="datetime-local"
                placeholder="endDate"
                {...register("endDate", { required: true })}
              />
              <Input
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
              />
              <Input
                type="text"
                placeholder="location"
                {...register("location", { required: true })}
              />
              <Textarea {...register("description", { required: true })} />
              <input
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
