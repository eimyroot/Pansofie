# Young promotion checklist

Before merge to `main`:

- [x] Next.js production build passes on Vercel preview
- [x] `/young/kids` is present in the build route manifest
- [x] `/young/teens` is present in the build route manifest
- [x] protected Young layouts still call `requireUserContext(expectedExperience)`
- [x] public `/young` age labels are 6–13 / 14–20
- [x] Adult shared `experience.css` is unchanged
- [x] full `npm run check` passed on preview commit `22729f3` (6/6 tests + contract + Living R8 + Stability R9 + Art Kit + Next build)
- [ ] authenticated Kids account reaches `/young/kids` on this final preview
- [ ] authenticated Teens account reaches `/young/teens` on this final preview
- [ ] wrong Young experience redirects to the resolver-selected route on this final preview
- [ ] desktop/tablet/mobile visual review completed against the supplied target
- [ ] exact reference-pack image binaries committed, or fallback asset gap explicitly accepted
