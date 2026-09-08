# Young promotion gate

The candidate branch must not be promoted solely because the visual source files exist.

Promotion requires evidence of:

1. successful Next.js build
2. successful existing tests/checks
3. unauthenticated redirect behavior
4. authenticated experience routing
5. responsive visual review
6. no regression to public `/young` or adult experiences

Until these checks pass, status is `CANDIDATE`, not `CANONICAL`.
