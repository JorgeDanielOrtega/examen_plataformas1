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

    console.log(URL + recurso);

    const response = await fetch(URL + recurso, { cache: "no-store", headers: header`` })

    console.log(response);
    return response.json();
}

export async function post(recurso, data, jwt = "") {
    let header = {
        "Accept": "application/json",
        "Content-type": "application/json"
    }

    if (jwt !== "") {
        header = { ...header, "TEST-KEY": jwt }
    }

    console.log(URL + recurso);

    const response = await fetch(URL + recurso, { method: "POST", headers: header, body: JSON.stringify(data) })

    console.log(response);
    return response.json();
}
