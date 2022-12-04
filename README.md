# [HackYeah](https://hackyeah.pl) 2022

#### Task: sendhybrid.gov

#### Place: 3rd

---

In frontend dir setup `.env` file or expose env vars:
* `API_URL_TO_REWRITE` - api url (can use docker internal networking)
* `NEXT_PUBLIC_API_URL` - absolute url with `/api` prefix (eg. http://localhost:3000/api)

Please beware, these env vars are evaluated during build time
