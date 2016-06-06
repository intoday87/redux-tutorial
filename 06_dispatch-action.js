// Tutorial 06 - dispatch-action.js

// So far we've focused on building our reducer(s) and we haven't dispatched any of our own actions.
// 지금까지 우리는 우리의 reducer(들)을 형성하는데 초점을 맞추었다. 그리고 우리는 어떠한 우리가 소유한 액션들에 대해서 수행(dispatch)한 적이 없다
// We'll keep the same reducers from our previous tutorial and handle a few actions:
// 우리는 이전 튜토리얼에서의 같은 reducer들을 유지할 것이다. 그리고 몇몇 액션들을 다룰 것이다.

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
var store_0 = createStore(reducer)


console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// Let's dispatch our first action... Remember in 'simple-action-creator.js' we said:
// 우리의 첫번째 액션을 수행하도록 해보자...  우리가 'simple-action-creator.js'에서 말했었던것을 기억해라.
//     "To dispatch an action we need... a dispatch function." Captain obvious
//     "우리가 필요로 하는 하나의 액션을 수행하기 위해서... 하나의 수행(dispatch) 함수." 당연한 사실

// The dispatch function we're looking for is provided by Redux and will propagate our action
// 우리가 찾고 있는 그 수행 함수는 Redux에 의해서 제공된다. 그리고 우리의 액션을 전파할 것이다.
// to all of our reducers! The dispatch function is accessible through the Redux
// 모든 reducer들 에게! 그 수행 함수는 Redux 인스턴스 프로퍼티인
// instance property "dispatch"
// "dispatch"를 통해 접근이 가능하다.

// To dispatch an action, simply call:
// 하나의 액션을 수행하기 위해서, 단순하게 호출해라:

store_0.dispatch({
    type: 'AN_ACTION'
})
// Output:
// userReducer was called with state {} and action { type: 'AN_ACTION' }
// userReducer는 상태 {}와 action { type: 'AN_ACTION' }으로 호출되었다.
// itemsReducer was called with state [] and action { type: 'AN_ACTION' }
// itemsReducer 상태 {}와 action { type: 'AN_ACTION' }으로 호출되었다.

// Each reducer is effectively called but since none of our reducers care about this action type,
// 각각 reducer는 효과적으로 호출되었다. 그러나 이 액션 타입에 대해 신경쓰는 reducer들은 아무도 없기 때문에
// the state is left unchanged:
// 그 상태는 변하지 않은채로 남아있다.

console.log('store_0 state after action AN_ACTION:', store_0.getState())
// Output: store_0 state after action AN_ACTION: { user: {}, items: [] }

// But, wait a minute! Aren't we supposed to use an action creator to send an action? We could indeed
// 그러나, 잠깐 기다려보라! 우리는 하나의 액션을 보내기 위해서 액션 생성자(action creator)를 사용하기로 하지 않았었나? 우리는 실제로
// use an actionCreator but since all it does is return an action it would not bring anything more to
// 하나의 액션 생성자를 사용한다. 그러나 그것이 하는 전부는 액션 하나를 리턴하는 것이기 때문에 그것은 이상 어떤것도 이 예제에  
// this example. But for the sake of future difficulties let's do it the right way according to
// 가져다 주지 않는다. 그러나 미래의 어려운점들에 당연하게도 우리를 올바른 방법으로 flux 이론에 따라 움직이게
// flux theory. And let's make this action creator send an action we actually care about:
// 해준다. 그리고 우리가 실제로 신경을 쓰는 하나의 액션을 보내는 이 액션 생성자를 만들도록 해보자.

var setNameActionCreator = function (name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}

store_0.dispatch(setNameActionCreator('bob'))
// Output:
// userReducer was called with state {} and action { type: 'SET_NAME', name: 'bob' }
// itemsReducer was called with state [] and action { type: 'SET_NAME', name: 'bob' }

console.log('store_0 state after action SET_NAME:', store_0.getState())
// Output:
// store_0 state after action SET_NAME: { user: { name: 'bob' }, items: [] }

// We just handled our first action and it changed the state of our application!
// 우리는 단지 이 첫 번째 액션을 다루었다 그리고 그것은 우리 어플리케이션의 상태를 바꾸게끔 했다!

// But this seems too simple and not close enough to a real use-case. For example,
// 그러나 이것은 매우 단순해 보인다 그리고 충분히 실제 use-case에 와 닿지 못한다. 예를 들어,
// what if we'd like do some async work in our action creator before dispatching
// 만약 우리가 이 액션을 수행하기(dispatching) 전에 우리의 액션 생성자에서 비동기 작업을 수행하기를 
// the action? We'll talk about that in the next tutorial "dispatch-async-action.js"
// 원한다면? 우리는 다음 튜토리얼인 "dispatch-async-action.js"에서 이야기를 나누어 볼 것이다.

// So far here is the flow of our application
// 지금 까지는 우리 어플리케이션의 흐름이
// ActionCreator -> Action -> dispatcher -> reducer

// Go to next tutorial: 07_dispatch-async-action-1.js
// 다음 튜토리얼로 가라: 07_dispatch-async-action-1.js
