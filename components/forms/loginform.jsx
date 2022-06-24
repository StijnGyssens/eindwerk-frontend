import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useContext } from "react";
import { userContext } from "../../pages/_app";

export default function Loginform({ redirect, onClose = false }) {
  const router = useRouter();

  const {
    userid: { value, change },
  } = useContext(userContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { data: token } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEPATH}/login_check`,
      data,
      { withCredentials: true }
    );
    console.log(token);
    change(token.id);
    if (redirect) {
      router.push(redirect);
    }
    if (onClose) {
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
