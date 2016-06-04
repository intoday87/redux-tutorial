// Tutorial 02 - about-state-and-meet-redux.js

// Sometimes the actions that we'll handle in our application will not only inform us
// 때때로 우리가 application에서 handling하려고 하는 action들은 우리에게 어떤 것이 일어났는지를 알려줘야
// that something happened but also tell us that data needs to be updated.
// 할 뿐만 아니라 우리에게 어떤 데이터가 업데이트되어야 하는지도 알려줄 것이다.

// This is actually quite a big challenge in any app.
// 이것은 실제로 어떤 앱이든지간에 꽤 큰 도전이다.
// Where do I keep all the data regarding my application along its lifetime?
// 어느 곳에서 내가 내 어플리케이션의 일생주기 동안에 간주되는(속하는) 모든 데이터들을 유지해야 하는가?
// How do I handle modification of such data?
// 어떻게 내가 이와 같은 데이터를 다루어야 하는가?
// How do I propagate modifications to all parts of my application?
// 어떻게 내가 내 어플리케이션의 모든 일부들에게 수정사항을 전파해야 하는가?

// Here comes Redux.
// 여기 Redux가 있다.

// Redux (https://github.com/rackt/redux) is a "predictable state container for JavaScript apps"
// Redux (https://github.com/rackt/redux)는 하나의 "자바스크립트 앱들에 대해 예측 가능한 상태(를 관리하는 또는 저장하는 - 의역) 컨테이너이다."

// Let's review the above questions and reply to them with
// 위의 물음들에 대해 리뷰를 해보고 그것들을 함께 적용해 보자.
// Redux vocabulary (flux vocabulary too for some of them):
// Redux 용어(flux 용어도 그것들중 일부는 동일하다)

// Where do I keep all the data regarding my application along its lifetime?
// 어느 곳에서 내가 내 어플리케이션의 일생주기 동안에 간주되는(속하는) 모든 데이터들을 유지해야 하는가?
//     You keep it the way you want (JS object, array, Immutable structure, ...).
//     너는 너가 원하는 방법대로 그것을 유지한다.(JS 객체, 배열, 변경불가능한 구조, ...).
//     Data of your application will be called state. This makes sense since we're talking about
//     너의 어플리케이션의 데이터는 상태로 불리어질 것이다. 이것은 우리가 모든 어플리케이션의 데이터는 시간이 지날 수록 진화한다는점에 관해
//     all the application's data that will evolve over time, it's really the application's state.
//     이야기를 나눌때 맞는 말이다. 그것은 실제로 어플리케이션의 상태이다.
//     But you hand it over to Redux (Redux is a "state container", remember?).
//     그러나 너는 그것을 Redux에 제출한다. (Redux는 하나의 "상태 컨테이너"이다, 기억하는가?).
// How do I handle data modifications?
// 어떻게 데이터 수정들을 내가 다룰수 있을까?
//     Using reducers (called "stores" in traditional flux).
//     reducers를 사용하는 것(전통적인 flux에서는 "stores"로 불린다.)
//     A reducer is a subscriber to actions.
//     하나의 reducer는 액션들을 위한 구독자다.
//     A reducer is just a function that receives the current state of your application, the action,
//     하나의 reducuer는 단지 하나의 함수인데 너의 어플리케이션의 현재 상태 그리고 액션을 받는 함수이다.
//     and returns a new state modified (or reduced as they call it)
//     그리고 하나의 새로운 변경된 상태를 리턴한다. (또는 그들이 그것을 호출했을때 감소되는)
// How do I propagate modifications to all parts of my application?
// 어떻게 나는 내 어플리케이션의 모든 일부들에게 변경사항들을 전파할 수 있을까?
//     Using subscribers to state's modifications.
//     상태의 변경들에 대해서 구독자들을 사용하는 것.

// Redux ties all this together for you.
// Redux 너에게 이 모든 것을 함께 묶어 준다.
// To sum up, Redux will provide you:
// 요약하지면, Redux는 너에게 아래의 사항들을(의역) 제공할 것이다.
//     1) a place to put your application state
//     1) 어플리케이션의 상태를 추가(넣는) 하나의 장소
//     2) a mechanism to dispatch actions to modifiers of your application state, AKA reducers
//     2) 너의 어플리케이션 상태의 변경자들을 위해 액션을 처리할 수 있는 하나의 메커니즘, reducers라고 알려진
//     3) a mechanism to subscribe to state updates
//     3) 상태의 업데이트들에 대해 구독할 수 있는 메커니즘

// The Redux instance is called a store and can be created like this:
// Redux 인스턴스는 store라고 불린다. 그리고 이렇게 생성될 수 있다.
/*
    import { createStore } from 'redux'
    var store = createStore()
*/

// But if you run the code above, you'll notice that it throws an error:
// 그러나 만약 너가 위의 코드를 실행한다면, 너는 그것이 던지는 에러에 대한 공지를 볼 것이다.(알림을 받을 것이다)
//     Error: Invariant Violation: Expected the reducer to be a function.
//     Error: 변치않는 위반: 리듀서는 하나의 함수여야 할 것으로 예상된다.

// That's because createStore expects a function that will allow it to reduce your state.
// 이것은 createStore가 너의 상태를 reduce하기 위한 하나의 함수를 기대하기 때문이다.

// Let's try again
// 다시 시도해 보자.

import { createStore } from 'redux'

var store = createStore(() => {})

// Seems good for now...
// 지금은 괜찮아 보이네...

// Go to next tutorial: 03_simple-reducer.js
// 다음 튜토리얼로 가자: 03_simple-reducer.js
