if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),x={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>x[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"b94cf1a5dc4279b6812365a3337efdec"},{url:"/_next/static/FmMxTx3G9U6Gxg_J9S2Qe/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/FmMxTx3G9U6Gxg_J9S2Qe/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1222-7190a4b3aefc3106.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/1308-18de0855ff62d55b.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/1704-51eabf7c037b0c26.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/1971-2e8344de6e62b496.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/231-79b6870851f53ae0.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/2801-19c39233802ac91c.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/3331-4065660e658aebec.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/3d47b92a-2ddc09fbfc6f80fe.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/479ba886-4a07fae9ed1c0fe9.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/4e6af11a-287cf1f94a077f41.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/5003-43636a73158b8310.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/5933-6235e859bc6a2586.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/59650de3-5644da391b6060a9.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/66ec4792-6001695a00dc9700.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/7023-3aabd891b5bff552.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/795d4814-e2c8780f5fcac271.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/8055-17309f8f554aae40.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/8173-a7f6ebbdc36e523a.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/8604-a0b6a04bc3b88cde.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/8e1d74a4-db9da9ceff0bc13b.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/94730671-1132425bd9fcc259.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/9501-0b6aa8596a84a2cc.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/9c4e2130-e2a7684b0ff848c2.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(admin)/admin/dashboardData/page-fcd444f226d1d195.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(admin)/admin/teaser /page-949d965498bcc412.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(buyer)/buyer/buyer_agree/page-fb7e05c8435ca068.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(buyer)/buyer/land-display/page-82c2a76068d3ff0f.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(lawyer)/lawyer/components/Agreements/page-e5d7ed7ff0f51790.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(lawyer)/lawyer/components/Link-to-join/page-d137e347e76bbcae.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(lawyer)/lawyer/components/lawyer_agree/page-779651b14ba25c7d.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(lawyer)/lawyer/draft-contract/page-312bdd71d3af04b1.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(seller)/seller/seller-page/page-228d0d88b074f02c.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/(seller)/seller/seller_agree/page-cdf746d069f6ecfa.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/Lawyer_agree/page-9666f211bad851bb.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/_not-found/page-82b5ec0a22544930.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/agreementNext/page-c3a3df91b4d80a81.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/chatroom-page/page-02883659d895f011.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/chatroom/page-af60201d3e44fcf9.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/contractReview/page-a04b07219aea2a46.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/layout-20db309586a7437a.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/login/page-98fde0c9cd004751.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/otp-verification/page-03f2bd548ecf437f.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/page-ff9cf0cd069b8820.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/profile/page-3882b95245d8b7be.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/register/page-854e95de3ea0838b.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/teaser/teaserone/page-c5d7b4c6a42f8a9a.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/teaser/teaserthree/page-254d94ba1eba9e61.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/teaser/teasertwo/page-eaf24679fab53f0d.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/transactions/history-of-transactions/page-5d5c67caf1aae131.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/transactions/transactions/page-9b744832a57998d4.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/app/transactions/upload_transactions/page-8b19aeccfc85a745.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/c916193b-d94cd4bfb2839168.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/f25cdb8d-0fc1dffdc8bec76c.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/fd9d1056-28fc37759f906bf2.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/main-app-f72f00bd61daf672.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/main-b56ba76e9029ce8a.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-32117d840edab0c3.js",revision:"FmMxTx3G9U6Gxg_J9S2Qe"},{url:"/_next/static/css/5a56e3c1761e58ad.css",revision:"5a56e3c1761e58ad"},{url:"/_next/static/css/5bee47dc3e64fc8a.css",revision:"5bee47dc3e64fc8a"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/favicon.ico",revision:"a3f2f04b5badd185aa613c7ad95ccf14"},{url:"/images/chat.png",revision:"01ac264277a10769542d8a92926d94b6"},{url:"/images/error.png",revision:"20ef3b0d71ece44d8353dedf896a408b"},{url:"/images/loginimages.png",revision:"9cb5a537e1901e65ca6f7b47c8cf07a8"},{url:"/images/secure.png",revision:"d6d12701f22f0b7975faa69c96257bd9"},{url:"/images/securetransactions.png",revision:"ed5c7580af1aee30f23528ca606a114b"},{url:"/images/shawazilogo.png",revision:"a3f2f04b5badd185aa613c7ad95ccf14"},{url:"/images/transactions.png",revision:"be5423453c8755b696d328076bad6cd5"},{url:"/manifest.json",revision:"1e078fbc642bc39659f813d082d73ef3"},{url:"/media/Teaser_locateland.png",revision:"72839544144edb14499c86d5d5218ae8"},{url:"/media/landimage.png",revision:"4ed366850ac5d63f8f9489fc90ec4083"},{url:"/media/logo.png",revision:"4ff956ca12f1d0931fb30fb6827873d2"},{url:"/media/low.png",revision:"557f65518e6ad79fc75c8d0b3ac640df"},{url:"/media/transparent.png",revision:"2fd93edd26291f25f2569d142c313acf"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
