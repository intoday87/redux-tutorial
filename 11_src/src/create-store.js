// Tutorial 12 - Provider-and-connect.js

// There is not much to say here, you've seen this plenty of times and it should feel pretty
// 여기서 더 핢 말은 별로 없다, 너는 아 충분한 시간동안 지켜봤고 그리고 현재 그것은 너에게 꽤 친숙하다고
// familiar to you now...
// 느끼고 있을 것이다...

// One thing to notice though: we're not using the thunk middleware that we've seen before. Instead
// 한 가지 통해서 알아두어야 할 것은: 우리는 이전에 보았었던 thunk 미들웨어를 사용하고 있지 않다는 것이다. 대신에
// we use a promise middleware solution that will allow us to handle asynchronous action creators and
// 우리는 promise 미들웨어 솔루선을 사용하는데 그것은 우리에게 비동기 액션 생성자와 그리고
// to do some nice real time updates on our UI (could also do some optimistic updates).
// 실시간 업데이트가 UI에 반영되는 어떤 멋진 것을 하기 위해 제공된다(could also do some optimistic updates).
// This middleware was discussed here: https://github.com/rackt/redux/issues/99 and it is used
// 이 미들웨어는 여기서 논의 된다: https://github.com/rackt/redux/issues/99 그리고 그것은 사용된다.
// in this very good react-redux-universal-example: https://github.com/erikras/react-redux-universal-hot-example
// 이 매우 좋은 react-redux-universal-example에서: https://github.com/erikras/react-redux-universal-hot-example
// that I strongly suggest you get a look at (later, not right now ;)).
// 그것은 내가 강력하게 너가 들어다 보기를 추천하는 것이다. (이후에, 당장은 아니라도 ;)).

import { createStore, applyMiddleware, combineReducers } from 'redux'
// You can go and see the code for this middleware, it's not very complicated and makes a good
// 너는 가서 이 미들웨어에 대한 코드를 볼 수 있다 그것은 매우 복잡한 편이 아니다 그리고 좋은
// exercise to sharpen your understanding on middlewares.
// 미들웨어에 대해 날카로운 이해를 돕도록 만들어 준다.
import promiseMiddleware from './promise-middleware'
// We'll just have one reducer in this application but the ES6 import notation below is
// 우리는 단지 우리의 어플리케이션에서 하나의 reducer만 가질 것이다 그러나 ES6 import 문법은 아래에서
// pretty interesting to import and produce a reducers hash in one go. Have a look in
// 꽤 흥미롭게 import 그리고 하나의 reducer들 해시를 한방에 생성한다.
// ./reducers.js to see what our reducer actually do (no magic there).
// ./reducers.js를 봐라 우리의 reducer가 실제로 하려는 것이 무엇인지.(그곳에 마법은 없다).
import * as reducers from './reducers'

// The data parameter that we see here is used to initialize our redux store with data. We didn't
// data 파라미터 그것은 우리의 redux store를 데이터와 함게 초기화시키기 위해서 여기서 사용되는 것을 볼 수 있다.
// talk about this yet for simplicity but thanks to it your reducers can be initialized
// 우리는 단순함을 위해서 아직 이것에 대해 얘기를 하지 않았다 그러나 그것 덕분에 너의 reducer들은 만약 너가
// with real data if you already have some. For example in an isomorphic/universal app where you
// 이미 어떤 데이터를 가지고 있다면 실제 데이터와 초기화 될 수 있다. 예를 들어 isomorphic/universal 앱에서
// fetch data server-side, serialize and pass it to the client, your Redux store can be
// 너가 서버쪽 데이터를 가져오면(fetch), 직렬화고 그리고 그것을 클라이언트에 건내주고, 너의 Redux store는 
// initialized with that data.
// 그 데이터와 함께 초기화 될 수 있다.
// We're not passing any data here but it's good to know about this createStore's ability.
// 우리는 어떤 데이터든지 여기에 건내주지 않을 것이다. 그러나 createStore의 능력에 대해 알아 놓는 것이 좋다.
export default function(data) {
  var reducer = combineReducers(reducers)
  var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  var store = finalCreateStore(reducer, data)

  return store
}

// Go to ./application.jsx to learn of the first Redux binding for React: the Provider component.
// ./application.jsx로 가라. React를 위해 Redux를 처음으로 바인딩하는 것을 배우기 위해서: the Provider component.
