// Tutorial 12 - Provider-and-connect.js

// Our tutorial is almost over and the only missing piece to leave you with a good overview of Redux is:
// 우리의 튜토리얼은 이제 거의 끝났다 그리고 너에게 Redux에 대한 좋은 개관과 함께 남겨놓으려는 유일하게 놓친 조각은:
// How do we read from our store's state and how do we dispatch actions?
// 우리는 어떻게 store의 상태로부터 읽을 것인가 그리고 어떻게 액션을 수행(dispatch) 하나?

// Both of these questions can be answered using a single react-redux's binding: connect.
// 이 두 질문은 하나의 react-redux의 바인딩을 사용하는 것으로 해답이 될 수 있다.: connect.

// As we previously explained, when using the Provider component we allow all components of our app to
// 우리가 이전에 설명한것에 따르면, Provider 컴포넌트를 사용할 때 우리는 우리의 앱의 모든 컴포넌트를 Redux에 접근하도록
// access Redux. But this access can only be made through the undocumented feature "React's context". To
// 허용한다. 그러나 이 접근은 오직 문서화되지 않은 특징인 "React의 context"를 통해서 가능하다.
// avoid asking you to use such a "dark" React API, React-Redux is exposing a function that you can use
// "어둠의" React API를 사용하라고 너에게 말하는 것을 피하기 위해서, React-Redux는 컴포넌트 클래스에서 사용할 수 있는 하나의 함수를
// on a component class.
// 노출하고 있다.

// The function we're talking about is "connect" and it allows to literally connect your component with your Redux's store.
// 우리가 이야기하고 있는 그 함수는 "connect"이다 그리고 그것은 문자 그대로 너의 컴포넌트를 Redux의 store와 연결한다.
// By doing so, it provides your store's dispatch function through a component's prop and also adds any
// 그렇게해서, 그것은 너의 store의 수행 함수(dispatch function)를 컴포넌트의 프로퍼티(prop)으로 제공하다 그리고 또한
// properties you want to expose as part of your store's state.
// 너의 store의 상태의 일부로 노출시키기를 원하는 어떤 프로퍼티들이든지 마찬가지로 프로퍼티(prop)에 더할 수 있다.

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
// 하나의 함수적 패턴으로부터 기인한다. 이 접근은 React 어플리케이션을 빌드하기위한 방법으로 선호되는 상속 보다 컴포지션을 선호하는
// which is the prefered way to build React applications (actually this is not limited at all to React applications).
// 방식이다.(실제로 이것은 전혀 React 어플리케이션들에 제한된 것은 아니다.)
// Read more about HOCs and composition here:
// HOC 그리고 컴포지션에 관해 여기서 더 읽어보아라:
// - https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.lpp7we7mx
// - http://natpryce.com/articles/000814.html

// The "connect" HOC is designed to address all use-cases, from the most simple to the most
// 그 "connect" HOC는 모든 사용자 경우를 다 섭렵하기위해 디자인 되었다, 가장 단순한 것으로부터 가장 복잡한
// complex ones. In the present example, we're not going to use the most complex form of 'connect' but
// 것이 나오 듯이.  현재의 예제에서, 우리는 'connect'의 가장 복잡한 형태를 사용하지는 않을 것이다 그러나
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
// 선택할 것이다. 이 함수는 논리적으로 하나의 "선택자"라고 불린다 그리고
// receives 2 parameters: the state of your store and the current props of your component.
// 두 개의 파라미터를 받는다: 너의 store의 상태 그리고 너의 컴포넌트의 현재 프로퍼티들(props).
// You'll see below that we named this function "mapStateToProps". This name is just a semantic name
// 너는 우리가 이 함수의 이름을 "사상한다 상태에서 프로퍼티들로 - mapStateToProps" 지은 것을 아래에서 볼 것이다. 이 이른은 꽤 시맨틱한(쓰여진 그대로 의미를 나타내는) 이름인데
// for our function that clearly expresses what the function does: it maps (read "extracts some of")
// 우리의 함수에 대해서 명확하게 그 함수가 하는 것을 표현한다:
// the state to a few component props.
// 그것은 상태에서 조금의 컴포넌트의 프로퍼트들로.
// The props of the component are also provided as arguments to handle common cases like extracting a slice of your
// 컴포넌트의 프로퍼티들은 또한 인자들로 제공되는데 프로퍼트 값에 대해 의존성을 갖는 너의 상태의 조각을 추출해내는 흔한 경우를 다루기 위해서다. 
// state depending on a prop value (Ex: state.items[props.someID]).
// (Ex: state.items[props.someID]).
// "mapStateToProps" is expected to return the props that you wish to expose to your component (usually via
// "mapStateToProps"은 너가 너의 컴포넌트에 노출하기를 바라는 프로퍼티들을 반환하도록 되어있다. (보통은 객체리터럴을 경유해서).
// an object literal). It's up to you to eventually transform the state you're receiving before returning it.
// 결국에는 너가 받을 상태를 돌려주기전에 변환하는 것은 너에게 달려있다는 것이다.
// You can have a look right at that simplest 'connect' usage below (just after the component class definition).
// 너는 가장 단순한 'connect'의 사용에 대한 예를 바로 아래 에서 볼 수 있다.(단지 컴포넌트 클래스 정의 후에).

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
    // 우리는 여기서 하나의 prop안에 connect에 의해서 "자동적으로" 제공된 수행 함수(dispatch function)를 사용한다.
    // There are alternative ways to call actionCreators that are already bound to dispatch and those
    // 이미 수행(dispatch)하기 위해 제한된 액션 생성자들을 호출하기위한 대안적인 방법이 있다 그리고 이것은 두 번째
    // imply providing the second parameter to 'connect':
    // 파라마터로 'connect'를 제공하는 것을 암시한다:
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
    // The "delay" value given to actionCreators.getTime is a delay to simulate an async work being done before we
    // actionCreators.getTime에 주어지는 "delay" 값은 우리가 현재 시간에 얻게 할 수 있기 전에 하나의 비동기 작업이 행해지는 것을
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
// 이것은 우리의 select 함수인데 상태로 부터 우리의 컴포넌트에 props를 통해서 노출시키기를 원하는 데이터의 조각을 
// through props to our component.
// 추출할 것이다.
const mapStateToProps = (state/*, props*/) => {
  return {
    frozen: state._time.frozen,
    time: state._time.time,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // 그것은 매우 나쁜 연습인데 (reduxState: state)와 같이 상태 전체를 제공하는 것이 그렇다 그리고 오직 여기서 문자열화된 버전이 우리의 페이지안에서
    // for you to see its stringified version in our page. More about that here:
    // 너가 볼 수 있게 된다. 더 많은 것에 관해서는 여기서:
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome

// You might have noticed that thanks to redux, while we have a dynamic component that requires some state (to keep
// 너는 아마 Redux 덕분에 인지했을 것이다, 몇 상태를 요구하는 동적 컴포넌트를 가지는 동안에 (현재 시간을 유지하기 위해),
// the current time), this state is by no mean present inside the component. Our component only receives props with
// 이 상태는 컴포넌트 안에서 현재로는 의미가 없다. 우리의 컴포넌트는 오직 필요로하는 데이터와 함께 props를 받는다.
// needed data.
// What we have here is called a stateless component. You should always try to have more stateless components (presented
// 우리가 여기서 가지고 있는 것은 상태없는 컴포넌트라고 불린다. 너는 언제나 좀 더 상태 없는 컴포넌트들을 가지려고 시도할 것이다. (현재
// above as dumb components) in your applications than stateful ones because they are much more reusable.
// 위에 벙어리(dumb) 컴포넌트들 처럼) 너의 어플리케이션 안에서 stateful한 것들보다 말이다 왜냐하면 그들은 훨씬 더 재사용가능하기 때문이다.
// As suggested in "onTimeButtonClick" handler, we could even go further by passing our click callback as a prop
// "onTimeButtonClick" 핸들러 안에서 제안 됬었던것 처럼, 우리는 심지어 더 나아가 우리의 클릭 콜백을 "connect"의 두 번째 파라미터인
// via "connect" second parameter "mapDispatchToProps". Doing so, we would extract our button behavior outside of
// "mapDispatchToProps"를 경유해서 건내주도록 했다. 그렇게해서, 우리는 우리의 버튼의 행위을 우리의 컴포넌트의 바깥으로 추출해냈고,
// our component, making it even more reusable by allowing for a different click behavior.
// 그것을 다른 클릭 행위에 대해 허용함으로써 더 재사용 가능하도록 만들고 있다.
// Reusability might seem like a fancy overused concept but what having a reusable component also means, is that it's
// 재사용가능성은 아마 하나의 남용되는 환상같은 컨셉으로 보일지 모르나 재사용가능한 컴포넌트를 가지는 것은 또한 의미있는 것이며, 그것은
// one component that can be very easily tested (because you can then inject in your component whatever data and
// 매우 쉽게 테스트될 수 있는 하나의 컴포넌트다. (왜냐하면 너는 너의 컴포넌트안에 무슨 데이터든지 그리고 무슨 너가 원하는 테스트 핸들러든지
// test handlers you want and easily ensure its correct behavior).
// 주입할 수 있고 그리고 쉽게 그것의 정확한 행위를 보장할 수 있다).

// Before going to ./12_final-words.js, read this side-note about an alternative way to use "connect" HOC...
// ./12_final-words.js로 가기 전에, 이 "connect"의 HOC를 사용하기 위한 대안적인 하나의 방법에 관한 side-note(?)를 읽어라...

// Because connect(...) returns a function that accept a class and returns another class, you can use it as
// connect(...)은 하나의 클래스를 수용하는 하나의 함수를 리턴하고 그리고 또 그것은 또 다른 클래스를 리턴하기 때문에, 너가 원한다면 너는 그것을 ES7 장식자로서
// an ES7 decorator if you want to. Decorators are an experimental ES7 features that make it possible to annotate
// 사용할 수 있다. 장식자들은 하나의 실험적인 ES7 특정들인데 주석을 달거나 클래스와 프로퍼티들을 
// and modify classes and properties at design time (https://github.com/wycats/javascript-decorators).
// 설계하는 시점에 수정할 수 있도록 해준다. (https://github.com/wycats/javascript-decorators).

// This feature being experimental, it is subject to change and breakage. This means that by using it today, you must be
// 이 실험적인 특징, 그것은 변화와 쪼개짐(breakage)에 대상이다. 오늘날 이것을 사용함으로써 이것은 의미한다, 너는 반드시 완전히
// fully aware of and accept the uncertainty regarding its evolution. Decorators provide syntax sugar to write the
// 인식해야하고 그리고 그것의 진화에 관하여 불확실성을 받아들여야 한다. Decorator들은 syntax sugar(프로그래밍 언어에서 어떤 것을 더 쉽게 제공하기 위한 문법)를 제공한다.
// code above slightly differently. Instead of writing:
// 저 위의 코드를 약간 다르게 쓰기위하여, 이렇게 쓰는 것 대신에:

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
// 이 문법을 redux connect에 적용해서, 너는 대체할 수 있다:

/*
  let mapStateToProps = (state) => { ... }
  class MyClass {}
  export default connect(mapStateToProps)(MyClass)
*/

// by:
// 아래에 의해서:

/*
  let mapStateToProps = (state) => { ... }
  @connect(mapStateToProps)
  export default class MyClass {}
*/

// As you can see the application of the HOC function on the component class is now made implicit ( @connect(mapStateToProps) )
// 너가 그 컴포넌트에 대한 HOC 함수의 어플리케이션을 볼 수 있었듯이 클래스는 현재 암시적으로 만들어져 있다 ( @connect(mapStateToProps) )
// instead of calling it ourselves ( @connect(mapStateToProps)(Myclass) ). Some find this approach more elegant, others
// 그것을 그 자신으로 호출하는것 대신에 ( @connect(mapStateToProps)(Myclass) ). 몇몇은 이 접근을 더 우아다고 찾는다, 다른 이들은 
// dislike the fact that it's hiding what is really happening and many just don't get how decorators works. Knowing all that
// 그 사실을 싫어한다 그것은 정말로 일어나고 있는 일을 숨기고 있고 그리고 많이 단지 어떻게 decorator들이 동작하는지 알 수가 없다고 말이다. 그것에 대해 모두 알고
// and remembering that decorators are still experimental, you can now decide by youselves which "connect" usage you
// 그리고 decorator들은 여전히 실험적이라는 것을 기억하면서, 너는 너 자신이 어떤 "connect" 사용을 선호하는지 스스로 알고 연재 결정 할 수 있다 
// prefer and you won't be suprised to find both syntax in the many articles, tutorials, starter kits, etc. out there.
// 그리고 많은 기사들, 튜토리얼, 시작하기 킷 등등 바깥 어느 곳에서든 이 두 문법을 찾게 되었을때 놀라지 않게 될 것이다.

// Go to ./12_final-words.js for our last advice about what to do now...
// ./12_final-words.js로 가라. 무엇을 지금 해야할지에 대해 우리의 지난 조언을 위해서...
