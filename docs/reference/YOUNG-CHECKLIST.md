# Young promotion checklist

Before merge to `main`:

- [x] Next.js production build passes on Vercel preview
- [x] `/young/kids` is present in the build route manifest
- [x] `/young/teens` is present in the build route manifest
- [x] protected Young layouts still call `requireUserContext(expectedExperience)`
- [x] public `/young` age labels are 6–13 / 14–20
- [x] Adult shared `experience.css` is unchanged
- [ ] full `npm run check` passes on the final PR head
- [ ] authenticated Kids account reaches `/young/kids`
- [ ] authenticated Teens account reaches `/young/teens`
- [ ] wrong Young experience redirects to the resolver-selected route
- [ ] desktop/tablet/mobile visual review completed
- [ ] exact reference-pack image binaries committed, or fallback asset gap explicitly accepted
