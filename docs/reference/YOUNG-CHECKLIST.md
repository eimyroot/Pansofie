# Young verification checklist

Before merge to `main`:

- [ ] Next.js build passes
- [ ] existing test suite passes
- [ ] `/young/kids` redirects unauthenticated users to `/login`
- [ ] `/young/teens` redirects unauthenticated users to `/login`
- [ ] authenticated Kids account reaches `/young/kids`
- [ ] authenticated Teens account reaches `/young/teens`
- [ ] wrong Young experience redirects to the resolver-selected route
- [ ] desktop layout checked
- [ ] tablet layout checked
- [ ] mobile layout checked
- [ ] public `/young` still renders
- [ ] adult routes unchanged
- [ ] final individual Young image pack either committed or asset gap accepted
