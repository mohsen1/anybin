# HalfBin
Backend API of a bin website.

**Work in progress**

## Running locally

```
git clone ...
cd halfbin
npm install
npm run dev
```

### Routes

|Operation|Path         |Description                     |
|---------|-------------|--------------------------------|
|get      |/            |List all bins                   |
|post     |/            |Make a new Bin                  |
|get      |/:id         |Get latest version              |
|put      |/:id         |Update latest version of a bin  |
|post     |/:id         |Add a new version to a bin      |
|get      |:/id/:version|Get a specific version of a bin |


## License
MIT