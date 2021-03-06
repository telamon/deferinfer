# deferinfer

> Alternative converter between promises and callbacks


Let's you define promise/callback agnostic functions

```js
function add(a, b, callback) {
  const promise = defer(done => {
    done(null, a + b)
  })
  return infer(promise, callback)
}

add(5, 7, (err, sum) => {
  console.log(sum) // => 12
})

const sum = await add(6, 4)
console.log(sum) // => 10
```

### installation

```bash
npm install deferinfer

# -- or --

yarn add deferinfer
```

```js
const { defer, infer } = require('deferinfer')

// -- or --

const defer = require('deferinfer').defer
```

## `defer(callback)` -> `Promise`

Convert callback function into to promise

```js
const result = await defer(done => someCallbackFunction(done))
```

Properly forwards errors

```js
defer(done => {
  done(new Error()) // forwarded to .catch()
  throw new Error() // forwarded to .catch()
  done(null, 42)    // forwarded to .then()
})
  .then(console.log)
  .catch(console.error)
```

Async method support

```js
defer(async done => {
  const result = await anotherPromise()
  done(null, result)promise-util
})
```

## `infer(promise, callback)` -> `Promise`

Convert promise to callback

```js
const p = infer(Promise.resolve(42), (err, res) => {
  if (err) console.error(err)
  else console.log(res)
})
```

