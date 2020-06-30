// 用IIFE形成闭包，放置内部全局变量
const OverReact = (function () {
  // 用来挂载一系列东西的上下文对象，避免污染环境
  let context = {}
  // 用来记录每个hook位置的变量，会被setState闭包缓存
  let callId = -1

  // 初始化组件
  function render(Component) {
    // 将组件函数挂载到context上
    context.Component = Component
    // 构建组件，hook的初始化会在此时执行
    const instance = Component()
    // 执行组件render方法
    instance.render()

    // hook初始化完成，复位callId
    callId = -1

    // 将组件实例挂载到context上
    context.instance = instance
    return context
  }

  function useState(initialState) {
    // 在context上新建用于存放hooks的数组
    if (!context.hooks) {
      context.hooks = []
    }

    // 递增标记变量，用于记录当前生成hook的位置
    callId = callId + 1

    // 将当前hook存放在hooks数组对应位置
    const hooks = context.hooks
    const currentState = hooks[callId] ? hooks[callId] : initialState
    hooks[callId] = currentState

    const setState = (function () {
      // 用闭包内部变量保存当前callId
      const currentCallId = callId

      return function (newState) {
        // 通过闭包内缓存的callId找到hook对应的位置并修改
        hooks[currentCallId] = newState
        // 重新执行render
        render(context.Component)
      }
    })()

    return [currentState, setState]
  }

  return {
    render,
    useState
  }
})()

const { render, useState } = OverReact

function Component() {
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState('foo')

  function plusOne() {
    setCounter(counter + 1)
  }

  function updateName(name) {
    setName(name)
  }

  function render() {
    console.log(`rendered, counter: ${counter}, name: ${name}`)
  }

  return {
    render,
    plusOne,
    updateName
  }
}

const context = render(Component)
context.instance.plusOne()
