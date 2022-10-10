import { startServer } from './server'
import { URL } from 'url'
import { inspect } from 'util'

// const sock = 'unix:///tmp/podman.sock'

// const DOCKER_HOST = undefined
// const { href, pathname } = new URL(DOCKER_HOST || 'unix:///var/run/docker.sock')
// console.log(href, pathname)

const port = 8888
startServer(port)
