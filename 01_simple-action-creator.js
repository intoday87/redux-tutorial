// Tutorial 1 - simple-action-creator.js

// We started to talk a little about actions in the introduction but what exactly are those "action creators"
// 우리는 소개에서 약간의 액션에 대한 이야기를 시작했다 그러나 정확하게 이 "액션 생성자들"은 무언인지
// and how are they linked to "actions"?
// 그리고 어떻게 그들이 액션들에 연결이 되는가?

// It's actually so simple that a few lines of code can explain it all!
// 그것들은 실제로 매우 단순하다. 몇 줄의 코드가 그것의 전부를 설명한다.

// The action creator is just a function...
// 그 액션 생성자는 단지 하나의 함수다...
var actionCreator = function() {
    // ...that creates an action (yeah, the name action creator is pretty obvious now) and returns it
    // ...그것은 하나의 액션을 생성한다. (그래, 이름이 action creator라는게 현재는 더 명확해졌다) 그리고 그것(액션)을 리턴한다.
    return {
        type: 'AN_ACTION'
    }
}

// So is that all? yes.
// 그래 이게 전부인가? 그렇다.

// However, one thing to note is the format of the action. This is kind of a convention in flux
// 그러나, 주목할만한 한 가지는 액션에 형식이다. 이것은 flux로부터 오는 convention의 한 종류이다.
// that the action is an object that contains a "type" property. This type allows for further
// 액션은 하나의 object이고 "type" 프로퍼티를 포함한다. 이 type은 나아가
// handling of the action. Of course, the action can also contain other properties to
// 액션을 핸들링하기 위한것을 허용한다, 그 액션은 또한 다른 프로퍼티들을 포함할 수 있는데
// pass any data you want.
// 어떤 데이터든지 너가 원하는 것을 건낼 수 있다.

// We'll also see later that the action creator can actually return something other than an action,
// 우리는 또한 후에 액션 생성자가 실제로 하나의 액션보다 어떤 다른 것을 리턴하는 것을 지켜볼 것이다.
// like a function. This will be extremely useful for async action handling (more on that
// 하나의 함수와 같은것을. 이것은 정말로 유용한것이 될 것이다. 비동기 액션 핸들링에 대한(더 자세한 것은
// in dispatch-async-action.js).
// dispatch-async-action.js안에 있다.)

// We can call this action creator and get an action as expected:
// 우리는 이 액션 생성자를 호출 할 수 있고 그리고 하나의 액션을 취하는 것을 기대할 수 있다:
console.log(actionCreator())
// Output: { type: 'AN_ACTION' }

// Ok, this works but it does not go anywhere...
// 그래, 이것은 동작한다 그러나 그것은 어느 다론 곳으로 가지는 않는다...
// What we need is to have this action be sent somewhere so that
// 우리가 필요한 것은 이 액션이 어느 곳으로 보내지는 것인데
// anyone interested could know that something happened and could act accordingly.
// 관심있는 어느 누구든지 어떤 것이 일어났는지 그리고 그에 맞게 어떤 행동을 할 수 있었는지 알 수 있기 위한 곳으로 말이다.
// We call this process "Dispatching an action".
// 우리는 이 과정을 "액션을 수행하는것(Dispatching an action)"이라고 부른다.

// To dispatch an action we need... a dispatch function ("Captain obvious").
// 우리가 필요로 하는 하나의 액션을 수행하기 위해서... 하나의 수행 함수(dispatch function)("Captain obvious" - 당연한 사실을 말하는 사람을 비꼬는 표현).
// And to let anyone interested know that an action happened, we need a mechanism to register
// 그리고 그 액션에 관심있는 어느 누구에게 하나의 액션이 일어났다고 알려주기 위해서, 우리는 "핸들러"를 등록하기위한 하나의 매커니즘을 필요로한다.
// "handlers". Such "handlers" to actions in traditional flux application are called stores and
// 액션들을 위한 이와 같은 전통적인 flux 어플리케이션의 "핸들러들"은 stores로 불리워 진다 그리고
// we'll see in the next section how they are called in redux.
// 우리는 다음 섹션에서 어떻게 redux에서 그들이 호출되는지를 보게될 것이다.

// So far here is the flow of our application:
// 지금까지 우리 어플리케이션의 흐름은 
// ActionCreator -> Action

// Read more about actions and action creators here:
// 액션 생성자들에 대해 더 자세한것은 아래를 읽어보아라.
// http://rackt.org/redux/docs/recipes/ReducingBoilerplate.html

// Go to next tutorial: 02_about-state-and-meet-redux.js
