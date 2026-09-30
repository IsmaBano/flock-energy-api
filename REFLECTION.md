# Reflection

## 1. What was the hardest part of this assignment?

The hardest part was understanding how the legacy portal actually works.
The API endpoints were not directly documented, so I had to inspect the browser network requests.
I also had to understand the login flow, form encoding, CSRF protection, and session cookies.
This helped me learn how to integrate with an existing system without changing it.

## 2. What did you learn from this assignment?

I learned how to inspect and understand an API used by an existing web application.
I learned how authentication, cookies, headers, and pagination work in a real system.
I also improved my understanding of separating clients, services, controllers, and routes.
Most importantly, I learned to verify actual system behavior instead of making assumptions.

## 3. What engineering decision are you most happy with?

I kept the legacy portal communication separate from the API logic using a dedicated client.
This makes the code easier to understand and allows the upstream integration to be changed later.
I also used environment variables for credentials instead of putting them directly in the source code.
The API returns a cleaner and simpler interface than exposing the legacy portal directly.

## 4. What would you improve if you had more time?

I would add more automated tests for API endpoints and different failure scenarios.
I would improve caching and add better handling for temporary upstream failures.
I would also investigate more portal endpoints and support additional meter and hierarchy operations.
Finally, I would improve logging and monitoring for easier debugging in production.

## 5. What would you do differently in a production system?

I would use stronger configuration and secret management instead of local environment files.
I would add structured logging, monitoring, rate limiting, and better error handling.
I would also add automated integration tests and health checks for the upstream portal.
Before deployment, I would review security, performance, scalability, and access-control requirements.
