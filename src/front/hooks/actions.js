export const signup = async (dispatch, payload) => {
    let response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/signup", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                email: payload.email,
                password: payload.password
            }),
        }
    );
    let data = await response.json();
}

export const login = async (dispatch, payload) => {
    let response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                email: payload.email,
                password: payload.password
            }),
        }
    );
    let data = await response.json();

    dispatch({
        type: "set_user",
        payload: {user: data.user, access_token: data.access_token}
    });
}

export const getUser = async (dispatch, payload) => {
    let response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/private", {
            method: "GET",
            headers: {"Authorization": "Bearer " + payload},
        }
    );
    let data = await response.json();

    // error handling
    if (!response.ok) {
        // If token is invalid, remove it and reset state
        throw new Error("Invalid or expired token");
    } 

    dispatch({
        type: "set_user",
        payload: {user: data.user, access_token: payload}
    });
    
};