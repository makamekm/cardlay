# Cardlay

[Heroku Link: https://cardlay.herokuapp.com/](https://cardlay.herokuapp.com/)

_Cardlay | Demo | Vue, Nuxt, Nest, Buefy, Bulma_

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

The project reflects the idea of using Nest & Nuxt and natural animation flow. The mockups were used to achieve the best looking interface, but not pixel perfect, because they have some defects.

## Development:

```console
npm run dev
```

To verify before a commit
```console
npm run verify
```

To update snapshots
```console
npm run test:all -- -u
```

## Production:

```console
npm run build
npm run start
```

Environment variables:
- PORT=3000

## Test:

Lint
```console
npm run lint
```

Unit, Integration, E2E (Default CI)
```console
npm run test
```

Unit, Integration, E2E, P2P
```console
npm run test:all
```

P2P
```console
npm run test:p2p
```

![ScreenShot](https://raw.github.com/makamekm/cardlay/master/pages/__image_snapshots__/index-p-2-p-spec-ts-homepage-it-should-match-screenshot-1-snap.png)

Author: Maxim Karpov (makamekm)
