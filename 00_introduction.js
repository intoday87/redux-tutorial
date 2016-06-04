// Tutorial 0 - introduction.js

// Why this tutorial?
// 왜 이 튜토리얼인가?

// While trying to learn Redux, I realized that I had accumulated incorrect knowledge about flux through
// Redux를 배우려고 하는 동안에 나는 깨달았다. 내가 개인적으로 읽은 flux기사들을 통해서 잘못된 지식을 쌓아왔다는 것을.

// articles I read and personal experience. I don't mean that articles about flux are not well written
// 그 flux에 관한 기사들이 잘 쓰여지지 않았다고 의미하는 것은 아니다.

// but I just didn't grasp concepts correctly. In the end, I was just applying documentation of different
// 그러나 난 단지 스스로 개념을 정확하게 집어내지 못했던 것 뿐이다. 결국에는 나는 단지 다른 flux framework(Reflux, Flummox, FB Flux)

// flux frameworks (Reflux, Flummox, FB Flux) and trying to make them match with the theoretical concept I read
// 들의 documentation과 그리고 내가 읽은 이론적인 것들에 관해(actions / actions creators, store, dispatcher, etc) 을 적용해보면서

// about (actions / actions creators, store, dispatcher, etc).
// match를 시켜보려 시도했던것이다.

// Only when I started using Redux did I realize that flux is more simple than I thought. This is all
// 오직 내가 Redux를 사용하기 시작했을때 나는 깨달았었다. flux는 내가 생각한 것보다 더 단순하다. 이것은 모두

// thanks to Redux being very well designed and having removed a lot of "anti-boilerplate features" introduced
// Redux 덕분이다. 매우 잘 디자인되고 내가 이전에 시도해본 많은 다른 framework들의 "형식적으로 틀에 박힌 특징들에 반하는"것들을 제거했다.

// by other frameworks I tried before. I now feel that Redux is a much better way to learn about flux
// 나는 Redux가 다른 많은 framework들 보다 flux를 배우기 위한 하나의 가장 좋은 방법이라고 느낀다.

// than many other frameworks. That's why I want now to share with everyone, using my own words,
// 그것은 나는 모두와 공유하기를 원하기 때문이고, 내가 알고 있는 단어들을 사용해서,

// flux concepts that I am starting to grasp, focusing on the use of Redux.
// 내가 잡기 시작한 flux개념들을, Redux의 사용에 초점을 맞추면서.

// You may have seen this diagram representing the famous unidirectional data flow of a flux application:
// 너는 아마 이 그 유명한 비방향성 데이터 흐름 flux 어플리케이션의 다이어그램을 본적이 있을 것이다

/*
                 _________               ____________               ___________
                |         |             |            |             |           |
                | Action  |------------▶| Dispatcher |------------▶| callbacks |
                |_________|             |____________|             |___________|
                     ▲                                                   |
                     |                                                   |
                     |                                                   |
 _________       ____|_____                                          ____▼____
|         |◀----|  Action  |                                        |         |
| Web API |     | Creators |                                        |  Store  |
|_________|----▶|__________|                                        |_________|
                     ▲                                                   |
                     |                                                   |
                 ____|________           ____________                ____▼____
                |   User       |         |   React   |              | Change  |
                | interactions |◀--------|   Views   |◀-------------| events  |
                |______________|         |___________|              |_________|

*/

// In this tutorial we'll gradually introduce you to concepts of the diagram above. But instead of trying
// 이 튜토리얼에서 우리는 점진적으로 너에게 위의 다이어그람의 개념을 소개할 것이다. 그러나
// to explain this complete diagram and the overall flow it describes, we'll take each piece separately and try to
// 완성된 다이어그램을 설명하려고 시도하는것과 우리가 설명하려는 것의 전반적인 흐름을 설명하려고 시도하려고 하는것 대신에 우리는 각각을 분리해서 가져갈 것이다.
// understand why it exists and what role it plays. In the end you'll see that this diagram makes perfect sense
// 그리고 왜 그것이 존재하고 그것이 행하는 역할이 무엇인지 이하해려고 시도할 것이다. 결국에는 너는 다이어그램이 완벽한 이치에 맞는다는것을 보게 될 것이다.
// once we understand each of its parts.
// 한 때 우리가 그것의 각 부분들을 이해한 것 처럼

// But before we start, let's talk a little bit about why flux exists and why we need it...
// 그러나 우리가 시작하기 전에, 약간의 얘기를 나눠보도록 하자. 왜 flux가 존재하는지 그리고 왜 우리가 그것이 필요한지...
// Let's pretend we're building a web application. What are all web applications made of?
// 우리가 하나의 웹 어플리케이션을 구축하고 있다고 가정해 보자. 모든 웹 어플리케이션들이 무엇으로 구성되어 있지?
// 1) Templates / html = View
// 1) 템플릿들 / html = view - 보통 view가 html이고 하나의 데이터를 주어서 구성되기 전의 view를 템플릿이라고 한다.
// 2) Data that will populate our views = Models
// 2) Data 그것은 우리들의 view를 양산할 것이다. = Models
// 3) Logic to retrieve data, glue all views together and to react accordingly to user events,
// 3) 데이터를 추출해내고, view들을 모두 함께 붙이고 그리고 사용자 이벤트들에 반응하기 위한, 
//    data modifications, etc. = Controller
//    데이터 수정 등등의 로직 = controller

// This is the very classic MVC that we all know about. But it actually looks like concepts of flux,
// 이것은 매우 전통적인 우리 모두가 아는 MVC다. 그러나 그것은 실제로 flux의 concept들인데,
// just expressed in a slightly different way:
// 단지 약간 다른 방식으로 표현된 것 뿐이다.

// - Models look like stores
// - Models는 stores와 비슷하다.
// - user events, data modifications and their handlers look like
// - user events, data 수정 그리고 그들의 핸들러들은
//   "action creators" -> action -> dispatcher -> callback
//   "action creators" -> action -> dispatcher -> callback과 비슷하다.
// - Views look like React views (or anything else as far as flux is concerned)
// - View들은 React view들과 비슷하다(또는 flux와 관련이 적은 어떤 것이든)

// So is flux just a matter of new vocabulary? Not exactly. But vocabulary DOES matter, because by introducing
// 그래서 flux는 단지 새로운 용어의 문제인가? 정확히는 아니다. 그러나 용어는 문제가 된다. 왜냐하면 이 새로운 용어들을 소개함으로써
// these new terms we are now able to express more precisely things that were regrouped under
// 우리가 그것들을 재그룹화된(regrouped) 다양한 용어들로부터 이제는 더 정확하게 표현할 수 있기 때문이다...
// various terminologies... For example, isn't a data fetch an action? Just like a click is also an action?
// 예를들어, data fetch는 action이 아닌가? 단지 클릭이 또한 액션과 같은것일까?
// And a change in an input is an action too... Then we're all already used to issuing actions from our
// 그리고 입력으로부터 변화는 마찬가지로 액션인가.. 그리고나서 우리는 이미 모두 우리의 어플리케이션으로부터 액션들을 발행(issue)하는 것이 익숙하다.
// applications, we were just calling them differently. And instead of having handlers for those
// 우리는 단지 그것들을 다르게 부르고 있을 뿐이다. 그리고 view들과 model들을 직접적으로 수정하는 이 액션들을 위한 핸들러를 가지는 대신에
// actions directly modify Models or Views, flux ensures all actions go first through something called
// flux는 모든 액션들이 하나의 dispatcher라고 불리는 어떤 것을 처음으로 통과해서 가는것을 보장한다.
// a dispatcher, then through our stores, and finally all watchers of stores are notified.
// 그리고 나서 우리의 stores들을 통과하고, 그리고 마침내 모든 stores의 감시자(watcher)들은 알림을 받게된다.

// To get more clarity how MVC and flux differ, we'll
// 더 명확하게 하자면 어떻게 MVC와 그리고 flux가 다른지를, 우리는 
// take a classic use-case in an MVC application:
// 전통적인 use-case를 하나의 MVC 어플리케이션에서 알아볼 것이다.
// In a classic MVC application you could easily end up with:
// 하나의 전통적인 MVC 어플리케이션에서 너는 쉽게 이와 같은 결론을 내릴 수 있다:
// 1) User clicks on button "A"
// 1) 버튼 "A"에 대한 클릭들
// 2) A click handler on button "A" triggers a change on Model "A"
// 2) 버튼 "A"에 대한 클릭 핸들러는 Model "A"에 대해 변경을 촉발한다.
// 3) A change handler on Model "A" triggers a change on Model "B"
// 3) Model "A"의 변화에 대한 핸들러는 Model "B"에 대한 변화를 촉발한다.
// 4) A change handler on Model "B" triggers a change on View "B" that re-renders itself
// 4) Model "B"의 변화에 대한 핸들러는 view "B"의 변화를 촉발한다. 그 변화로 인해 그 자신을 재렌더할 것이다. 

// Finding the source of a bug in such an environment when something goes wrong can become quite challenging
// 무언가가 잘 못 되어서 이와 같은 환경에서 소스의 버그를 찾는 것은 꽤 도전적인 일이다.
// very quickly. This is because every View can watch every Model, and every Model can watch other Models, so
// 그것도 매우 빠르게.  이것은 때문인데 모든 뷰가 모든 모델을 감시할 수 있다. 그리고 모든 모델은 다른 모델을 감시할 수 있다, 그래서  
// basically data can arrive from a lot of places and be changed by a lot of sources (any views or any models).
// 기본적으로 데이터는 많은 곳으로 부터 도착할 수 있다. 그리고 많은 소스로부터 변화될 수 있다. (어떤 뷰들 또는 어떤 모델들이든지).

// Whereas when using flux and its unidirectional data flow, the example above could become:
// 반면에 flux와 그리고 그것의 비방향성 데이터 흐름을 사용할 때, 위의 예시는 이와 같이 될 수 있다:
// 1) user clicks on button "A"
// 1) 버튼 "A"에 대해 사용자 클릭들.
// 2) a handler on button "A" triggers an action that is dispatched and produces a change on Store "A"
// 2) "A" 버튼에 대한 핸들러는 하나의 액션을 촉발하는데 그 액션은 수행되고(dispatch) 그리고 Store "A"에 대한 하나의 변화를 생산한다.
// 3) since all other stores are also notified about the action, Store B can react to the same action too
// 3) 모든 다른 store들이 그 액션에 관해 알림을 받기 때문에, Store B는 그 똑같은 액션에 마찬가지로 반응할 수 있다.
// 4) View "B" gets notified by the change in Stores A and B, and re-renders
// 4) View "B"는 Store A 그리고 B, 그리고 재구성(re-renders)로 부터 그 변화에 의해서 알림을 얻게 된다.

// See how we avoid directly linking Store A to Store B? Each store can only be
// 어떻게 직접적으로 Store A에서 Store B로 가는 것을 피할 수 있는지 볼 수 있는가? 각각 store는 오직
// modified by an action and nothing else. And once all stores have replied to an action,
// 하나의 액션에 대해서만 수정될 수 있다. 그리고 그 어떤것으로 부터도 아니다.
// views can finally update. So in the end, data always flows in one way:
// view들은 결국 업데이트 될 수 있다. 그리고 결국에, 데이터는 언제나 한 방향으로만 흘러간다.
//     action -> store -> view -> action -> store -> view -> action -> ...

// Just as we started our use case above from an action, let's start our tutorial with
// 단지 우리가 위에 하나의 액션으로부터의 use case를 시작하면서 말이다. 액션들과 액션 생성자들과 함께 우리의 튜토리얼을  
// actions and action creators.
// 시작해보자.

// Go to next tutorial: 01_simple-action-creator.js
// 다음 튜토리얼인 01_simple-action-creator.js로 가라. 
