// Tutorial 07 - dispatch-async-action-1.js

// We previously saw how we can dispatch actions and how those actions will modify
// 우리는 이전에 어떻게 우리가 액션들을 수행할 수 있는지 보았다 그리고 어떻게 이 액션들이
// the state of our application thanks to reducers.
// reducer들 덕분에 우리의 어플리케이션 상태를 수정할 것인지도 보았다.

// But so far we've only considered synchronous actions or, more exactly, action creators
// 그러나 지금까지 우리는 오직 동기화 액션들을 고려해왔다, 또는, 더 정확하게, 액션 생성자들이
// that produce an action synchronously: when called an action is returned immediately.
// 하나의 동기화적으로 액션들을 생산하는 것을: 호출된 하나의 액션이 즉각적으로 return되었을 때.

// Let's now imagine a simple asynchronous use-case:
// 하나의 단순한 비동기 use-case를 상상해보자:
// 1) user clicks on button "Say Hi in 2 seconds"
// 1) "2초 지난 후에 Hi라고 말해라" 버튼에 대한 사용자의 클릭
// 2) When button "A" is clicked, we'd like to show message "Hi" after 2 seconds have elapsed
// 2) 버튼 "A"가 클릭 되었을때, 우리는 메세지 "Hi"를 2초가 경과한 후에 보여주려고 한다.
// 3) 2 seconds later, our view is updated with the message "Hi"
// 3) 2초 후, 우리의 view는 메세제 "Hi"와 함께 업데이트 된다.

// Of course this message is part of our application state so we have to save it
// 물론 이 메세지는 우리 어플리케이션 상태의 일부이다. 그래서 우리는 그것을 저장해야 한다.
// in Redux store. But what we want is to have our store save the message
// Redux store안에. 그러나 우리가 원하는 것은 우리의 store가 그 메세지를 오직 액션 성성자가 호출된
// only 2 seconds after the action creator is called (because if we were to update our state
// 2초 후에 저장하도록 하는 것이다. (왜냐하면 만약 우리가 우리의 상태를 즉각적으로 업데이트 한다면,
// immediately, any subscriber to state's modifications - like our view -  would be notified right away
// 상태의 수정들에 대한 어떤 구독자가 - 우리의 view와 같은 - 알림을 즉시 받을 것이고
// and would then react to this update 2 seconds too soon).
// 그리고 이 업데이트는 그때 2초도 안되서 너무 일찍 반응할 것이기 때문이다).

// If we were to call an action creator like we did until now...
// 만약 우리가 지금까지 우리가 해왔던것 처럼 하나의 액션 생성자를 호출한다면...

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

var sayActionCreator = function (message) {
    return {
        type: 'SAY',
        message
    }
}

console.log("\n", 'Running our normal action creator:', "\n")

console.log(new Date());
store_0.dispatch(sayActionCreator('Hi'))

console.log(new Date());
console.log('store_0 state after action SAY:', store_0.getState())
// Output (skipping initialization output):
//     Sun Aug 02 2015 01:03:05 GMT+0200 (CEST)
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }
//     Sun Aug 02 2015 01:03:05 GMT+0200 (CEST)
//     store_0 state after action SAY: { speaker: { message: 'Hi' } }


// ... then we see that our store is updated immediately.
// ... 그리고 나서 우리는 우리의 store가 즉각적으로 업데이트된 것을 본다.

// What we'd like instead is an action creator that looks a bit like this:
// 우리가 대신에 원하는 것은 다소 이것과 같은 액션 생성자이다.

var asyncSayActionCreator_0 = function (message) {
    setTimeout(function () {
        return {
            type: 'SAY',
            message
        }
    }, 2000)
}

// But then our action creator would not return an action, it would return "undefined". So this is not
// 그러나 그 때 우리의 액션 생성자는 하나의 액션을 리턴하지 않을 것이다. 그것은 "undefined"를 리턴 할 것이다. 그래서 이것은 
// quite the solution we're looking for.
// 다소 우리가 찾는 해결책은 아니다.

// Here's the trick: instead of returning an action, we'll return a function. And this function will be the
// 여기 속임수가 있다: 하나의 액션을 리턴하는 대신에, 우리는 하나의 함수를 리턴할 것이다. 그리고 이 함수는 액션이 적절한 시기에 액션을 수행 
// one to dispatch the action when it seems appropriate to do so. But if we want our function to be able to
// 하려고 할 때 하나의 액션을 수행하기위한 것이 될 것이다. 그러나 만약 액션을 수행하게될 우리의 함수에 그 수행 함수(dispatch function)
// dispatch the action it should be given the dispatch function. Then, this should look like this:
// 가 주어지기를 원한다면. 그 때, 이것은 아래와 같을 모습일 것이다:

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

// Again you'll notice that our action creator is not returning an action, it is returning a function.
// 다시 너는 알게될 것이다. 액션 생성자는 하나의 액션을 리턴하지 않는다, 그것은 하나의 함수를 리턴한다.
// So there is a high chance that our reducers won't know what to do with it. But you never know, so let's
// 그래서 우리의 reducer가 그것에서 무엇을 하려는지 알아채지 못하는 좋은 기화가 생긴다. 그러나 너는 절대 모른다, 그래서 
// try it out and find out what happens...
// 그것을 시도해 보자 그리고 무엇이 일어나는 지도 알아보아라...

// Go to next tutorial: 08_dispatch-async-action-2.js
// 다음 튜토리얼로 가라: 08_dispatch-async-action-2.js
