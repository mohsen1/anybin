# HalfBin
![](https://api.travis-ci.org/mohsen1/halfbin.svg)
Backend API of a bin website.

**Work in progress**

## Running locally

```
git clone git@github.com:mohsen1/halfbin.git
cd halfbin
npm install
npm run dev
```

### Routes

|Operation|Path         |Description                     |
|---------|-------------|--------------------------------|
|GET      |/            |List all bins                   |
|POST     |/            |Make a new Bin                  |
|GET      |/:id         |Get latest version of a bin     |
|PUT      |/:id         |Update latest version of a bin  |
|POST     |/:id         |Add a new version to a bin      |
|GET      |:/id/:version|Get a specific version of a bin |


## License
MIT
