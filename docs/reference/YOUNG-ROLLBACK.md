# Young candidate rollback

Base commit before the Young UX completion work:

`8cb3cebc14713530e504288573365fac7e215106`

The candidate work intentionally avoids Supabase migrations and authorization logic. If the visual candidate fails review, the safe rollback is to keep `main` at or return the Young presentation files to the state represented by the base commit above.
