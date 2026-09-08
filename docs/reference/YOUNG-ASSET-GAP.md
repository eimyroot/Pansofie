# Young asset gap

## VERIFIED

The supplied reference pack specifies final individual assets for:

- kids hero (desktop/tablet/mobile)
- kids topics ×6
- kids articles ×6
- kids banners ×2
- kids avatars ×6
- teens hero (desktop/tablet/mobile)
- teens topics ×6
- teens articles ×6
- teens banners ×2
- teens avatars ×6
- shared placeholders/icons

## NOT PRESENT IN REPOSITORY

The corresponding `young-kids/...` and `young-teens/...` WebP paths are not currently tracked in the GitHub repository.

## CURRENT FALLBACK

The candidate implementation references only existing repository-owned artwork under `/art/pansofie-v1` and `/assets`.

This keeps the build self-contained and avoids external image hotlinks. When the final asset files are committed, only the image-path arrays need to change; routing, shells and layout structure can remain intact.
