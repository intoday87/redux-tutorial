redux-tutorial
=========================

This repository contains a step by step tutorial to help grasp flux and more specifically [Redux](https://github.com/rackt/redux).
이 리포지토리는 당신에게 flux와 특히 나아가 [Redux](https://github.com/rackt/redux)의 개념을 정립하도록 돕기 위해서 단계적인 튜토리얼을 포함한다.

The official and very exhaustive Redux documentation is available [here](http://redux.js.org/) and should be your number one source of truth regarding Redux. The present tutorial will only offer you an introduction to flux concepts through Redux use. For further or more detailed info, please refer to the Redux documentation.
공식적인 그리고 매우 완전한 Redux 문서는 [여기서](http://redux.js.org/)에서 이용 가능하다.

### Prerequisites
### 전제 조건들
It is required for you to know a bit of ES6 and ES7 (Object Spread) to correctly understand some of the examples given in this repo. Also be aware that this tutorial targets redux 3.0.2 and react-redux 4.0.0.
이 리포지토리에 주어진 예제들을 정확하게 이해하기 위해서 약간의 ES6 그리고 ES7(오브젝트 스프레드)에 대한 지식이 요구된다. 또한 튜토리얼은 redux 3.0.2 그리고 react-redux 4.0.0를 타깃으로 한다는 것을 주의해라.

### Clone the repository
### 이 리포지토리를 클론해라
`git clone https://github.com/happypoulp/redux-tutorial.git`

### Move into repository
### 리포지토리 안으로 이동해라
`cd redux-tutorial`

### Install dependencies
### 의존성들을 설치해라
`npm install`

### Browse the tutorial
### 튜토리얼을 브라우즈해라

This tutorial is split into a sequence of javascript files that are intended to be read in order.
이 튜토리얼은 순서대로 읽히도록 의도되어있는 자바스크립트 파일들의 순서로 쪼개져 있다.

Start with the first tutorial: [Introduction](00_introduction.js)
첫 번째 튜토리얼을 시작해라: [Introduction](00_introduction.js)

### Run an example
### 예제를 실행해라

Being real js files, each example can be run to verify that it works as intended or to do your own experiments:
실제 js 파일들, 각각의 예제들은 그것이 의도된대로 작동하는지 검증하기 위해서 또는 당신만의 실험들을 위해서 실행될 수 있다.

`npm run example 01_simple-action-creator.js`

Enjoy!
즐겨라!
