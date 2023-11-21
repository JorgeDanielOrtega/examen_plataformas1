import { URL } from "./constantes";
import { getToken } from "./sessionStorage";

async function get(recurso, jwt = "") {
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

