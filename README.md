# AnyBin

<a href="https://travis-ci.org/mohsen1/anybin">
  <img src="https://api.travis-ci.org/mohsen1/anybin.svg">
</a>

A boilerplate bin website for saving text in a database and access it with a short URL. Very similar to PasteBin or JSBin. This is mostly back-end implementation of the website. Front-end is very simple.

Try a version of the app running [here](http://anybin.herokuapp.com/)

**Work in progress**

## Running locally

```
git clone git@github.com:mohsen1/anybin.git
cd anybin
npm install
npm run dev
```

### Routes

#### Website

|Operation|Path              |Description                      |
|---------|------------------|---------------------------------|
|GET      |/                 |Load homepage                    |
|GET      |/?import=url      |Load homepage and import from url|
|GET      |/:id              |Load a bin                       |
|GET      |/:id/:version     |Load a bin at a version          |

#### API

|Operation|Path              |Description                     |
|---------|------------------|--------------------------------|
|POST     |/api/             |Make a new Bin                  |
|POST     |/api?import=url   |Make a new Bin form url         |
|GET      |/api/:id          |Get latest version of a bin     |
|PUT      |/api/:id          |Update latest version of a bin  |
|POST     |/api/:id          |Add a new version to a bin      |
|GET      |/api/:/id/:version|Get a specific version of a bin |


## License
MIT
