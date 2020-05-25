const Promise = require('./promise')

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 2000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
  // reject('error')
})

// Promise.race([p1, p2]).then(values => {
//   console.log(values)
// }, reason => {
//   console.log(reason)
// })

Promise.reject(new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(100)
  }, 2000)
})).catch(value => console.log(value))