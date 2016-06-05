// Tutorial 04 - get-state.js

// How do we retrieve the state from our Redux instance?
// 어떻게 우리는 Redux 인스턴스로부터 상태를 추출할까?

import { createStore } from 'redux'

var reducer_0 = function (state, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)
}

var store_0 = createStore(reducer_0)
// Output: reducer_0 was called with state undefined and action { type: '@@redux/INIT' }

// To get the state that Redux is holding for us, you call getState
// Redux가 우리를 위해서 가지고있는 상태를 가져오기 위해서, 너는 getState를 호출한다.

console.log('store_0 state after initialization:', store_0.getState())
// Output: store_0 state after initialization: undefined
// 결과 : 초기화 이후에 store_0 상태는 : undefined

// So the state of our application is still undefined after the initialization? Well of course it is,
// 그래서 초기화 이 후 우리 어플리케이션의 상태는 여전히 undefined인가? 음 당연하다,
// our reducer is not doing anything... Remember how we described the expected behavior of a reducer in
// 우리 reducer는 아무것도 하지 않고 있다... 기억하는가 어떻게 우리가 "about-state-and-meet-redux"에서 하나의 reducer의 기대되는 행동을
// "about-state-and-meet-redux"?
// 설명했었는지?
//     "A reducer is just a function that receives the current state of your application, the action,
//     "하나의 reducer는 단지 하나의 함수인데 너의 어플리케이션의 현재 상태와 액션을 받는다,
//     and returns a new state modified (or reduced as they call it)"
//     그리고 하나의 수정된 새로운 상태를 리턴한다.(또는 그들이 그것을 부르는 것 처럼 감소된 것을)"
// Our reducer is not returning anything right now so the state of our application is what
// 우리의 reducer는 어떤것도 리턴하고 있지 않다. 지금 그래서 우리 어플리케이션의 상태는
// reducer() returns, hence "undefined".
// reducer() 리턴한 것인데, 결국은 "undefined"이다.

// Let's try to send an initial state of our application if the state given to reducer is undefined:
// 우리 어플리케이션의 하나의 초기화 상태를 보내는 것을 시도해 보자 만약 reducer에거 주어진 상태가 undefined라면:

var reducer_1 = function (state, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)
    if (typeof state === 'undefined') {
        return {}
    }

    return state;
}

var store_1 = createStore(reducer_1)
// Output: reducer_1 was called with state undefined and action { type: '@@redux/INIT' }

console.log('store_1 state after initialization:', store_1.getState())
// Output: store_1 state after initialization: {}

// As expected, the state returned by Redux after initialization is now {}
// 예상했던대로, Redux의 초기화 이후 리턴된 그 상태는 현재 {}이다.

// There is however a much cleaner way to implement this pattern thanks to ES6:
// 그러나 ES6 덕분에 이런 패턴에 더욱 명확한 구현 방법이 있다.

var reducer_2 = function (state = {}, action) {
    console.log('reducer_2 was called with state', state, 'and action', action)

    return state;
}

var store_2 = createStore(reducer_2)
// Output: reducer_2 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_2 state after initialization:', store_2.getState())
// Output: store_2 state after initialization: {}

// You've probably noticed that since we've used the default parameter on state parameter of reducer_2,
// 너는 아마도 알아왔을 것이다 우리가 default 파라미터를 reducer_2에 사용해온 이후로 말이다.
// we no longer get undefined as state's value in our reducer's body.
// 우리는 더 이상 undefined를 reducer의 본체안에서 상태 값으로 얻지 못한다.

// Let's now recall that a reducer is only called in response to an action dispatched and
// 이제 reducer가 오직 수행된 액션에 대한 응답으로만 호출되는것을 회상해보자. 그리고
// let's fake a state modification in response to an action type 'SAY_SOMETHING'
// type이 'SAY_SOMETHING'의 액션에 응답으로 하나의 상태 수정을 가장해보자.

var reducer_3 = function (state = {}, action) {
    console.log('reducer_3 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}

var store_3 = createStore(reducer_3)
// Output: reducer_3 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_3 state after initialization:', store_3.getState())
// Output: redux state after initialization: {}

// Nothing new in our state so far since we did not dispatch any action yet. But there are few
// 아무것도 우리 상태에서 바뀐것은 없다 지금까지 우리는 어떠한 액션도 아직은 수행하지 않았기 때문에. 그러나 몇 가지 중요한
// important things to pay attention to in the last example:
// 주목할만한 것들이 있다 마지막 예제로부터:
//     0) I assumed that our action contains a type and a value property. The type property is mostly
//     0) 나는 우리의 액션이 type과 그에 상응하는 값을 가진 property를 포함한다고 가정했다. 그 type 프로퍼티는 주로
//        a convention in flux actions and the value property could have been anything else.
//        flux 액션들에서의 convention이고 value 프로퍼티는 어떤 것이든지 포함할 수 있다.
//     1) You'll often see the pattern involving a switch to respond appropriately
//     1) 너는 너의 reducer들이 받는 액션에 대해 적절히 상응하는 응답을 줄 수 있도록 switch와 연관된 패턴을
//        to an action received in your reducers
//        종종 보게 될 것이다.
//     2) When using a switch, NEVER forget to have a "default: return state" because
//     2) switch를 사용할 때, 절대로! 잊지마라 default로 state를 항상 리턴하는 것을 왜냐하면
//        if you don't, you'll end up having your reducer return undefined (and lose your state).
//        만약 너가 안그러면, 너는 결국 너의 reducer가 undefined를 리턴하는 것을 겪게 된다.(그리고 너의 상태가 소실된다).
//     3) Notice how we returned a new state made by merging current state with { message: action.value },
//     3) 주목할 것은 어떻게 우리가 새로운 상태를 리턴하는가인데, 현재 상태를 { message: action.value }와 병합해서 말이다,
//        all that thanks to this awesome ES7 notation (Object Spread): { ...state, message: action.value }
//        모든건 이 놀라운 ES7 표기법(Object Spread) 덕분이다: { ...state, message: action.value }
//     4) Note also that this ES7 Object Spread notation suits our example because it's doing a shallow
//     4) 또한 주목해야하는것은 ES7의 Object Spread 표기법은 우리의 예제와도 걸맞는다 왜냐하면 그것은 우리의 상태에 대해 { message: action.value }를
//        copy of { message: action.value } over our state (meaning that first level properties of state
//        얕은 복사를 하고 있기때문이다.(첫 번째 레벨 상태의 프로퍼티들은
//        are completely overwritten - as opposed to gracefully merged - by first level property of
//        완전이 덮어씌워졌다. - 우아하게 머지되는 것과는 반대로 - 첫 번째 레벨 프로퍼티의
//        { message: action.value }). But if we had a more complex / nested data structure, you might choose
//        { message: action.value }에 의해서. 그러나 만약 우리가 더 복잡하고 / 중첩된 데이터 구조를 갖는다면, 넌 아마도 선택해야 할 것이다.
//        to handle your state's updates very differently:
//        너의 상태의 업데이트를 매우 다르게 다루기 위해서.
//        - using Immutable.js (https://facebook.github.io/immutable-js/)
//        - using Object.assign (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
//        - using manual merge
//        - or whatever other strategy that suits your needs and the structure of your state since
//        - 또는 어떤 다른 전략이던지 너의 요구사항에 맞고 너의 상태의 구조에 맞는 것
//          Redux is absolutely NOT opinionated on this (remember, Redux is a state container).
//          Redux는 절대로 이것에 대해 강요하지 않는다.(기억해라, Redux는 그저 하나의 상태 컨테이너일 뿐).

// Now that we're starting to handle actions in our reducer let's talk about having multiple reducers and
// 이제 우리는 액션들을 우리의 reducer안에서 다루기 시작했다 다중 reducer들을 갖는것에 대해 얘기해보고
// combining them.
// 그것들을 묶는 것에 대해서도 얘기해보자.

// Go to next tutorial: 05_combine-reducers.js
