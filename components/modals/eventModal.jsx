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

export default function EventModal({ allEvents, events, groupid, group }) {
  let event = allEvents["hydra:member"];
  const {
    register: registerChange,
    handleSubmit: handleSubmitChange,
    formState: { errors: errorsChange },
  } = useForm();

  const onSubmitChange = (data) => {
    data.events = [...events, data.events];
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
    data = JSON.stringify(data);
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
            <p>Choose an event</p>
            <form onSubmit={handleSubmitChange(onSubmitChange)}>
              <select {...registerChange("events")}>
                {event.map((e) => (
                  <option key={e["@id"]} value={e["@id"]}>
                    {e.name}
                  </option>
                ))}
              </select>

              <input type="submit" />
            </form>
            <p>add event</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="datetime-local"
                placeholder="startDate"
                {...register("startDate", { required: true })}
              />
              <input
                type="datetime-local"
                placeholder="endDate"
                {...register("endDate", { required: true })}
              />
              <input
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
              />
              <input
                type="text"
                placeholder="location"
                {...register("location", { required: true })}
              />
              <textarea {...register("description", { required: true })} />
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
