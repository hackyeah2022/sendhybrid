interface Environment {
  API_URL: string;
}

const environment: Environment = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? '',
};

console.log(environment);

export default environment;
