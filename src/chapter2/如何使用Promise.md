# API
***Promise构造函数：`Promise(executor) {}`***

* executor函数：执行器 `(resolve, reject) => {}`
* resolve函数：内部定义成功时我们调用的函数 `value => {}`
* reject函数：内部定义失败时我们调用的函数 `reason => {}`

说明：executor会在Promise内部立即同步回调，异步操作在执行器中执行

***Promise.prototype.then：(onFulfilled, onRejected) => {}***

* onFulfilled 函数: 成功的回调函数 value => {}
* onRejected 函数: 失败的回调函数 reason => {}

说明: 指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调，并返回一个新的 promise 对象

***Promise.prototype.catch：onRejected => {}***

* onRejected 函数: 失败的回调函数 reason => {} 

说明: then()的语法糖, 相当于: then(undefined, onRejected)

***Promise.resolve: value => {}***

* value: 成功的数据或 promise 对象

说明: 返回一个成功/失败的 promise 对象

***Promise.reject: reason => {}***

* reason: 失败的原因

说明: 返回一个失败的 promise 对象

***Promise.all: promises => {}***

* promises: 包含 n 个 promise 的数组

说明: 返回一个新的 promise, 只有所有的 promise 都成功才成功, 只要有一个失败了就 直接失败

***Promise.race: promises => {}***

* promises: 包含 n 个 promise 的数组

说明: 返回一个新的 promise, 第一个完成的 promise 的结果状态就是最终的结果状态

# promise的几个关键问题

**1. 如何改变promise的状态**

* resolve(value)：如果当前是pending就会变为fulfilled
* reject(reson)：如果当前是pending就会变为rejected
* 抛出异常：如果当前是pending就会变为rejected

**2. 一个promise指定多个成功/失败回调函数，都会调用吗？**

当promise改变为对应状态时都会调用

**3. 改变promise状态和指定回调函数谁先谁后？**

* 都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调
* 如何先改状态再指定回调?
  * 在执行器中直接调用 resolve()/reject()
  * 延迟更长时间才调用 then()
* 什么时候才能得到数据?
  * 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
  * 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据

**4. promise.then()返回的新promise的结果状态由什么决定？**

* 简单表达：由then()指定的回调函数执行的结果决定
* 详细表达：
  * 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常
  * 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值
  * 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果

**5. promise如何串连多个操作任务？**

* promise 的 then()返回一个新的 promise, 可以形成 then()的链式调用
* 通过then的链式调用串连多个同步/异步任务

**6. promise异常穿透？**

* 当使用promise的then链式调用时,可以在最后指定失败的回调
* 前面任何操作出了异常, 会一直向后传直到遇到失败的回调函数，并在其中被处理

**7. 如何中断promise链？**

* 当使用promise的then链式调用时,在中间中断,不再调用后面的回调函数
* 办法：在回调函数中返回一个pending状态的promise对象