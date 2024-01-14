import { getRequestWebStream } from "h3";

export default eventHandler(async (event) => {
  // SolidStart does something like this.
  //
  // SolidStart's `createFetchEvent` calls Vinxi's `toWebRequest` - https://github.com/solidjs/solid-start/blob/a670ffa3c498af6d16f44a4156edaca9d1fbc155/packages/start/server/middleware.ts#L21
  // Vinxi `toWebRequest` calls Vinxi's `toWebRequestH3` - https://github.com/nksaraf/vinxi/blob/419cbb04ff1ed1df1027c2eba27c8704cb6dbf0d/packages/vinxi/runtime/server.js#L174
  // Vinxi's `toWebRequestH3` calls H3's `getRequestWebStream` - https://github.com/nksaraf/vinxi/blob/419cbb04ff1ed1df1027c2eba27c8704cb6dbf0d/packages/vinxi/runtime/server.js#L168C21-L168C40
  //
  // Be aware Vinxi has the same `ArrayBuffer` check as the related PR adds as a temporary workaround for Vinxi users.
  // This means the latest Vinxi release will not have this issue.
  //
  // This then does the following which causes the `request.json()` call in Solid Start to hang.
  const request = new Request(`https://doesnt-matter-for-this.example`, {
    method: "POST",
    // Missing irrelevant properties
    body: getRequestWebStream(event),
  });

  // This will hang. The request will never finish.
  const data = await request.json();

  return data;
});
