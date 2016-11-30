// Tutorial 12 - Provider-and-connect.js

// Hi there! So you're ready to play with Redux in a React app?
// 안녕 거기! 그래서 우리는 Redux를 하나의 React 앱에서 사용할 준비가 되었는가?

// The application you're about to see could not be more minimalist (from a product point of view
// 당신이 보려고 하는 어플리케이션은 미니멀리스트가 아니다.(하나의 제품 관점의 시각으로부터
// and from a design point of view - sorry for the black and white)... We'll only focus
// 그리고 하나의 디자인 관점의 시각으로부터 - 흑백논리에 대해 미안하다)... 우리는 오직 초점을 맞출 것인데
// on the use of 2 main bindings of react-redux (https://github.com/gaearon/react-redux):
// react-redux의 두 가지 주요한 바인딩에 대한 사용에 대한 것이다.(https://github.com/gaearon/react-redux):
// 1) the Provider component
// 1) 제공자 컴포넌트
// 2) the connect function
// 2) 연결 함수

// But before we get to that, let's see the basic setup of this application and how it
// 그러나 우리가 그것에 대해 알아보기 전에, 이 어플리케이션의 기본 설정과 어떻게 그것이
// will be served to a browser...
// 브라우저에 제공될 것인지에 대해 알아보자...

// We won't use Express (http://expressjs.com/) in this app since we don't really need
// 우리는 이 앱에서 Express를 사용하지 않을 것이다. 왜냐하면 우리는 정말로
// it to serve a simple html page.
// 단순한 하나의 html 페이지를 제공할 것이기 때문에 필요가 없다.

// "http" module will be used to create the HTTP server
// "http" 모듈은 http 서버를 생성하기 위해서 사용될 것이다.
import http from 'http'
import React from 'react'

// We create our main application server here. It will serve the same page on all URIs
// 우리는 우리의 메인 서버를 여기서 생성한다. 그것은 모든 URI들에 대해 같은 페이지를 제공할 것이다.
// so you won't find any route specific logic below (except for rejecting favicon request)
// 그래서 어떤 특정한 라우트를 구체적으로 명시한 로직이 아래에 없다. (파비콘 요청을 거부하는것을 제외하고)
var server = http.createServer(function(req, res) {

  // Forget this, it's just to avoid serving anything when the browser automatically
  // 이것을 잊어라 그것은 단지 브라우저가 자동적으로 파비콘에 대해 요청할 때 어떤 것을 제공하는 것을 피하기
  // requests favicon (if not, this server would send back an html page).
  // 위해서다(만약 아니라면, 이 서버는 html 페이지를 돌려 보낼 것이다.)
  if (req.url.match('favicon.ico')) {
    return res.end()
  }

  // And of course, here is our Application HTML that we're sending back to the browser.
  // 그리고 물론, 여기에 우리의 어플리케이션의 HTML이 있는데 우리가 브라우저에 돌려보낼 것이다.
  // Nothing special here except the URI of our application JS bundle that points to our
  // 여기서 특별한 것은 없다. 우리의 어플리케이션 JS 번들의 URI가 우리의 webpack 개발 서버를 가리키고
  // Webpack dev server (located at http://localhost:5051)
  // 있다는 것만 제외하면 말이다.(located at http://localhost:5051)
  res.write(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <div id="app-wrapper"></div>
        <script type="text/javascript" src="http://localhost:5051/static/bundle.js"></script>
      </body>
    </html>`
  )

  res.end()
})

export default server

// Go to ./index.jsx, where our app is initialized. For those of you who are not familiar with Webpack,
// ./index.jsx로 가라, 그 곳에서 우리의 앱은 초기화된다. webpack과 친숙하지 않은 사람들을 위해서,
// index.jsx is defined as the entry point (the first file) of our JS bundle (in 11_src/webpack.config.js)
// index.jsx는 우리 JS 번들의 엔트리 포인트로써 정의된다(in 12_src/webpack.config.js)
// and is automatically executed when the JS bundle is loaded in our browser.
// 그리고 자동적으로 실행된다 번들이 우리 브라우저에 로드 되었을 때.
