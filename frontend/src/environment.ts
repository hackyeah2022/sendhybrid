interface Environment {
    API_URL: string
}

const environment: Environment = {
    API_URL: process.env.API_URL ?? ''
}

export default environment
