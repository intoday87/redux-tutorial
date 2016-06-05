// Tutorial 03 - simple-reducer.js

// Now that we know how to create a Redux instance that will hold the state of our application
// 지금 우리가 우리 어플리케이션의 상태를 가지고 있을 Redux 인스턴스를 생성하기위한 방법을 안다는 것은
// we will focus on those reducer functions that will allow us to transform this state.
// 우리가 이 상태를 변형하기 위한 것을 허용하도록하는 이 reducer 함수들에 대해 초점을 맞추는 것일 것이다.

// A word about reducer VS store:
// reducer VS store라는 단어:
// As you may have noticed, in the flux diagram shown in the introduction, we had "Store", not
// 너가 아마 주목했듯이, 이전 소개에서 보여준 flux 다이어그램에서, 우리는 "Store"를 가졌지,
// "Reducer" like Redux is expecting. So how exactly do Store and Reducer differ?
// Redux에서 기대하는것과 같은 "Reducer"는 아니다. 그래서 어떻게 정확히 Store 그리고 Reducer는 다른가?
// It's more simple than you could imagine: A Store keeps your data in it while a Reducer doesn't.
// 그것은 너가 상상하는 것 보다 더 단순하다: 하나의 Store는 하나의 reducer가 그렇게 하지 않는 반면에 너의 데이터를 그것 안에 유지한다.
// So in traditional flux, stores hold state in them while in Redux, each time a reducer is
// 전통적인 flux 에서 stores는 상태를 그들안에서 유지하지만 반면에 Redux안에서 매시간 하나의 reducer는
// called, it is passed the state that needs to be updated. This way, Redux's stores became
// 호출되고, 업데이트가 되기를 필요로 하는 상태가 동과된다. 이 방식은, Redux의 stores는
// "stateless stores" and were renamed reducers.
// "상태없는 stores"가 되고 그리고 reducers로 이름이 바뀌었다.

// As stated before, when creating a Redux instance you must give it a reducer function...
// 시작하기전에, 하나의 Redux 인스턴스를 생성할 때 너는 반드시 하나의 reducer 함수를 건내주어야 한다...

import { createStore } from 'redux'

var store_0 = createStore(() => {})

// ... so that Redux can call this function on your application state each time an action occurs.
// ... Redux는 매시간 하나의 액션이 일어나는 너의 어플리케이션 상태에 대해서 이 함수를 호출 할 수 있기 위함이다.
// Giving reducer(s) to createStore is exactly how redux registers the action "handlers" (read reducers) we
// reducer(s)를 createStore에게 주는 것은 정확히 어떻게 redux가 그 액션 "핸들러"(reducers라고 읽어라)를 등록하는지다.
// were talking about in section 01_simple-action-creator.js.
// 우리가 section 01_simple-action-creator.js에서 애기 했었던 핸들러들(reducers)말이다.

// Let's put some log in our reducer
// 몇몇 로그를 우리의 reducer에 넣어 보자.

var reducer = function (...args) {
    console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)

// Output: Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]
// 결과 : Reducer는 args[ undefined, { type: '@@redux/INIT' } ]와 함께 호출되었다.

// Did you see that? Our reducer is actually called even if we didn't dispatch any action...
// 보았는가? 우리의 reducer는 심지어 어떤 액션도 우리는 수행하지 않았지만 실제로 호출이 되었다...
// That's because to initialize the state of the application,
// 이것은 그 어플리케이션의 상태를 초기화 하기 위해서이다.
// Redux actually dispatches an init action ({ type: '@@redux/INIT' })
// Redux는 실제로 하나의 초기화 액션(init action) ({ type: '@@redux/INIT' })을 수행한다.

// When called, a reducer is given those parameters: (state, action)
// 호출되었을때, 하나의 reducer는 이 파라미터들: (state, action)이 주어진다.
// It's then very logical that at an application initialization, the state, not being
// 그것은 그때 매우 논리적인데, 하나의 어플리케이션 초기화에서, 그 상태는, 
// initialized yet, is "undefined"
// 아직 초기화되지 않았다. 즉 "undefined"

// But then what is the state of our application after Redux sends its "init" action?
// 그러나 Redux가 그의 "init"액션을 보내고 난 후에 우리 어플리케이션의 상태는 무엇일까? 

// Go to next tutorial: 04_get-state.js
