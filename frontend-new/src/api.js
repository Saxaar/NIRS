const server = "http://192.168.1.101:8080/"

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

export { loginUser, signupUser }