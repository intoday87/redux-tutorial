// Tutorial 05 - combine-reducers.js

// We're now starting to get a grasp of what a reducer is...

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
// we'll have tens of actions:

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
// application's actions handling (well it could hold it, but it wouldn't be very maintainable...).

// Luckily for us, Redux doesn't care if we have one reducer or a dozen and it will even help us to
// combine them if we have many!

// Let's declare 2 reducers

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
// each reducer: userReducer got an initial state in the form of a literal object ({}) while
// itemsReducer got an initial state in the form of an array ([]). This is just to
// make clear that a reducer can actually handle any type of data structure. It's really
// up to you to decide which data structure suits your needs (an object literal, an array,
// a boolean, a string, an immutable structure, ...).

// With this new multiple reducer approach, we will end up having each reducer handle only
// 이 새로운 다중 reducer 접근으로, 우리는 결국에 각각의 reducer가 우리 어플리케이션의
// a slice of our application state.
// 한 조각(부분)을 다루게 될 것이다.

// But as we already know, createStore expects just one reducer function.
// 그러나 우리가 이미 알고있듯이, createStore는 단지 하나의 reducer 함수를 기대한다.

// So how do we combine our reducers? And how do we tell Redux that each reducer will only handle
// 그래서 어떻게 우리는 우리의 reducer를 합칠것 인가? 그리고 어떻게 우리는 Redux가 각각의 reducer로 우리 상태의 오직
// a slice of our state?
// 한 조각만을 다룰 수 있다고 말할 수 있는가?
// It's fairly simple. We use Redux combineReducers helper function. combineReducers takes a hash and
// 그것은 꽤 단순하다. 우리는 Redux의 헬퍼 함수인 combineReducers를 사용한다. combineReducers 하나의 해시를 가진다. 그리고
// returns a function that, when invoked, will call all our reducers, retrieve the new slice of state and
// 그 함수를 리턴한다. 호출되었을 때, 모든 우리의 reducer들을 호출할 것이다. 새로운 상태의 조각을 추출하고 그리고
// reunite them in a state object (a simple hash {}) that Redux is holding.
// 그들을 Redux가 유지하고 있는 하나의 상태 객체로 재결합한다.(하나의 단순한 해시 {})
// Long story short, here is how you create a Redux instance with multiple reducers:
// 이야기를 간추려서 짧게 하자면, 여기 어떻게 Redux 인스턴스를 다중 reducers와 함께 생성하는지 있다.

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
// 너가 겨로가에서 보았듯, 각각의 reducer는 정확하게 초기화 액션 @@redux/INIT과 함께 호출 되었다.
// But what is this other action? This is a sanity check implemented in combineReducers
// 그러나 이 다른 액션들은 무엇인가? 이것은 combineReducers에서 구현된 하나의 안전 체크이다.
// to assure that a reducer will always return a state != 'undefined'.
// 하나의 reducer는 언제나 state != 'undefined'를 리턴할 것이라고 확실히하기 위해서. 
// Please note also that the first invocation of init actions in combineReducers share the same purpose
// 부디 또한 주목해라. combineReducers안에서 첫 번째 초기화 액션들의 호출은 랜덤 액션들로서 같은 목적을 공유한다.(안전성 체크를 하기 위한)
// as random actions (to do a sanity check).

console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// It's interesting to note that Redux handles our slices of state correctly,
// Redux가 우리 상태의 조각들을 정확하게 다루는것에 주목하는것은 흥미롭다.
// the final state is indeed a simple hash made of the userReducer's slice and the itemsReducer's slice:
// 초기화 상태는 실재로 단순한 userReducer의 조각 그리고 itemReducer의 조각으로 만들어진 단순한 해시다:
// {
//     user: {}, // {} is the slice returned by our userReducer
//     items: [] // [] is the slice returned by our itemsReducer
// }

// Since we initialized the state of each of our reducers with a specific value ({} for userReducer and
// 명확한 값으로(userReducer는 {} 그리고 itemsReducer는 []) 각각의 우리의 reducer들의 상태를 초기화 했기 때문에 
// [] for itemsReducer) it's no coincidence that those values are found in the final Redux state.
// 최종 Redux 상테에서 발견된 이 값들은 우연이 아니다. 

// By now we have a good idea of how reducers will work. It would be nice to have some
// actions being dispatched and see the impact on our Redux state.

// Go to next tutorial: 06_dispatch-action.js
