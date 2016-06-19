// Tutorial 12 - Provider-and-connect.js

// This file is the entry point of our JS bundle. It's here that we'll create our Redux store,
// 이 파일은 JS 번들의 진입지점(entry point)다. 그것은 여기에서 우리가 Redux store를 만들 것이라는 것이고,
// instantiate our React Application root component and attach it to the DOM.
// 우리의 React 어플리케이션 루트 컴포넌트를 초기화하고 DOM에 붙일 것이다.

import React from 'react'
import { render } from 'react-dom'
// All store creation specific code is located in ./create-store.js
// 모든 store 생성 구체적인 코드는 ./create-store.js에 위치해 있다.
import createStore from './create-store'
// Application is the root component of our application and the one that holds Redux's Provider...
// 우리 어플리케이션의 루트 컴포넌트는 어플리케이션이고 Redux 프로바이더를 유지하고 있다...
import Application from './application'

// Just as we did so many times in previous examples, we need to create our redux instance. This time
// 우리가 단지 이전 예제헤서 매번 했던 것처럼, 우리는 우리의 redux 인스턴스를 생성하는 것을 필요로 한다. 이번에는
// all code for that task was moved to a specific module that returns a single function to trigger the
// 그 태스크에 대한 우리의 모든 코드가 인스턴스화를 발생시키기 위한 하나의 함수를 리턴하는 하나의 구체적인 모듈로 이동되어야 한다는
// instantiation.
// 것이다.
const store = createStore()

// Now, time to render our application to the DOM using ReactDOM.render (or just render thanks to
// 지금, ReactDOM.render을 사용해서 우리 어플리케이션을 DOM에 렌더할 시간이다(또는 ES6 표현 덕분에
// the ES6 notation: import { render } from 'react-dom')...
// 단지 render만으로: import { render } from 'react-dom')...
render(
  // ... and to provide our Redux store to our Root component as a prop so that Redux
	// ... 그리고 우리의 Redux store를 우리의 루트 컴포넌트에 프로퍼티로 제공하기 위해서 Redux Provider  
  // Provider can do its job.
  // 그의 일을 할 수 있다.
  <Application store={store} />,
  document.getElementById('app-wrapper')
)

// Go to ./create-store.js to review what you know now perfectly: "How to create a Redux store?"
// ./create-store.js로 가라 너가 현재 완벽히 알고 있는것에 대해 리뷰를 하기 위해서: "어떻게 Redux store를 생성하지?"
