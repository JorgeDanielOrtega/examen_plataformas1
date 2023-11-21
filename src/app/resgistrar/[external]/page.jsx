"use client";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


import { useRouter } from "next/navigation";
import { getItem, getToken } from "../../../../Utils/sessionStorage";
import { get, post } from "../../../../Utils/conexion";
import React, { useState, useEffect } from "react";
import message from "../../../../components/mensaje";

export default function Registar({ params }) {
  const router = useRouter();

  const [cursos, setCursos] = useState();
  const [escuelas, setEscuelas] = useState();

  // Validation
  const validationSchema = Yup.object().shape({
    weight: Yup.string().required("Por favor ingrese su peso").min(1),
    height: Yup.string().required("Por favor ingrese su altura").min(1),
    representative: Yup.string().required("Por favor ingrese representacion"),
    activities: Yup.string().required("Por favor ingrese actividades"),
    cursos: Yup.string().required("Por favor ingrese un curso"),
    escuelas: Yup.string().required("Por favor ingrese una escuela"),
  });

  // YUP - Asignation of Yup Resolver
  const formOptions = { resolver: yupResolver(validationSchema) };
  // YUP - Importants events
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  // YUP - Error constanst
  const { errors } = formState;

  const onSubmit = async (data) => {
    const sesion = getItem("external")
    data = { ...data, resource: "saveCensus", external_child: params.external ,external_school: data.escuelas, external_course: data.cursos, external_session: sesion };

    console.log("la data", data);

    const response = await post("examen.php", data, getToken());
    console.log(response);

    message(response.message, "registrado")

    router.push("/")
  };

  useEffect(() => {
    const cargarCursos = async () => {
      const response = await get("examen.php?resource=course");
      setCursos(response.info);
    };

    const cargarEscuelas = async () => {
      const response = await get("examen.php?resource=school", getToken());
      setEscuelas(response.info);
    };

    cargarCursos();
    cargarEscuelas();

    reset({
      weight: 1,
      height: 1,
      representative: "",
      activities: "",
    });
  }, [params.external]);

  return (
    <>
      {cursos && escuelas && (
        <div className="container col-4 mt-5">
          <div className="d-flex justify-content-center">
            <h2>Registrar nino</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-outline mb-4">
              <label className="form-label">Cursos</label>
              <select
                {...register("cursos")}
                id="brand"
                className="form-select"
              >
                {cursos.map((curso) => (
                  <option
                    key={curso.external_id}
                    value={curso.external_id}
                    selected={curso.external_id === cursos[0].external_id}
                  >
                    {curso.denominacion}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Escuelas</label>
              <select
                {...register("escuelas")}
                id="brand"
                className="form-select"
              >
                {escuelas.map((escuela) => (
                  <option
                    key={escuela.external_id}
                    value={escuela.external_id}
                    selected={escuela.external_id === escuelas[0].external_id}
                  >
                    {escuela.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Peso</label>
              <input
                {...register("weight")}
                id="weight"
                className={`form-control  ${errors.weight ? "is-invalid" : ""}`}
              />
              {errors.weight && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.weight?.message}
                </div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Altura</label>
              <input
                {...register("height")}
                id="height"
                className={`form-control  ${errors.height ? "is-invalid" : ""}`}
              />
              {errors.height && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.height?.message}
                </div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Representacion</label>
              <input
                {...register("representative")}
                id="representative"
                className={`form-control  ${
                  errors.representative ? "is-invalid" : ""
                }`}
              />
              {errors.representative && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.representative?.message}
                </div>
              )}
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Actividad</label>
              <input
                {...register("activities")}
                id="activities"
                className={`form-control  ${
                  errors.activities ? "is-invalid" : ""
                }`}
              />
              {errors.activities && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.activities?.message}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Registrar
            </button>
          </form>
        </div>
      )}
    </>
  );
}
