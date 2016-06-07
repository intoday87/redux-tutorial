// Tutorial 08 - dispatch-async-action-2.js

// Let's try to run the first async action creator that we wrote in dispatch-async-action-1.js.
// dispatch-async-action-1.js에서 우리가 썼었 첫 번째 비동기 액션 생성자를 돌려보자.

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    speaker: function (state = {}, action) {
        console.log('speaker was called with state', state, 'and action', action)

        switch (action.type) {
            case 'SAY':
                return {
                    ...state,
                    message: action.message
                }
            default:
                return state;
        }
    }
})
var store_0 = createStore(reducer)

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}

console.log("\n", 'Running our async action creator:', "\n")
store_0.dispatch(asyncSayActionCreator_1('Hi'))

// Output:
//     ...
//     /Users/classtar/Codes/redux-tutorial/node_modules/redux/node_modules/invariant/invariant.js:51
//         throw error;
//               ^
//     Error: Invariant Violation: Actions must be plain objects. Use custom middleware for async actions.
//     ...

// It seems that our function didn't even reach our reducers. But Redux has been kind enough to give us a
// 우리의 함수는 심지어 우리 reducer들에게 전달이 안된 것처럼 보인다. 그러나 Redux는 ㅊ우리에게 하나의 천절한 팁을 줄만큼 친절 했다.
// tip: "Use custom middleware for async actions.". It looks like we're on the right path but what is this
// "비동기 액션들에 대핸 커스텀 미들웨어를 사용해라.". 우리는 올바른 길을 가고 있는 것 같다. 그러나 미들 웨어라는 
// "middleware" thing?
// 것은 무엇인가?

// Just to reassure you, our action creator asyncSayActionCreator_1 is well-written and will work as expected
// 단지 너에게 재확신시키기 위해서, 우리의 액션 생성자 asyncSayActionCreator_1는 잘쓰여진 것이다. 그리고 우리가 예상했던 것 처럼 
// as soon as we've figured out what middleware is and how to use it.
// 미들웨어가 무엇인지 그리고 어떻게 사용하는지 알게되면 작동할 것이다. 

// Go to next tutorial: 09_middleware.js
// 다음 튜토리얼로 가라: 09_middleware.js
