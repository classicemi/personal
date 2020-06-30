const OverReact = (function () {
  let context = {}
  let callId = -1

  function render(Component) {
    context.Component = Component
    const instance = Component()
    instance.render()

    callId = -1

    context.instance = instance
    return context
  }

  function useState(initialState) {
    if (!context.hooks) {
      context.hooks = []
    }

    callId = callId + 1

    const hooks = context.hooks
    const currentState = hooks[callId] ? hooks[callId] : initialState
    hooks[callId] = currentState

    const setState = (function () {
      const currentCallId = callId

      return function (newState) {
        hooks[currentCallId] = newState
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
