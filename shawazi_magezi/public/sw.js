
if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>a(e,t),r={module:{uri:t},exports:c,require:o};s[t]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"8e7107175e794a26f9b02c4dd0c118cf"},{url:"/_next/static/chunks/23-99ae2bf2695b5be7.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/30-04352efb04139c85.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/3d47b92a-a8854be03623db03.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/4e6af11a-85cad990409c1f15.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/533-534983831eac7d13.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/66ec4792-8e5f92f5ff6f173c.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/795d4814-219be44b2d7b6004.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/8e1d74a4-a1ddefffef626d49.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/9c4e2130-15805e45fc967a98.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/_not-found/page-2b4c0f1b3a944c5a.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/land-display/page-35b85d85b2dccfba.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/layout-f73368a25a3b7185.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/page-bac85a4e800ed87c.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/teaser/teaserone/page-3d9117a9fed12243.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/teaser/teaserthree/page-9f63a041ae8d1247.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/teaser/teasertwo/page-7558eacce208b5cd.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/transactions/history-of-transactions/page-51f0d8f0fa770960.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/transactions/transactions/page-75d6ad8ba1ef3594.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/app/transactions/upload_transactions/page-0972557dcadd3abb.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/fd9d1056-5bb7a682c6db9eae.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/main-53b5e7894972ed10.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/main-app-8609ddb7712eb97b.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-9f3c342e10423f81.js",revision:"gTAA8oGyDgrVod-TKLQ-H"},{url:"/_next/static/css/e806ee93b43ec053.css",revision:"e806ee93b43ec053"},{url:"/_next/static/gTAA8oGyDgrVod-TKLQ-H/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/gTAA8oGyDgrVod-TKLQ-H/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/favicon.ico",revision:"a3f2f04b5badd185aa613c7ad95ccf14"},{url:"/images/error.png",revision:"20ef3b0d71ece44d8353dedf896a408b"},{url:"/images/loginimages.png",revision:"9cb5a537e1901e65ca6f7b47c8cf07a8"},{url:"/images/secure.png",revision:"d6d12701f22f0b7975faa69c96257bd9"},{url:"/images/securetransactions.png",revision:"ed5c7580af1aee30f23528ca606a114b"},{url:"/images/shawazilogo.png",revision:"a3f2f04b5badd185aa613c7ad95ccf14"},{url:"/images/transactions.png",revision:"be5423453c8755b696d328076bad6cd5"},{url:"/manifest.json",revision:"1e078fbc642bc39659f813d082d73ef3"},{url:"/media/Teaser_locateland.png",revision:"72839544144edb14499c86d5d5218ae8"},{url:"/media/landimage.png",revision:"4ed366850ac5d63f8f9489fc90ec4083"},{url:"/media/logo.png",revision:"4ff956ca12f1d0931fb30fb6827873d2"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));


