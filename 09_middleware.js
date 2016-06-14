// Tutorial 09 - middleware.js

// We left dispatch-async-action-2.js with a new concept: "middleware". Somehow middleware should help us
// 우리는 dispatch-async-action-2.js에서 새로운 컨셉을 남겨놨다: "미들웨어". 어떻게 미들웨어는 비동기 액션 핸들링을 해결하기
// to solve async action handling. So what exactly is middleware?
// 위해 우리를 도울 수 있나. 그래서 정확히 미들웨어는 뭘까?

// Generally speaking middleware is something that goes between parts A and B of an application to
// 일반적으롬 말하자면 미들웨어는 어플리케이션에서 부품(모듈, 컴퍼넌트인 듯) A와 B사이의
// transform what A sends before passing it to B. So instead of having:
// A가 B로 건내주기 위한 무엇을 변형하기위한 것이다. 그래서 가지는 것 대신에:
// A -----> B
// we end up having
// 우리는 결국 가진다.
// A ---> middleware 1 ---> middleware 2 ---> middleware 3 --> ... ---> B

// How could middleware help us in the Redux context? Well it seems that the function that we are
// 어떻게 미들웨어는 Redux 문맥(context)안에서 우리를 도울 수 있을까? 음 그것은 우리가 비동기 액션 생성자로부터
// returning from our async action creator cannot be handled natively by Redux but if we had a
// 리턴한 그 함수는 선천적으로 Redux에 의해서 다루어질 수 없다. 그러나 만약 우리가 액션 생성자와 우리의 reducer들
// middleware between our action creator and our reducers, we could transform this function into something
// 사이에 미들웨어를 가진다면, 우리는 이 함수를 Redux에 알맞은 어떤 것으로 변형할 수 있다.
// that suits Redux:

// action ---> dispatcher ---> middleware 1 ---> middleware 2 ---> reducers

// Our middleware will be called each time an action (or whatever else, like a function in our
// 우리의 미들웨어는 매시간 호출될 것이다. 하나의 액션(또는 뭐든지 간에, 우리 비동기 액션 생성자의 경우 하나의 함수)
// async action creator case) is dispatched and it should be able to help our action creator
// 은 수행된다 그리고 그것은 우리의 액션 생성자가 실제 액션을 그것이 원할 때 수행할 수 있도록
// dispatch the real action when it wants to (or do nothing - this is a totally valid and
// 돕는다(또는 아무것도 하지 않는다 - 이것은 하나의 전체적으로 유효하고
// sometimes desired behavior).
// 때때로 바람직한 행동이다).

// In Redux, middleware are functions that must conform to a very specific signature and follow
// Redux에서, 미들웨어는 함수들인데 반드시 매우 명확한 서명을 확인하고
// a strict structure:
// 엄격한 구조를 따른다:
/*
    var anyMiddleware = function ({ dispatch, getState }) {
        return function(next) {
            return function (action) {
                // your middleware-specific code goes here
                // 너의 미들웨어의 구체적인 코드는 여기에
            }
        }
    }
*/

// As you can see above, a middleware is made of 3 nested functions (that will get called sequentially):
// 너가 위에서 볼 수 있듯이, 미들웨어는 3개의 중첩된 함수들이다 (그것은 순서적으로 호출될 것이다)
// 1) The first level provide the dispatch function and a getState function (if your
// 1) 첫번째 레벨은 수행 함수 그리고 하나의 getState 함수를 제공한다. (만약 너가
//     middleware or your action creator needs to read data from state) to the 2 other levels
//     미들웨어 또는 액션 생성자가 상태로부터 데이터를 읽기를 원한다면) 2 레벨의 다른 함수까지.
// 2) The second level provide the next function that will allow you to explicitly hand over
// 2) 두 번째 레벨은 next 함수를 제공하는데 그것은 너가 너에게 명확하게 변형된 데이터를 다음 미들웨어에게 전달하는 것을
//     your transformed input to the next middleware or to Redux (so that Redux can finally call all reducers).
//     또는 Redux에게 허용한다 (그래서 Redux는 마침내 모든 reducer들을 호출 할 수 있다).
// 3) the third level provides the action received from the previous middleware or from your dispatch
// 3) 세 번째 레벨은 이전의 미들웨어 또는 너의 dispatch로 부터 받은 액션을 제공한다
//     and can either trigger the next middleware (to let the action continue to flow) or process
//     그리고 마찬가지로 그 다음 미들웨어를 호출할 수 있다(그 액션이 흐름을 지속하는 것을 허락하기 위해서) 또는  
//     the action in any appropriate way.
//     액션을 어떤 적당한 방법으로 처리한다.

// Those of you who are trained to functional programming may have recognized above an opportunity
// 함수형 프로그래밍에 훈련된 사람들이라면 아마 위에서 함수적 패턴을 적용할 기회를 엿봤을 것이다.
// to apply a functional pattern: currying (if you aren't, don't worry, skipping the next 10 lines
// :currying (만약 그렇지 않다고 해도 걱정마라, 다음에 오는 10줄을 넘긴다고 해서 redux에 대한 이해도에
// won't affect your redux understanding). Using currying, you could simplify the above function like that:
// 영향을 미치지 않는다.). currying을 사용해서 너는 다음과 같이 저 위의 함수를 단순화 할 수 있다.:
/*
    // "curry" may come any functional programming library (lodash, ramda, etc.)
    // "curry" 아마 함수적 프로그래밍 라이브러리들은 지원할 것이다.(lodash, ramda, etc.)
    var thunkMiddleware = curry(
        ({dispatch, getState}, next, action) => (
            // your middleware-specific code goes here
        )
    );
*/

// The middleware we have to build for our async action creator is called a thunk middleware and
// its code is provided here: https://github.com/gaearon/redux-thunk.
// Here is what it looks like (with function body translated to es5 for readability):

var thunkMiddleware = function ({ dispatch, getState }) {
    // console.log('Enter thunkMiddleware');
    return function(next) {
        // console.log('Function "next" provided:', next);
        return function (action) {
            // console.log('Handling action:', action);
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}

// To tell Redux that we have one or more middlewares, we must use one of Redux's
// Redux에게 우리는 하나 이상의 미들웨어들을 가지고 있다고 말하기 위해서는, 우리는 반드시 Redux의 헬퍼
// helper functions: applyMiddleware.
// 함수들을 사용해야 한다: applyMiddleware.

// "applyMiddleware" takes all your middlewares as parameters and returns a function to be called
// "applyMiddleware"는 파라미터로 모든 너의 미들웨어들을 수용한다 그리고 Redux의 createStore와 함께
// with Redux createStore. When this last function is invoked, it will produce "a higher-order
// 호출될 하나의 함수를 리턴한다. 이 함수가 마지막에 호출 되었을 때, 그것은
// store that applies middleware to a store's dispatch".
// (from https://github.com/rackt/redux/blob/v1.0.0-rc/src/utils/applyMiddleware.js)

// Here is how you would integrate a middleware to your Redux store:

import { createStore, combineReducers, applyMiddleware } from 'redux'

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
// For multiple middlewares, write: applyMiddleware(middleware1, middleware2, ...)(createStore)

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
                return state
        }
    }
})

const store_0 = finalCreateStore(reducer)
// Output:
//     speaker was called with state {} and action { type: '@@redux/INIT' }
//     speaker was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_s.b.4.z.a.x.a.j.o.r' }
//     speaker was called with state {} and action { type: '@@redux/INIT' }

// Now that we have our middleware-ready store instance, let's try again to dispatch our async action:

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            console.log(new Date(), 'Dispatch action now:')
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}

console.log("\n", new Date(), 'Running our async action creator:', "\n")

store_0.dispatch(asyncSayActionCreator_1('Hi'))
// Output:
//     Mon Aug 03 2015 00:01:20 GMT+0200 (CEST) Running our async action creator:
//     Mon Aug 03 2015 00:01:22 GMT+0200 (CEST) 'Dispatch action now:'
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }

// Our action is correctly dispatched 2 seconds after our call the async action creator!

// Just for your curiosity, here is how a middleware to log all actions that are dispatched, would
// look like:

function logMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('logMiddleware action received:', action)
            return next(action)
        }
    }
}

// Same below for a middleware to discard all actions that goes through (not very useful as is
// but with a bit of more logic it could selectively discard a few actions while passing others
// to next middleware or Redux):
function discardMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('discardMiddleware action received:', action)
        }
    }
}

// Try to modify finalCreateStore call above by using the logMiddleware and / or the discardMiddleware
// and see what happens...
// For example, using:
//     const finalCreateStore = applyMiddleware(discardMiddleware, thunkMiddleware)(createStore)
// should make your actions never reach your thunkMiddleware and even less your reducers.

// See http://rackt.org/redux/docs/introduction/Ecosystem.html, section Middlewares, to
// see other middleware examples.

// Let's sum up what we've learned so far:
// 1) We know how to write actions and action creators
// 2) We know how to dispatch our actions
// 3) We know how to handle custom actions like asynchronous actions thanks to middlewares

// The only missing piece to close the loop of Flux application is to be notified about
// state updates to be able to react to them (by re-rendering our components for example).

// So how do we subscribe to our Redux store updates?

// Go to next tutorial: 10_state-subscriber.js
