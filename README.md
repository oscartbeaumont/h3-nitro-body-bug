# Bug reproduction

## Testing the bug

This bug exists for the Vercel Edge Runtime and Deno. These instructions show Deno cause it's easier for local testing.

```bash
# You must have `pnpm` and Deno installed.
pnpm test-in-deno

# In another terminal:
curl -X POST http://localhost:8000/
   -H 'Content-Type: application/json'
   -d '{}' # Notice curl doesn't stop running because the server doesn't respond.
```

## History

I found this bug while using Solid Start. Async server functions (`"use server";`) weren't working on Vercel Edge Runtime and I traced it back to this.

https://github.com/solidjs/solid-start/pull/1255
