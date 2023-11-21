"use client";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { get } from "./../../../Utils/conexion"
import { isSession } from "../../../Utils/sessionStorage";
import message from "../../../components/mensaje";

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container col-4 mt-5">
      <div className="d-flex justify-content-center">
        <h2>Iniciar Sesion</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-outline mb-4">
          <label className="form-label">Usuario</label>
          <input
            {...register("username")}
            id="username"
            className={`form-control  ${errors.username ? "is-invalid" : ""}`}
          />
          {errors.username && (
            <div className="alert alert-danger invalid-feedback">
              {errors.username?.message}
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
