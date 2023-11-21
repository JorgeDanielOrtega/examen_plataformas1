import { URL } from "./constantes";
import { getToken } from "./sessionStorage";

export async function get(recurso, jwt = "") {
    let header = {
        "Accept": "application/json",
        "Content-type": "application/json"
    }

    if (jwt !== "") {
        header = { ...header, "TEST-KEY": jwt }
    }

    const response = await fetch(URL + recurso, { cache: "no-store", headers: header})

    return response.json();
}

export async function post(recurso, data, jwt = "") {
    let header = {
        "Accept": "application/json",
        "Content-type": "application/json"
    }

    if (jwt !== "") {
        console.log("hola??");
        header = { ...header, "TEST-KEY": jwt }
    }

    const response = await fetch(URL + recurso, { method: "POST", headers: header, body: JSON.stringify(data) })

    return response.json();
}
