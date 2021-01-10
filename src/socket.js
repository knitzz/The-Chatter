import io from 'socket.io-client'

const CONNECTION_URL = 'http://localhost:8000'
const socket = io.connect(CONNECTION_URL)

export {socket}