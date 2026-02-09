import { httpClient } from "../http-client/http-client"

const getPosts = async () => {
    return httpClient.get('https://dev.codeleap.co.uk/careers/')
}


export { getPosts }