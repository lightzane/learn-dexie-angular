# Learn Dexie Angular

Learning `Dexie` (https://dexie.org/) - A Minimalistic Wrapper for IndexedDB

## Getting Started

https://dexie.org/docs/Tutorial/Angular

## Warning

Never index properties containing images, movies or large (huge) strings. Store them in IndexedDB, yes! but just don’t index them!

Reference: https://dexie.org/docs/Version/Version.stores()#warning

```ts
db.version(1).stores({
  friends: '++id, name, age', // don't index "picture"
});

db.friends.put({
  name: 'Camilla',
  age: 25,
  picture: await getBlob('camilla.png'), // but store it
});
```

<p style="font-style: italic;">Example how the “picture” property is stored without being indexed.

Writing this because there have been some issues on github where people index images or movies without really understanding the purpose of indexing fields. A rule of thumb: Are you going to put your property in a where(‘…’) clause? If yes, index it, if not, dont. Large indexes will affect database performance and in extreme cases make it unstable.</p>
