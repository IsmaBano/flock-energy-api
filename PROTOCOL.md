# Urja Portal Protocol Notes

## Login

POST /login

Content-Type:
application/x-www-form-urlencoded

Required fields:
- email
- password

Important headers:
- Accept: application/json
- X-SvelteKit-Action: true
- Origin
- Referer

Successful login:
- HTTP 200
- Sets __Secure-better-auth.session_token
- Session lifetime observed: 3600 seconds

## Meter Search

GET /portal/meters/search?q=&page=1

Response:
{
  "data": [...],
  "total": 403,
  "page": 1,
  "pageSize": 20
}

## Meter fields

meterId
serialNo
make
phaseType
installStatus
dtCode