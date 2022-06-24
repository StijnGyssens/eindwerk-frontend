import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        {...register("Email", { required: true })}
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
      <input type="checkbox" placeholder="leader" {...register("leader", {})} />

      <input type="submit" />
    </form>
  );
}
