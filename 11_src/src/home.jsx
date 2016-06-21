// Tutorial 12 - Provider-and-connect.js

// Our tutorial is almost over and the only missing piece to leave you with a good overview of Redux is:
// 우리의 튜토리얼은 이제 거의 끝났다 그리고 너에게 Redux에 대한 좋은 개관과 함께 남겨놓으려는 유일하게 놓친 조각은:
// How do we read from our store's state and how do we dispatch actions?
// 어떻게 store의 상태로부터 우리는 읽을 것인가 그리고 어떻게 액션을 dispatch 하나?

// Both of these questions can be answered using a single react-redux's binding: connect.
// 이 두 질문은 하나의 react-redux의 바인딩을 사용함으로써 해답이될 수 있다.: connect.

// As we previously explained, when using the Provider component we allow all components of our app to
// 우리가 이전에 설명한것에 따르면, Provider 컴포넌트를 사용할 때 우리는 우리의 앱의 모든 컴포넌트를 Redux에 접근하는 것을
// access Redux. But this access can only be made through the undocumented feature "React's context". To
// 허용한다. 그러나 이 접근은 오직 문서화되지 않은 특징인 "React의 context"를 통해서 할 수 있다.
// avoid asking you to use such a "dark" React API, React-Redux is exposing a function that you can use
// "어둠의" React API를 사용하라고 너에게 말하는 것을 피하기 위해서, React-Redux는 컴포넌트 클래스에서 사용할 수 있는 하나의 함수를
// on a component class.
// 노출시키고 있다.

// The function we're talking about is "connect" and it allows to literally connect your component with your Redux's store.
// 우리가 이야기하고 있는 그 함수는 "connect"이다 그리고 그것은 문자 그대로 너의 컴포넌트를 Redux의 store와 연결한다.
// By doing so, it provides your store's dispatch function through a component's prop and also adds any
// 그렇게해서, 그것은 너의 store의 수행 함수(dispatch function)을 컴포넌트의 prop으로 제공하다 그리고 또한 어떤
// properties you want to expose as part of your store's state.
// 것이라면 너의 store의 상태의 일부로 노출시키기를 원하는 어떤 프로퍼티들이든 마찬가지로 prop에 더할 수 있다.

// Using "connect", you'll turn a dumb component into a smart component with very little code overhead
// "connect"를 사용하면서, 너는 하나의 벙어리 컴포넌트를 스마트한 컴포넌트로 아주 적은 코드 오버헤드와 함께 변모시킬 수 있다.
// (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

// "connect" is a function that takes as parameters few mapping functions and that returns a function expecting
// "connect"는 하나의 함수인데 몇몇 매핑 함수들을 파라미터로 취한다 그리고 너가 연결하기를 원하는 실제 컴포넌트 클래스를 기대하는
// the actual component class you want to connect. Such a function (connect) is called a Higher Order Component (HOC).
// 하나의 함수를 리턴한다. 이와 같은 함수(connect)는 하나의 고도화 컴포넌트(Higher Order Component)(HOC)라고 불린다.
// Higher Order functions comes from a functional pattern designed to add features / behaviors to
// 고도화(Higher Order) 함수는 특징들과 행동들을 상속없이 그들의 입력들(component, store, ...)에 더하기 위해서 디자인된
// their inputs (component, store, ...) without using inheritance. This approach favors composition over inheritance
// 하나의 함수적 패턴으로부터 온다. 이 접근은 React 어플리케이션을 빌드하기위한 방법으로 선호되는 상속 보다는 컴포지션을 선호하는
// which is the prefered way to build React applications (actually this is not limited at all to React applications).
// 방식이다.(실제로 이것은 React 어플리케이션들에 적어도 제한된 것은 아니다.)
// Read more about HOCs and composition here:
// HOCs 그리고 컴포지션에 관해 여기서 더 읽어보아라:
// - https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.lpp7we7mx
// - http://natpryce.com/articles/000814.html

// The "connect" HOC is designed to address all use-cases, from the most simple to the most
// 그 "connect" HOC는 모든 경우를 다 섭렵하기위해 디자인 되었다, 가장 단순한 것으로부터 가장 복잡한
// complex ones. In the present example, we're not going to use the most complex form of 'connect' but
// 것이 나오 듯이.
// you can find all information about it in the complete 'connect' API documentation here:
// 너는 여기 완성된 'connect' API 문서에서 그것에 관한 모든 정보를 찾을 수 있을 것이다.
// https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

// Here is the complete 'connect' signature:
// 여기 완성된 'connect' 서명이 있다:
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// and here is how you're supposed to use it:
// 그리고 여기에는 어떻게 너가 그것을 사용하기로 되어 있는지 나와 있다:
/*
  const wrappedComponentClass = connect(...)(ComponentClass)
*/

// We will only focus here on the first 'connect' parameter: mapStateToProps...
// 우리는 오직 초점을 맞출 것이다. 첫 번째 'connect' 파라미터: mapStateToProps...

// "connect" takes, as its first parameter, a function that will select which slice of your
// "connect" 그것의 첫 번째 파라미터로, 하나의 함수를 취하는데 그것은 너가 너의 컴포넌트에 어떤 상태의 조각을 노출시키기를 원하는지
// state you want to expose to your component. This function is logically called a "selector" and
// 선택할 것이다. 이 함수는 논리적적으로 하나의 "선택자"라고 불린다 그리고
// receives 2 parameters: the state of your store and the current props of your component.
// 두 개의 파라미터를 받는다: 너의 store의 상태 그리고 너의 컴포넌트의 현재 상태.
// You'll see below that we named this function "mapStateToProps". This name is just a semantic name
// 너는 아래에서 볼 것이다. 우리는 이 함수의 이름을 "사상한다 상태에서 프로퍼티로". 이 이른은 꽤 시맨틱한(쓰여진 그대로 의미를 나타내는) 이름인데  
// for our function that clearly expresses what the function does: it maps (read "extracts some of")
// 우리의 함수에 대해세ㅓ 명확하게 그 함수가 하는 것을 표현한다:
// the state to a few component props.
// 그것은 상태에서 몇 컴포넌트의 프로퍼트들로.
// The props of the component are also provided as arguments to handle common cases like extracting a slice of your
// 컴포넌트의 프로퍼티들은 또한 인자들로 제공되는데 프로퍼트 값에 대해 의존성을 갖는 너의 상태의 조각을 추출해내는 흔한 경우를 다루기 위해서다. 
// state depending on a prop value (Ex: state.items[props.someID]).
// (Ex: state.items[props.someID]).
// "mapStateToProps" is expected to return the props that you wish to expose to your component (usually via
// "mapStateToProps"는 너가 너의 컴포넌트에 노출하기를 바라는 프로퍼티들을 반환하도록 되어있다. (보통은 객체리터럴을 경유해서).
// an object literal). It's up to you to eventually transform the state you're receiving before returning it.
// 그것은 결국에는 너가 받는 상태를 돌려주기전에 변환하는 것은 결국에 너에게 달려있다.
// You can have a look right at that simplest 'connect' usage below (just after the component class definition).
// 너는 가장 단순한 'connect'의 사용에 대한 예를 바로 아레에서 볼 수 있다.(단지 컴포넌트 클래스 정의 후에).

import React from 'react'
import { connect } from 'react-redux'
// We use the same ES6 import trick to get all action creators and produce a hash like we did with
// 우리는 모든 액션 생성자들을 가져오기 위해서 그리고 우리가 우리의 Reducer들과 함께 했었던 것과 같은 해시를 생성하기 위해 같은 ES6 트릭을
// our reducers. If you haven't yet, go get a look at our action creator (./action-creators.js).
// 사용한다. 만약 너가 아직 안해봤다면, 가서 우리의 액션 생성자를 봐라 (./action-creators.js).
import * as actionCreators from './action-creators'

class Home extends React.Component {
  onTimeButtonClick (delay) {
    // This button handler will dispatch an action in response to a click event from a user.
    // 이 버튼 핸들러는 한 액션을 수행할 것이다. 사용자의 클릭 이벤트에 대한 응답으로.
    // We use here the dispatch function "automatically" provided by connect in a prop.
    // 우리는 여기서 connect가 prop안에서 "자동적으로" 제공된 수행 함수(dispatch function)을 사용한다.
    // There are alternative ways to call actionCreators that are already bound to dispatch and those
    // 수행(dispatch)하기 위해 이미 제한된 액션 생성자들을 호출하기위한 대안적인 방법이 있다 그리고 이것은 두 번째
    // imply providing the second parameter to 'connect':
    // 파라마터 'connect'를 제공하는 것을 암시한다:
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
    // The "delay" value given to actionCreators.getTime is a delay to simulate an async work being done before we
    // actionCreators.getTime에 주어지는 "delay" 값은 우리가 현재 시간에 얻게 할 수 있는것 전에 하나의 비동기 작업이 행해지는 것을
    // are able to get the current time. Try to change this value to verify that the delay correctly impacts our UI.
    // 가장하기 위한 값이다. 그 지연이 정확하게 우리의 UI에 영향을 미치는지 검증하기 위해서 이 값을 바꾸는 것을 시도해봐라.
    this.props.dispatch(actionCreators.getTime(delay))
  }
  render () {

    // Thanks to "connect", we're able to get specific selected data, through the props.
    // "connect" 덕분에, 우리는 명확하게 선택된 데이터 값을 얻을 수 있게 된다. 그 props를 통해서.
    var { frozen, time, reduxState } = this.props
    var attrs = {}
    const DELAY = 500 // in ms //원본 77번째 라인

    if (frozen) {
        attrs = {
          disabled: true
        }
    }

    return (
      <div>
        <h1>Provider and connect example</h1>
        <span>
          <b>What time is it?</b> { time ? `It is currently ${time}` : 'No idea yet...' }
        </span>
        <br /> <br />
        <i>
          When clicking the button below, the time will be provided after a {DELAY}ms delay.<br />
          아래의 버튼을 클릭했을때, 그 시간은 {DELAY}ms 지연 후에 제공될 것이다.<br />
          Try to change this value (in <b>src/home.jsx - line 120</b>) to verify that the delay given correctly impacts our UI.
          이 값을 바꾸도록 시도해 봐라 (src/home.jsx - line 120에서) 그 지연이 정확하게 우리의 UI에 영향을 미치는지 검증하기 위해서.
        </i>
        <br />
        {/* We register our button "onClick" handler here: */}
        {/* 우리는 우리의 버튼 "onClick" 핸들러를 여기서 등록한다: */}
        <button { ...attrs } onClick={() => this.onTimeButtonClick(DELAY)}>Get time!</button>
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
      </div>
    )
  }
}

// This is our select function that will extract from the state the data slice we want to expose
// 이것은 우리의 select 함수인데 우리의 컴포넌트에서 props를 통해서 우리가 노출시키기를 원하는 데이터 조각의 상태를 
// through props to our component.
// 추출할 것이다.
const mapStateToProps = (state/*, props*/) => {
  return {
    frozen: state._time.frozen,
    time: state._time.time,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome

// You might have noticed that thanks to redux, while we have a dynamic component that requires some state (to keep
// the current time), this state is by no mean present inside the component. Our component only receives props with
// needed data.
// What we have here is called a stateless component. You should always try to have more stateless components (presented
// above as dumb components) in your applications than stateful ones because they are much more reusable.
// As suggested in "onTimeButtonClick" handler, we could even go further by passing our click callback as a prop
// via "connect" second parameter "mapDispatchToProps". Doing so, we would extract our button behavior outside of
// our component, making it even more reusable by allowing for a different click behavior.
// Reusability might seem like a fancy overused concept but what having a reusable component also means, is that it's
// one component that can be very easily tested (because you can then inject in your component whatever data and
// test handlers you want and easily ensure its correct behavior).

// Before going to ./12_final-words.js, read this side-note about an alternative way to use "connect" HOC...

// Because connect(...) returns a function that accept a class and returns another class, you can use it as
// an ES7 decorator if you want to. Decorators are an experimental ES7 features that make it possible to annotate
// and modify classes and properties at design time (https://github.com/wycats/javascript-decorators).

// This feature being experimental, it is subject to change and breakage. This means that by using it today, you must be
// fully aware of and accept the uncertainty regarding its evolution. Decorators provide syntax sugar to write the
// code above slightly differently. Instead of writing:

/*
  class MyClass {}
  export default somedecorator(MyClass)
*/

// You can write:

/*
  @somedecorator
  export default class MyClass {}
*/

// Applying this syntax to redux connect, you can replace:

/*
  let mapStateToProps = (state) => { ... }
  class MyClass {}
  export default connect(mapStateToProps)(MyClass)
*/

// by:

/*
  let mapStateToProps = (state) => { ... }
  @connect(mapStateToProps)
  export default class MyClass {}
*/

// As you can see the application of the HOC function on the component class is now made implicit ( @connect(mapStateToProps) )
// instead of calling it ourselves ( @connect(mapStateToProps)(Myclass) ). Some find this approach more elegant, others
// dislike the fact that it's hiding what is really happening and many just don't get how decorators works. Knowing all that
// and remembering that decorators are still experimental, you can now decide by youselves which "connect" usage you
// prefer and you won't be suprised to find both syntax in the many articles, tutorials, starter kits, etc. out there.

// Go to ./12_final-words.js for our last advice about what to do now...
