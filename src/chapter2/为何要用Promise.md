# 指定回调函数的方式更加灵活

* 旧的：必须在启动异步任务前指定
* promise：启动异步任务 -> 返回promise对象 -> 给promise对象绑定回调函数（甚至可以在异步任务结束后指定，并可以指定多个）

```js
  // 成功的回调函数
function successCallback (result) {
  console.log('声音文件创建成功: ' + result)
}

// 失败的回调函数
function failureCallback (error) {
  console.log('声音文件创建失败: ' + error)
}

// 使用纯回调函数
createAudioFileAsync(audioSettings, successCallback, failureCallback)

// 使用 Promise
const promise = createAudioFileAsync(audioSettings)

setTimeout(() => {
  promise.then(successCallback, failureCallback)
}, 3000)
```
# 支持链式调用，可以解决回调地狱问题

**什么是回调地狱**

回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调执行的条件

**回调地狱的缺点**

* 不便于阅读
* 不便于异常处理

**解决方案**

promise 链式调用

**终极解决方案**

async/await


```js
// 回调地狱
doSomething(function (result) {
  doSomethingElse(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log('Got the final result: ' + finalResult)
    }, failureCallback)
  }, failureCallback)
}, failureCallback)

// 使用 promise 的链式调用解决回调地狱
doSomething()
.then(function (result) {
  return doSomethingElse(result)
})
.then(function (newResult) {
  return doThirdThing(newResult)
})
.then(function (finalResult) {
  console.log('Got the final result: ' + finalResult)
})
.catch(failureCallback)

// async/await: 回调地狱的终极解决方案 
async function request() {
  try {
    const result = await doSomething()
    const newResult = await doSomethingElse(result)
    const finalResult = await doThirdThing(newResult)
    console.log('Got the final result: ' + finalResult)
  } catch (error) {
    failureCallback(error)
  }
}
```