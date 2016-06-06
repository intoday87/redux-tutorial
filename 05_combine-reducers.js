// Tutorial 05 - combine-reducers.js

// We're now starting to get a grasp of what a reducer is...
// 우리는 이제 reducer가 무엇인지 개념을 잡기 시작했다.

var reducer_0 = function (state = {}, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)

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

// ... but before going further, we should start wondering what our reducer will look like when
// ... 그러나 더 나아가지 전에, 우리는 reducer가 무엇을 닮고 있는지 의아해 하기 시작할 것이다.
// we'll have tens of actions:
// 우리가 열개의 액션을 가질 때:

var reducer_1 = function (state = {}, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        case 'DO_SOMETHING':
            // ...
        case 'LEARN_SOMETHING':
            // ...
        case 'HEAR_SOMETHING':
            // ...
        case 'GO_SOMEWHERE':
            // ...
        // etc.
        default:
            return state;
    }
}

// It becomes quite evident that a single reducer function cannot hold all our
// 그것은 꽤 확실한 증거가 되었는데 한개의 reducer가 모든 우리 어플리케이션의 액션들에 대한 핸들링을 
// application's actions handling (well it could hold it, but it wouldn't be very maintainable...).
// 수용할 수 없다는 것을(물론 그것은 수용은 할 수 있다. 그러나 그것은 유지하기가 매우 힘들게 될 것이다...).

// Luckily for us, Redux doesn't care if we have one reducer or a dozen and it will even help us to
// 운좋게도, Redux는 한개의 Reducer를 가지든 한 다발을 가지든 신경쓰지 않는다 그리고 그것은 심지어 우리가 그들을 합치는데
// combine them if we have many!
// 도움을 주기까지한다. 만약 우리가 많은 reducer를 가지고 있다면.

// Let's declare 2 reducers
// reducers 2를 선언해 보자.

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}

// I'd like you to pay special attention to the initial state that was actually given to
// 나는 너가 그 실제로 각각의 reducer에게 주어진 초기화 상태에 대해 특별한 관심을 쏟기를 원한다.
// each reducer: userReducer got an initial state in the form of a literal object ({}) while
// :userReducer는 초기화 사태로 리터럴 객체({}) 형태를 가지고 있다. 반면에
// itemsReducer got an initial state in the form of an array ([]). This is just to
// itemReducer는 초기화 상태로 배열([]) 행태를 가지고 있다. 이것은 단지 
// make clear that a reducer can actually handle any type of data structure. It's really
// reducer가 어떤 형태의 데이터 구조를 다룰 수 있는지 실제로 명확하게 만들어준다. 그것은 정말로
// up to you to decide which data structure suits your needs (an object literal, an array,
// 어떤 데이터 구조가 너에게 필요한지 결정하는 것은 너에게 달려있다.(하나의 객체 리터럴이든, 하나의 배열이든,
// a boolean, a string, an immutable structure, ...).
// 불리언이든, 문자열이든, 불변 구조이든, ...).

// With this new multiple reducer approach, we will end up having each reducer handle only
// 
// a slice of our application state.

// But as we already know, createStore expects just one reducer function.

// So how do we combine our reducers? And how do we tell Redux that each reducer will only handle
// a slice of our state?
// It's fairly simple. We use Redux combineReducers helper function. combineReducers takes a hash and
// returns a function that, when invoked, will call all our reducers, retrieve the new slice of state and
// reunite them in a state object (a simple hash {}) that Redux is holding.
// Long story short, here is how you create a Redux instance with multiple reducers:

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
// Output:
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// userReducer was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_9.r.k.r.i.c.n.m.i' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/PROBE_UNKNOWN_ACTION_4.f.i.z.l.3.7.s.y.v.i' }
var store_0 = createStore(reducer)
// Output:
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }

// As you can see in the output, each reducer is correctly called with the init action @@redux/INIT.
// But what is this other action? This is a sanity check implemented in combineReducers
// to assure that a reducer will always return a state != 'undefined'.
// Please note also that the first invocation of init actions in combineReducers share the same purpose
// as random actions (to do a sanity check).

console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// It's interesting to note that Redux handles our slices of state correctly,
// the final state is indeed a simple hash made of the userReducer's slice and the itemsReducer's slice:
// {
//     user: {}, // {} is the slice returned by our userReducer
//     items: [] // [] is the slice returned by our itemsReducer
// }

// Since we initialized the state of each of our reducers with a specific value ({} for userReducer and
// [] for itemsReducer) it's no coincidence that those values are found in the final Redux state.

// By now we have a good idea of how reducers will work. It would be nice to have some
// actions being dispatched and see the impact on our Redux state.

// Go to next tutorial: 06_dispatch-action.js
