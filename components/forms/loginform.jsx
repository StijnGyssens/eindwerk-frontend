import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";

export default function Loginform({ redirect, modal }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
      data: { token },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEPATH}/login_check`,
      data,
      { withCredentials: true }
    );
    console.log(token);
    if (redirect) {
      router.push(redirect);
    }
    if (modal) {
      onClose();
    }
    /* const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEPATH}/login_check`,
      { method: "POST", credentials: "include", body: JSON.stringify(data) }
    );
    console.log(response); */
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="username"
        {...register("username", { required: true })}
      />
      <input
        type="password"
        placeholder="password"
        {...register("password", { required: true })}
      />

      <input type="submit" />
    </form>
  );
}
