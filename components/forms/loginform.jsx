import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Loginform() {
  const router = useRouter();
  const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BASEPATH,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      data: { token },
    } = await instance.post(`/login_check`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/ld+json",
      },
    });
    console.log(token);
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
