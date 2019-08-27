module.exports = {
  defer (task) {
    assert(typeof task === 'function')
    return new Promise((resolve, reject) => {
      const r = task((err, res) => {
        if (err) reject(err)
        else resolve(res)
      })

      // If the task is an AsyncFunction
      // then that generates a promise in itself,
      // let it race
      if (r && r.then && r.catch) {
        r.then(res => { // forward the result
          if (res) throw new Error(`Do not return values within defer(done => {...}), use the supplied 'done'; result: ${res}`)
        }).catch(reject) // Race the errors occuring in AsyncFunction
      }
    })
  },
  infer (p, cb) {
    return (typeof cb === 'function') ? p.then(r => cb(null, r)).catch(cb) : p
  }
}
