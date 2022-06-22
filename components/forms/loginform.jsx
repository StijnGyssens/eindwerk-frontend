import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Loginform() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASEPATH}/login_check`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/ld+json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        router.push("/subscribe");
      })
      .catch((error) => console.error(error));
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
