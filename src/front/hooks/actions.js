export const signup = async (dispatch, payload) => {
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            email: payload.email,
            password: payload.password
        }),
    });
    let data = await response.json();
}

export const login = async (dispatch, payload) => {
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            email: payload.email,
            password: payload.password
        }),
    });
    let data = await response.json();

    dispatchEvent({
        type: "set_user",
        payload: {user: data.user, access_token: data.access_token}
    });
}

export const getUser = async (dispatch, payload) => {
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/private", {
        method: "GET",
        headers: {"Authorization": "Bearer " + payload},
    });
    let data = await response.json();

    // error handling
    if (data.detail == "User doesn't exists") {
        createSignup();
    }

    dispatchEvent({
        type: "set_user",
        payload: {user: data.user, access_token: payload}
    });
}