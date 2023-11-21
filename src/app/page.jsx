"use client";

import { isSession } from "../../Utils/sessionStorage";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      {isSession() && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      router.push("/resgister");
                    }}
                  >
                    Registrar
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      router.push("/resgister");
                    }}
                  >
                    Registrar
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      router.push("/resgistrar/49c7932d-87ef-11ee-8e9c-5254008b9e28");
                    }}
                  >
                    Registrar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!isSession() && <h1>Inicie sesion</h1>}
    </>
  );
}
