import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `barrier ${localStorage["token"]}`
    }
});

const post = async (uri, data) => {
    return await api.post(uri, data, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `barrier ${localStorage["token"]}`,
        }
    }).then((res) => {
        if (res.data.success) {
            return res.data
        }
    }).catch((err) => {
        if (!err.response.data.success) {
            return err.response.data;
        }
    })
}

const get = async (uri) => {
    return await api.get(uri).then((res) => {
        if (res.data.success) {
            return res.data
        }
    }).catch((err) => {
        if (!err.response.data.success) {
            return err.response.data;
        }
    })
}

const put = async (uri, data) => {
    var containFile = false;
    let send_data = new FormData();
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            if((typeof data[key]) == 'object'){
                containFile = true;
            }
            send_data.append(key, data[key])
        }
    }
    return await api.put(uri,containFile? send_data : data, {
        headers: {
            "Accept": "application/json",
            "Content-Type": containFile ? 'multipart/form-data' : "application/json",
            "Authorization": `barrier ${localStorage["token"]}`
        }
    }).then((res) => {
        if (res.data.success) {
            return res.data
        }
    }).catch((err) => {
        if (!err.response.data.success) {
            return err.response.data;
        }
    })
}

const deleteItem = async (uri) => {
    return await api.delete(uri).then((res) => {
        if (res.data.success) {
            return res.data
        }
    }).catch((err) => {
        if (!err.response.data.success) {
            return err.response.data;
        }
    })
}

export {
    post,
    get,
    put,
    deleteItem
}