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

async function getUsersData(token) {
    return fetch(server + 'api/users/allUsers', {
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

async function createEvent(eventData, token) {
    return fetch(server + 'api/addPerfomance/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
    })
        .then(data => data.json())
}

async function updateEvent(eventData, token) {
    return fetch(server + `api/addPerfomance/update/${eventData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
    })
        .then(data => data.json())
}

async function deleteEvent(eventId, token) {
    return fetch(server + `api/addPerfomance/delete/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        }
    })
}

async function getActorsData(token) {
    return fetch(server + 'api/actors/allActors', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        }
    })
        .then(data => data.json())
}

async function createActor(actorData, token) {
    return fetch(server + 'api/actors/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify(actorData)
    })
        .then(data => data.json())
}

async function updateActor(actorData, token) {
    return fetch(server + `api/actors/update/${actorData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify(actorData)
    })
        .then(data => data.json())
}

async function deleteActor(actorId, token) {
    return fetch(server + `api/actors/delete/${actorId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        }
    })
}

async function getOrdersData(token) {
    return fetch(server + 'api/orders/allOrders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        }
    })
        .then(data => data.json())
}

async function createOrder(orderData, token) {
    return fetch(server + 'api/orders/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    })
        .then(data => data.json())
}

async function updateOrder(orderData, token) {
    return fetch(server + `api/orders/update/${orderData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    })
        .then(data => data.json())
}

async function deleteOrder(orderId, token) {
    return fetch(server + `api/orders/delete/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        }
    })
}

export { 
    loginUser, signupUser, getUserData, getUsersData,
    getEventsData, createEvent, updateEvent, deleteEvent, 
    getActorsData, createActor, updateActor, deleteActor,
    getOrdersData, createOrder, updateOrder, deleteOrder 
}