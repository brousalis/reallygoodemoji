angular.module("bendy.templates",[]).run(["$templateCache",function(e){e.put("app/emoji/emoji.html",'<div class=ta-center ng-show=loading><div style="background-image: url(/images/loading.svg); background-repeat: no-repeat; background-size: 100%; width: 200px; height: 200px" class="mx-auto o-10"></div></div><div ng-show=!loading class="bg-light c-dark s-md p-fixed l0 t0 r0 ta-center z-500"><div class=p-sm><span ng-show=!copied>you have {{ count }} <span class=c-brand>really good emoji</span></span> <span ng-show=copied>copied <span class=c-brand>{{ copiedText }}</span> to clipboard 👍</span></div><div ng-show=!loading class="bg-white b-bottom b--light ta-center"><input search name=search placeholder="🔍 type anywhere to search" ng-model=search type=search></div></div><div class="mw-md mx-auto m-lg"><div class=masonry ng-if=!loading><div class=emoji ng-repeat="e in emoji | fuzzyBy: \'alias\': search" clipboard supported=supported text=alias(e.alias) on-copied=didCopy(e.alias)><div class=emoji-alias>{{ e.alias }}</div><img class="p-absolute center-xy" ng-src="{{ e.src }}"></div></div></div><footer class="d-table p col-1-1 ta-center"><span class="color-gray-light d-table-cell va-middle">made by <a href=http://twitter.com/brousalis>pete</a> <span class=p-relative style=top:1px>🐧</span></span></footer>'),e.put("app/login/login.html",'<div class=ta-center ng-show=loading><div style="background-image: url(/images/loading.svg); background-repeat: no-repeat; background-size: 100%; width: 200px; height: 200px" class="mx-auto o-10"></div></div>')}]),function(){function e(){return{$get:["localStorageService",function(e){var n=e;return{get:function(e){return n.get(e)},set:function(e,t){return n.set(e,t)},remove:function(e){return n.remove(e)}}}]}}angular.module("app.storageService",["LocalStorageModule"]).provider("storageService",e)}(),function(e){var n=e.module("app.slackService",[]);n.value("slackConfig",{OAuthUrl:"https://slack.com/oauth/authorize",ApiUrl:"https://slack.com/api/",DefaultToken:""})}(angular),function(e){e.module("app.slackService").service("slackService",["$http","$log","slackConfig",function(e,n,t){function o(e,n,o){var a={token:o||t.DefaultToken,user:e};O("users.getPresence",a,n)}function a(e,n,o){var a={token:o||t.DefaultToken,user:e};O("users.info",a,n)}function i(e,n){var o={token:n||t.DefaultToken};O("users.list",o,e)}function c(e,n){var o={token:n||t.DefaultToken};O("users.setActive",o,e)}function r(e,n,o){var a={token:o||t.DefaultToken,presence:e};O("users.setPresence",a,n)}function l(e){var n={token:e||t.DefaultToken};O("auth.test",n)}function s(e,n){var o="&"+B(n),a=t.OAuthUrl+"?client_id="+e+o;window.location.replace(a)}function u(e,n){t.DefaultToken=e,p(n)}function f(e,n,t,o){var a={client_id:e,client_secret:n,code:t};O("oauth.access",a,o)}function p(e,n){var o={token:n||t.DefaultToken};O("auth.test",o,e)}function d(e,n,o){var a={token:o||t.DefaultToken,channel:e};O("channels.archive",a,n)}function h(e,n,o){var a={token:o||t.DefaultToken,channel:e};O("channels.unarchive",a,n)}function v(e,n,o){var a={token:o||t.DefaultToken,channel:e};O("channels.history",a,n)}function g(e,n,o,a){var i={token:a||t.DefaultToken,channel:e,user:n};O("channels.invite",i,o)}function k(e,n,o){var a={token:o||t.DefaultToken,channel:e};O("channels.join",a,n)}function m(e,n,o,a){var i={token:a||t.DefaultToken,channel:e,user:n};O("channels.kick",i,o)}function T(e,n,o){var a={token:o||t.DefaultToken,channel:e};O("channels.leave",a,n)}function D(e,n,o,a){var i={token:a||t.DefaultToken,channel:e,ts:n};O("channels.mark",i,o)}function y(e,n,o){var a={token:o||t.DefaultToken,channel:e};O("channels.rename",a,n)}function b(e,n,o,a){var i={token:a||t.DefaultToken,channel:e,purpose:n};O("channels.setPurpose",i,o)}function j(e,n,o,a){var i={token:a||t.DefaultToken,channel:e,topic:n};O("channels.setTopic",i,o)}function $(e,n){var o={token:n||t.DefaultToken};O("channels.list",o,e)}function E(e,n,o){var a={token:o||t.DefaultToken,channel:e};O("channels.info",a,n)}function C(e,n,o){var a={token:o||t.DefaultToken,name:e};O("channels.create",a,n)}function S(e,n,o,a){var i={token:a||t.DefaultToken,channel:e,text:n};O("channels.info",i,o)}function w(e,n,o,a){var i={token:a||t.DefaultToken,channel:e,ts:n};O("chat.delete",i,o)}function x(e,n,o,a,i){var c={token:i||t.DefaultToken,channel:e,ts:n,text:o};O("chat.update",c,a)}function P(e,n){var o={token:n||t.DefaultToken};O("team.info",o,e)}function I(e,n){var o={token:n||t.DefaultToken};O("team.accessLogs",o,e)}function _(e,n,o){var a={token:o||t.DefaultToken,file:e};O("files.delete",a,n)}function R(e,n,o){var a={token:o||t.DefaultToken,file:e};O("files.info",a,n)}function A(e,n){var o={token:n||t.DefaultToken};O("files.list",o,e)}function L(e,n){if(e.token=token||t.DefaultToken,e.content){var o=t.ApiUrl+"files.upload";V(o,e,n)}O("files.upload",e,n)}function z(e,n,o){var a={token:o||t.DefaultToken,query:e};O("search.files",a,n)}function N(e,n,o){var a={token:o||t.DefaultToken,query:e};O("search.all",a,n)}function U(e,n,o){var a={token:o||t.DefaultToken,query:e};O("search.messages",a,n)}function M(e,n,o){var a={token:o||t.DefaultToken,user:e};O("stars.list",a,n)}function O(e,n,o){var a=B(n),i=t.ApiUrl+e+"?"+a;q(i,o)}function q(t,o){e.get(t).success(function(e){o&&o(e)}).error(function(e,t){n.log(t),n.log(e)})}function V(t,o,a){e.post(t,o).success(function(e){a(e)}).error(function(e,t){n.log(t),n.log(e)})}function B(e){var n=[];for(var t in e)e.hasOwnProperty(t)&&n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return n.join("&")}function W(){n.log("Method not implemented. Remind nickaranz@gmail.com to quit slacking")}return{authorize:s,auth:{test:p},oauth:{access:f},channels:{archive:d,create:C,history:v,info:E,invite:g,join:k,kick:m,leave:T,list:$,mark:D,rename:y,setPurpose:b,setTopic:j,unarchive:h},chat:{"delete":w,postMessage:S,update:x},files:{"delete":_,info:R,list:A,upload:L},rtm:{start:l},search:{all:N,files:z,messages:U},stars:{list:M},team:{accessLogs:I,info:P},users:{getPresence:o,info:a,list:i,setActive:c,setPresence:r},InitToken:u,ExecuteApiMethod:O,groups:{archive:W,close:W,create:W,createChild:W,history:W,invite:W,kick:W,leave:W,list:W,mark:W,open:W,rename:W,setPurpose:W,setTopic:W,unarchive:W},im:{close:W,history:W,list:W,mark:W,open:W}}}])}(angular),angular.module("app",["ngSanitize","ui.router","angular-clipboard","angular.filter","bendy.templates","bendy.env","app.slackService","app.storageService"]),function(){function e(e){e.state("login",{url:"/login?code",templateUrl:"app/login/login.html",controller:"LoginController"})}function n(e,n,t,o,a){var i={client:a.CLIENT_ID,secret:a.CLIENT_SECRET};n.code?(o.set("code",n.code),o.get("code")&&t.oauth.access(i.client,i.secret,o.get("code"),function(n){n.ok&&(o.set("token",n.access_token),t.InitToken(n.access_token),e.go("emoji"))})):(o.remove("code"),o.remove("token"),e.go("main"))}n.$inject=["$state","$stateParams","slackService","storageService","ENV"],e.$inject=["$stateProvider"],angular.module("app").controller("LoginController",n).config(e)}(),function(){function e(e){return function(n,t,o){e.bind("keypress",function(e){n.searching=!0,t[0].focus(),n.$apply()}),t.bind("keydown",function(e){(27===e.which||13===e.which)&&(n.searching=!1,n.search="",n.$apply())})}}e.$inject=["$document"],angular.module("app").directive("search",e)}(),function(){function e(e){e.state("emoji",{url:"/emoji",templateUrl:"app/emoji/emoji.html",controller:"EmojiController"})}function n(e,n,t,o,a,i){e.loading=!0,e.copied=!1,i.get("token")||n.go("login");var c={token:i.get("token")};e.alias=function(e){return":"+e+":"},e.didCopy=function(n){e.copied=!0,e.copiedText=n,t(function(){e.copied=!1},1e3)},a.ExecuteApiMethod("emoji.list",c,function(n){if(n.ok){var t=n.emoji,o=[],a={},i=!0,c=!1,r=void 0;try{for(var l,s=Object.keys(t)[Symbol.iterator]();!(i=(l=s.next()).done);i=!0){var u=l.value;/^alias/.test(t[u])?(a[t[u].replace("alias:","")]=u,delete t[u]):o.push({alias:u,src:t[u]})}}catch(f){c=!0,r=f}finally{try{!i&&s["return"]&&s["return"]()}finally{if(c)throw r}}e.aliases=a,e.emoji=o,e.count=Object.keys(o).length,e.loading=!1}else e.loading=!1,e.error=!0})}e.$inject=["$stateProvider"],n.$inject=["$scope","$state","$timeout","$q","slackService","storageService"],angular.module("app").config(e).controller("EmojiController",n)}(),angular.module("bendy.env",[]).constant("ENV",{CLIENT_ID:"2164711395.63729561477",CLIENT_SECRET:"c8e690c6e80477c8c91f45d573658fe6",REDIRECT_URI:"http://reallygoodemoji.site/login"}).constant("NODE_ENV","production"),function(){function e(e,n,t,o,a){var i={client:a.CLIENT_ID,secret:a.CLIENT_SECRET,authParams:{redirect_uri:a.REDIRECT_URI,scope:"emoji:read"}};o.get("token")?n.go("emoji"):t.authorize(i.client,i.authParams)}e.$inject=["$scope","$state","slackService","storageService","ENV"],angular.module("app").controller("AppController",e)}(),function(){function e(e,n){n.state("main",{url:"/",controller:"AppController"}),e.otherwise("/")}function n(e){e.useAnchorScroll()}function t(e){e.debugInfoEnabled(!0),e.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|emoji):|data:image\//)}function o(e){e.html5Mode({enabled:!0,rewriteLinks:!1}).hashPrefix("!")}e.$inject=["$urlRouterProvider","$stateProvider"],t.$inject=["$compileProvider"],o.$inject=["$locationProvider"],n.$inject=["$uiViewScrollProvider"],angular.module("app").config(e).config(t).config(o).config(n)}();