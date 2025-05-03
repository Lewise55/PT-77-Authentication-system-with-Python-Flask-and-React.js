export const signup = async (dispatchEvent, payload) => {
    let responce = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: {
            email: payload.email,
            password: payload.password
        }
    });
    let data =  await responce.json();

    // error handling
    // if (data.detail === "User doesn't exists") {
    //     createSignup();
    // }
}

export const login = async (dispatchEvent, payload) => {
    let responce = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: {
            email: payload.email,
            password: payload.password
        }
    });
    let data =  await responce.json();

    dispatchEvent({
        type: "set_user",
        payload: {user: data.user, access_token: data.access_token}
    });
}

// export const private = async (dispatchEvent, payload) => {
//     // let responce = await fetch();
//     // let data =  await responce.json();

//     // error handling
//     // if (data.detail === "User doesn't exists") {
//     //     createSignup();
//     // }

//     dispatchEvent({
//         type: "set_signup",
//         payload: { }
//     });
// }