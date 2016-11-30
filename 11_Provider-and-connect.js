// Tutorial 11 - Provider-and-connect.js

// This is the final tutorial and the one that will show you how to bind together Redux and React.
// 이것은 마지막 튜토리얼이다 그리고 그리고 그 하나는 Redux와 React를 함께 묵는 방법을 보여줄 것이다.

// To run this example, you will need a browser.
// 이 예제를 실행하기 위해서, 너는 브라우저가 필요로 한다.

// All explanations for this example are inlined in the sources inside ./11_src/src/.
// 모든 이 예제에 대한 설명은 ./11_src/src/.의 소스안에 한줄한줄(inlined?) 표시되어 있다.

// Once you've read the lines below, start with 11_src/src/server.js.
// 일단 너가 아래의 라인들을 읽어봤었다면, 11_src/src/server.js함께 시작해라.

// To build our React application and serve it to a browser, we'll use:
// React 어플리케이션을 빌드하기 위해서 그리고 그것을 브라우저에 제공하기 위해서, 너는 사용할 것이다.:
// - A very simple node HTTP server (https://nodejs.org/api/http.html)
// - 하나의 매우 단순한 노드 HTTP server (https://nodejs.org/api/http.html)
// - The awesome Webpack (http://webpack.github.io/) to bundle our application,
// - 멋진 webpack(http://webpack.github.io/) 우리 어플리케이션을 번들하기 위해서,
// - The magic Webpack Dev Server (http://webpack.github.io/docs/webpack-dev-server.html)
// - 마법의 webpack 개발 서버 (http://webpack.github.io/docs/webpack-dev-server.html)
//     to serve JS files from a dedicated node server that allows for files watch
//     파일들에 대한 감시(watch)를 허용하는 헌신적인 node 서버로부터 JS 파일들을 제공하기 위함이다.
// - The incredible React Hot Loader http://gaearon.github.io/react-hot-loader/ (another awesome
// - 엄청난 React 핫 로더 http://gaearon.github.io/react-hot-loader/ (또 다른 멋진
//     project of Dan Abramov - just in case, he is Redux's author) to have a crazy
//     Dan Abramov의 프로젝트 - 혹시라도 경우에 그는 Redux의 저자임에 대비해서.)
//     DX (Developer experience) by having our components live-reload in the browser
//     브라우저내 live-reload(실행 중 리프레시 없이 리로드)로 미친 개발자 경험을 제공한다.
//     while we're tweaking them in our code editor.
//     우리가 코드 에디터에서 그들을 쥐어짜내는 동안.

// An important point for those of you who are already using React: this application is built
// 이미 React를 사용하고 있는 누군가들에 대해 중요한 점: 이 어플리케이션은 React 0.14 위에서
// upon React 0.14.
// 빌드되었다.

// I won't detail Webpack Dev Server and React Hot Loader setup here since it's done pretty
// 나는 Webpack 개발 서버와 핫 로더 설정에 대해 상세하게 파헤치지 않을 것이다 왜냐하면 React 핫 로더 문서들에 잘 정리
// well in React Hot Loader's docs.
// 되어 있기 때문이다.
import webpackDevServer from './11_src/src/webpack-dev-server'
// We request the main server of our app to start it from this file.
// 우리는 우리의 앱의 메인 서버에 이 파일을 실행하라고 요청한다.
import server from './11_src/src/server'

// Change the port below if port 5050 is already in use for you.
// 만약 너거 이 포트를 쓰고 있다면 포트 넘버를 바꿔도 좋다.
// if port equals X, we'll use X for server's port and X+1 for webpack-dev-server's port
// 만약 포트가 X와 동일하다면, 우리는 X를 서버포트를 위해서 사용할 것이다. 그리고 X+1로 webpack-dev-server의 포트를 사용한다.
const port = 5050

// Start our Webpack dev server...
// webpack 개발 서버를 시작한다.
webpackDevServer.listen(port)
// ... and our main app server.
// ... 그리고 우리의 메인 앱 서버도.
server.listen(port)

console.log(`Server is listening on http://127.0.0.1:${port}`)

// Go to 11_src/src/server.js...
// 11_src/src/server.js로 가라...

// Go to next tutorial: 12_final-words.js
// 다음 튜토리얼로 가라: 12_final-words.js
