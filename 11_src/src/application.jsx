// Tutorial 12 - Provider-and-connect.js

// Now is the time to meet the first binding that redux-react (https://github.com/reactjs/react-redux)
// 지금은 redux-react가 우리에게 가져다 줄 최초의 바인딩을 만나볼 시간이다.(https://github.com/reactjs/react-redux)
// brings to us: the Provider component.
// : the Provider component.

// Provider is a React Component designed to be used as a wrapper of your application's root component. Its
// purpose is to provide your Redux instance to all of your application's components. How it does that does not
// really matter to us but just to let you know, it's using React's "context" feature (it's an advanced and
// experimental feature so you don't have to know about it, but if you're curious, here are few links to learn about it:
// - https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html
// - https://facebook.github.io/react/docs/context.html).
// Documentation for Redux Provider is here:
// https://github.com/reactjs/react-redux/blob/3.x/docs/api.md#provider-store

import React from 'react'
import Home from './home'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
  render () {
    return (
      // As explained above, the Provider must wrap your application's Root component. This way,
      // 위에서 설명했었듯이, Provider는 반드시 너의 어플리케이션 루트 컴포넌트를 감싸야 한다. 이 방법으로,
      // this component and all of its children (even deeply nested ones) will have access to your
      // 이 컴포넌트는 그리고 모든 그의 자식들(심지어 깊게 줍첩된 것들도)은 너의 redux store에 대해 접근 할 수
      // Redux store. Of course, to allow Provider to do that, you must give it the store
      // 있다. 물론, Provider에게 그렇게 하도록 허용하기 위해, 너는 반드시 그것에게 너가 이전에 빌드했던
      // you built previously (via a "store" props).
      // 그 store를 주어야 한다. ("store" props를 경유해서)
      <Provider store={ this.props.store }>
        <Home />
      </Provider>
    )
  }
}

// Go to ./home.jsx to discover how you could read from state and dispatch an action from a React component.
// ./home.jsx로 가라 어떻게 너가 상태로 부터 읽어들일 수 있는지 그리고 하나의 React 컴포넌트로부터 액션을 수행할 수 있을지에 대해 발견하기 위해서.
