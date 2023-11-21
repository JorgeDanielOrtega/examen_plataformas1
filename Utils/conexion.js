import { URL } from "./constantes";
import { getToken } from "./sessionStorage";

export async function get(recurso, jwt = "") {
    let header = {
        "Accept": "application/json"
    }

    let jwt = ''

    if (jwt !== "") {
        const token = getToken()
        jwt = token;
        header = { ...header, "TEST-KEY": jwt }
    }


    const response = await fetch(URL + recurso, { cache: "no-store", headers: header`` })

    console.log(response);
    return response;
}

export async function post(recurso, jwt = "") {
    let header = {
        "Accept": "application/json"
    }

    let jwt = ''

    if (jwt !== "") {
        const token = getToken()
        jwt = token;
        header = { ...header, "TEST-KEY": jwt }
    }


    const response = await fetch(URL + recurso, { method: "POST", headers: header`` })

    console.log(response);
    return response;
}
