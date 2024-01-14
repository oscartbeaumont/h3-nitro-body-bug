# Bug reproduction

## Testing the bug

This bug exists for the Vercel Edge Runtime and Deno. These instructions show Deno cause it's easier for local testing.

```bash
# You must have `pnpm` and Deno installed.
pnpm test-in-deno

```

## History

I found this bug while using Solid Start. Async server functions (`"use server";`) weren't working on Vercel Edge Runtime and I traced it back to this.

https://github.com/solidjs/solid-start/pull/1255
