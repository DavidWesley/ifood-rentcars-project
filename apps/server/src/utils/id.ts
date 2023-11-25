import { randomUUID, type UUID } from "node:crypto"

const createUUID = randomUUID

const validateUUID = (uuid: string): uuid is UUID => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)
}

export { createUUID, UUID, validateUUID }
