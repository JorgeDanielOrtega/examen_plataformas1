"use client";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { get, post } from "./../../../Utils/conexion";
import { isSession, saveItem, saveToken } from "../../../Utils/sessionStorage";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  // Validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Por favor ingrese su correo institucional"),
    password: Yup.string().required("Por favor ingrese su clave"),
  });

  // YUP - Asignation of Yup Resolver
  const formOptions = { resolver: yupResolver(validationSchema) };
  // YUP - Importants events
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  // YUP - Error constanst
  const { errors } = formState;

  const onSubmit = async (data) => {
    data = { resource: "login", email: data.email, password: data.password };

    console.log('la data', data);

    const response = await post("examen.php", data);

    console.log(response);

    if (response) {
      saveToken(response.info.code);
      saveItem("external", response.info.external);
    }

    router.push("/")
  };

  return (
    <div className="container col-4 mt-5">
      <div className="d-flex justify-content-center">
        <h2>Iniciar Sesion</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-outline mb-4">
          <label className="form-label">Correo</label>
          <input
            {...register("email")}
            id="username"
            className={`form-control  ${errors.username ? "is-invalid" : ""}`}
          />
          {errors.email && (
            <div className="alert alert-danger invalid-feedback">
              {errors.email?.message}
            </div>
          )}
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Clave</label>
          <input
            {...register("password")}
            id="password"
            className={`form-control  ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <div className="alert alert-danger invalid-feedback">
              {errors.password?.message}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Iniciar sesion
        </button>
      </form>
    </div>
  );
}
