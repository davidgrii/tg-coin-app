function withTimeout(fn, t) {

  return async function(...args) {
    const fnPromise = await fn(...args)

    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject('Time Limit Exceeded'), t)
    })

    return Promise.race([fnPromise, timeout])
  }
}
