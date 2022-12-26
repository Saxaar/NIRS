const server = "http://localhost:8080/"

async function loginUser(credentials) {
    return fetch(server + 'api/auth/signin', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

async function signupUser(credentials) {
    return fetch(server + 'api/users/signup', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

async function getUserData(token) {
    return fetch(server + 'api/usercontent', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        }
    })
        .then(data => data.json())
}

async function getEventsData(token) {
    return fetch(server + 'api/addPerfomance/perfomances', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        }
    })
        .then(data => data.json())
}

export { loginUser, signupUser, getUserData, getEventsData }