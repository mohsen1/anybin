# AnyBin

<a href="https://travis-ci.org/mohsen1/anybin">
  <img src="https://api.travis-ci.org/mohsen1/anybin.svg">
</a>

A boilerplate bin website for saving text in a database and access it with a short URL. Very similar to PasteBin or JSBin. This is mostly back-end implementation of the website. Front-end is very simple.

**Work in progress**

## Running locally

```
git clone git@github.com:mohsen1/anybin.git
cd anybin
npm install
npm run dev
```

### Routes

|Operation|Path              |Description                     |
|---------|------------------|--------------------------------|
|GET      |/                 |Load homepage                   |
|GET      |/:id              |Load a bin                      |
|GET      |/:id/:version     |Load a bin at a version         |
|---------|------------------|--------------------------------|
|POST     |/api/             |Make a new Bin                  |
|GET      |/api/:id          |Get latest version of a bin     |
|PUT      |/api/:id          |Update latest version of a bin  |
|POST     |/api/:id          |Add a new version to a bin      |
|GET      |/api/:/id/:version|Get a specific version of a bin |


## License
MIT
