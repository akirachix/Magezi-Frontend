if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let t={};const r=e=>s(e,c),l={module:{uri:c},exports:t,require:r};a[c]=Promise.all(i.map((e=>l[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"0a398c2c24ac3d49839a84b194917a88"},{url:"/_next/static/chunks/1222-5b6879fc296df357.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/231-e77a9a39207da6f0.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/3331-9c27c05c1e0d7099.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/3550-10f9a4c677523d6a.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/3d47b92a-a8854be03623db03.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/479ba886-abaf6e26ead4e140.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/4e6af11a-22694291404363f0.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/5141-1057a554b65439fa.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/66ec4792-e4be0995550a1bc8.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/7023-c59730a123745e25.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/795d4814-5b1beffa55bc2cfe.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/8173-cc557a906a96c4e1.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/881-4ec1d97d1a1f9179.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/8990-82b20e43af3cb332.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/8e1d74a4-df586d6c6670c148.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/9105-efb076a22eb50ee2.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/94730671-a833251fa30087c0.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/9c4e2130-aa32e5e4a595a2ba.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/(buyer)/buyer/buyer_agree/page-85e5e58a576479b9.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/(buyer)/buyer/land-display/page-56daefaba1f0c34a.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/(lawyer)/lawyer/components/Agreements/page-2ece546f2b468456.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/(lawyer)/lawyer/components/Link-to-join/page-467b70115d848ed2.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/(lawyer)/lawyer/components/lawyer_agree/page-cde2312ed47d8774.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/(lawyer)/lawyer/draft-contract/page-caba3afcdc5d9a2b.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/(seller)/seller/seller-page/page-8cef36854f4cfd07.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/(seller)/seller/seller_agree/page-b2a1bba4319fe63b.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/Lawyer_agree/page-2adb897a6e8b9964.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/_not-found/page-386396321b07a183.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/agreementNext/page-4a5a2857ea77dff5.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/chatroom-page/page-07a7ecf0e1e63f8a.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/chatroom/page-3157610d1db0c189.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/contractReview/page-950189c4ccc455d8.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/layout-8a3cd1faebae6432.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/login/page-a598de8ca489ae3a.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/otp-verification/page-0f4fd6b3ded77e57.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/page-f82341ca0f4ba90a.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/profile/page-7c0d39ac567ae988.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/register/page-3b26804e47ed438d.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/teaser/teaserone/page-9c208399ecef0453.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/teaser/teaserthree/page-26e6000b77e20970.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/teaser/teasertwo/page-841b605cdbb44897.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/transactions/history-of-transactions/page-be0849a9fea84a8a.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/transactions/transactions/page-f2edde261f50cf26.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/app/transactions/upload_transactions/page-06a55f5bb2a00508.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/fd9d1056-fbcaa10c8ff4eb6d.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/framework-a63c59c368572696.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/main-7698a8611c698e03.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/main-app-6ba9a54d0dbb6a68.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/pages/_app-00b74eae5e8dab51.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/pages/_error-c72a1f77a3c0be1b.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-f11f764cb6482bea.js",revision:"fLbjVLclahiR11l_NNHJJ"},{url:"/_next/static/css/d587a366f09a6c8f.css",revision:"d587a366f09a6c8f"},{url:"/_next/static/fLbjVLclahiR11l_NNHJJ/_buildManifest.js",revision:"b222cbf4d8e1f47e27a8925222733e53"},{url:"/_next/static/fLbjVLclahiR11l_NNHJJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/favicon.ico",revision:"a3f2f04b5badd185aa613c7ad95ccf14"},{url:"/images/chat.png",revision:"01ac264277a10769542d8a92926d94b6"},{url:"/images/error.png",revision:"20ef3b0d71ece44d8353dedf896a408b"},{url:"/images/loginimages.png",revision:"9cb5a537e1901e65ca6f7b47c8cf07a8"},{url:"/images/secure.png",revision:"d6d12701f22f0b7975faa69c96257bd9"},{url:"/images/securetransactions.png",revision:"ed5c7580af1aee30f23528ca606a114b"},{url:"/images/shawazilogo.png",revision:"a3f2f04b5badd185aa613c7ad95ccf14"},{url:"/images/transactions.png",revision:"be5423453c8755b696d328076bad6cd5"},{url:"/manifest.json",revision:"1e078fbc642bc39659f813d082d73ef3"},{url:"/media/Teaser_locateland.png",revision:"72839544144edb14499c86d5d5218ae8"},{url:"/media/landimage.png",revision:"4ed366850ac5d63f8f9489fc90ec4083"},{url:"/media/logo.png",revision:"4ff956ca12f1d0931fb30fb6827873d2"},{url:"/media/low.png",revision:"557f65518e6ad79fc75c8d0b3ac640df"},{url:"/media/transparent.png",revision:"2fd93edd26291f25f2569d142c313acf"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
