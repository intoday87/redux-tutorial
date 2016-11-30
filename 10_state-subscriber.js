// Tutorial 10 - state-subscriber.js

// We're close to having a complete Flux loop but we still miss one critical part:
// 우리는 Flux의 순환을 끝낼때가 가까이 왔다 그러나 우리는 여전히 핵심적인 한 부분을 놓치고 있다:

//  _________      _________       ___________
// |         |    | Change  |     |   React   |
// |  Store  |----▶ events  |-----▶   Views   |
// |_________|    |_________|     |___________|

// Without it, we cannot update our views when the store changes.
// 그것 없이는, 우리는 스토어가 변했을 때 우리의 뷰들을 업데이트 할 수 없다.

// Fortunately, there is a very simple way to "watch" over our Redux store's updates:
// 불행하게도, Redux의 스토어 업데이트에 대해 "감시(watch)"할 수 있는 매우 단순한 방법이 있다:

/*
    store.subscribe(function() {
        // retrieve latest store state here
        // 최신 스토어 상태를 여기서 가져온다.
        // Ex:
        console.log(store.getState());
    })
*/

// Yeah... So simple that it almost makes us believe in Santa Claus again.
// 좋아.. 매우 단순하다. 그것은 거의 우리를 산타클로스가 있다고 다시금 믿게 만들고 있다.

// Let's try this out:
// 이것을 시도해 보자:

import { createStore, combineReducers } from 'redux'

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

var reducer = combineReducers({ items: itemsReducer })
var store_0 = createStore(reducer)

store_0.subscribe(function() {
    console.log('store_0 has been updated. Latest store state:', store_0.getState());
    // Update your views here
})

var addItemActionCreator = function (item) {
    return {
        type: 'ADD_ITEM',
        item: item
    }
}

store_0.dispatch(addItemActionCreator({ id: 1234, description: 'anything' }))

// Output:
// 결과:
//     ...
//     store_0 has been updated. Latest store state: { items: [ { id: 1234, description: 'anything' } ] }
//     store_0은 업데이트 되었다. 최신 스토어 상태: { items: [ { id: 1234, description: 'anything' } ] }

// Our subscribe callback is correctly called and our store now contains the new item that we added.
// 우리의 구독자 콜백은 정확하게 호출되었다. 그리고 우리의 스토어는 현재 우리가 더 했던 새로운 아이템을 포함한다.

// Theoretically speaking we could stop here. Our Flux loop is closed, we understood all concepts that make
// 이론적으로 우리가 여기서 멈출 수 있다고 말하는것은. 우리의 Flux 순환은 닫혀있고. 우리는 Flux를 만드는 모든 컨셉을 이해하며
// Flux and we saw that it is not that much of a mystery. But to be honest, there is still a lot to talk
// 그리고 우리가 그것은 더 이상 미스터리가 아니라고 보는 것이다. 그러나 솔직하게, 여전히 더 이야기 할게 많이 있다.
// about and a few things in the last example were intentionally left aside to keep the simplest form of this
// 그리고 마지막 예제에서 몇 가지 것들은 이 마지막 Flux 컨셉의 형태를 가장 단순하게 유지시키기 위해서
// last Flux concept:
// 잠재적으로 한켠에 남아 있다.:

// - Our subscriber callback did not receive the state as a parameter, why?
// - 우리의 구독자 콜백은 상태를 파라미터로 받지 않는다. 왜?
// - Since we did not receive our new state, we were bound to exploit our closured store (store_0) so this
// - 우리가 새로운 상태를 받지 않았기 때문에, 우리는 우리의 폐쇠된 스토어(store_0)을 이용하도록 한정되어 있다. 그래서
//     solution is not acceptable in a real multi-modules application...
//     이 해결책은 실제 멀티-모듈들 어플리케이션에서는 받아들여 질 수 없다...
// - How do we actually update our views?
// - 어떻게 우리는 실제로 우리의 뷰들을 업데이트 하나?
// - How do we unsubscribe from store updates?
// - 어떻게 우리는 스토어의 업데이트들로 부터 구독해제를 하나?
// - More generally speaking, how should we integrate Redux with React?
// - 좀 더 일반적으로 말하면, 어떻게 우리는 Redux와 React를 통합할 수 있을까?

// We're now entering a more "Redux inside React" specific domain.
// 우리는 지금 좀 더 "React안의 Redux"라는 구체적인 도메인에 들어가고 있다.

// It is very important to understand that Redux is by no means bound to React. It is really a
// Redux가 React에 한정되는 수단이 아님을 이해하는 것이 매우 중요하다. 그것은 실제로 하나의
// "Predictable state container for JavaScript apps" and you can use it in many ways, a React
// "자바스크립트 앱들을 위한 예측가능한 상태 컨테이너"이고 너는 많은 방법들 속에서 그것을 사용할 수 있다, React
// application just being one of them.
// 어플리케이션은 단지 그 중 하나가 될 뿐이다.

// In that perspective we would be a bit lost if it wasn't for react-redux (https://github.com/rackt/react-redux).
// 그런 관점에서 우리는 아주 조금 손실을 얻을 것이다. 만약 그것이 react-redux에 대한 것이 아니라면 말이다.(https://github.com/rackt/react-redux).
// Previously integrated inside Redux (before 1.0.0), this repository holds all the bindings we need to simplify
// 이전에 Redux(before 1.0.0)에 통합된, 이 repository는 우리가 React안에서 Redux를 이용할 때 우리가 우리의 삶을 단순하게 하는데
// our life when using Redux inside React.
// 필요한 모든 묶음들(bindings)를 가지고 있다.

// Back to our "subscribe" case... Why exactly do we have this subscribe function that seems so simple but at
// 우리의 "subscribe" 경우로 돌아와서... 왜 정확하게 우리는 이 구독자 함수를 매우 단순하다고 여기는가 그러나 동시에
// the same time also seems to not provide enough features?
// 또한 충분한 특징들을 제공하지 않는다고 여기는가?

// Its simplicity is actually its power! Redux, with its current minimalist API (including "subscribe") is
// 그것의 단순함은 실제로 그것의 힘이다! Redux, 그것의 현재의 최소한의 API와 함께 (including "subscribe")
// highly extensible and this allows developers to build some crazy products like the Redux DevTools
//  매우 확장가능하고 그리고 이것은 개발자들에게 몇 Redux 개발툴들과 같이 몇몇 미친 제품들을 빌드할 수 있게 해준다.
// (https://github.com/gaearon/redux-devtools).

// But in the end we still need a "better" API to subscribe to our store changes. That's exactly what react-redux
// 그러나 결국에는 우리는 여전히 우리의 스토어 변화들을 구독하기위한 하나의 "더 나은" API를 필요로 한다. 그것은 정확하게 react-redux가
// brings us: an API that will allow us to seamlessly fill the gap between the raw Redux subscribing mechanism
// 우리에게 가져다 주는 것이다: 하나의 API 그것은 우리에게 균일하게 본 그대로의(raw) Redux 구독자 메커니즘과
// and our developer expectations. In the end, you won't need to use "subscribe" directly. Instead you will
// 그리고 우리의 개발자 기대들 사이에 갭을 매꾸어준다. 대신에 너는
// use bindings such as "provide" or "connect" and those will hide from you the "subscribe" method.
// "provide" 또는 "connect"와 같은 묶음들(bindings)를 사용해라 그리고 이들은 "subscribe" 메소들로 부터 숨겨줄 것이다.

// So yeah, the "subscribe" method will still be used but it will be done through a higher order API that
// 그래 좋다, 그 "subscribe" 메소드는 여전히 사용된다 그러나 그것은 더 높은 순서의 API를 통해서 행해질 것이다.
// handles access to Redux state for you.
// 그 API는 너를 위해서 redux의 접근을 컨트롤 한다.

// We'll now cover those bindings and show how simple it is to wire your components to Redux's state.
// 우리는 이제 이 묶음들(bindings)를 다룰 것이다 그리고 어떻게 단순하게 그것은 너의 컴포넌트들을 redux 상태에 연결(wire)할 것인지 보여줄 것이다.

// Go to next tutorial: 11_Provider-and-connect.js
// 다음 튜토리얼로 가라: 11_Provider-and-connect.js
