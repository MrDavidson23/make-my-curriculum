if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const u=e=>n(e,c),r={module:{uri:c},exports:t,require:u};s[c]=Promise.all(i.map((e=>r[e]||u(e)))).then((e=>(a(...e),t)))}}define(["./workbox-5afaf374"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/YuJUCP300GuP-8PJChQg9/_buildManifest.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/YuJUCP300GuP-8PJChQg9/_ssgManifest.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/3890-41f114fce0b2013afd61.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/4841-743066c6688861e00476.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/6800-bf1a78470c1ea77ae8f8.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/7032-b8d2e1f9149bda836bf0.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/74fdba35-e24e003400d135967f3b.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/75fc9c18-2a20c2e7f10e4bdea475.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/7942-d29731587017389bb90d.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/895-f6ce7a24cbbc2d64384c.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/9207-81c8c86a43453e07abe0.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/9535-27a9bed8545137e91cec.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/a908dc70-7acde1dc7c7c2bfba518.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/c9184924-c8a5d863e8bd7a77744f.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/framework-e611b2a542a1836d2ca4.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/main-b71ea7f9bf8dbd288679.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/404-2ed5cbe8270319613895.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/_app-1a5825121cdaad7e8a0e.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/_error-cd3a4dcc303cc09fa80f.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/_offline-17b502e2286afe8a3c24.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/academic-educations-bc7f1ef384a45e106f16.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/academic-educations/%5BacademicEducationId%5D-369866f453f7488bdff9.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/academic-educations/%5BacademicEducationId%5D/edit-56b10132e5a2456cecab.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/academic-educations/new-c6454c7ff9e7022de545.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/curricula-6c129e48a4a0ab925ace.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/curricula/%5BcurriculumId%5D-4881a427d6d88f1da8db.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/curricula/%5BcurriculumId%5D/edit-e73496f1c145126984b4.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/curricula/%5BcurriculumId%5D/pdf-view-8f101d7e5b8d4d0db162.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/curricula/new-3f37e2f5d0d704eac6b2.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/forgot-password-12da7c328f58823420ec.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/identification-types-d3e8d74a2fef5e0f0b96.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/identification-types/%5BidentificationTypeId%5D-de53d15406a027c2639c.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/identification-types/%5BidentificationTypeId%5D/edit-cbccd13ab0d5dfa647ee.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/identification-types/new-318d672af12449f7569e.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/index-0c28f7170635792c84e5.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/laboral-experiences-1d489b3b6ec49e58a875.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/laboral-experiences/%5BlaboralExperienceId%5D-e3da5cb1614085f77fa3.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/laboral-experiences/%5BlaboralExperienceId%5D/edit-a4bc5dd8a6519acebe99.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/laboral-experiences/new-364090fefa1cc558ad61.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/languages-ce97cb4d20d381f317b7.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/languages/%5BlanguageId%5D-fd78d3b18f969e83d993.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/languages/%5BlanguageId%5D/edit-95c4896dbca90d2703f1.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/languages/new-4a65396a4b3b8dd429e8.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/login-4664c32583a7742812f6.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/muicomponents-85355e3fb9b334d0e09c.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/phones-9321a1db4181abb3a66c.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/phones/%5BphoneId%5D-f9536d1aa95fff581f92.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/phones/%5BphoneId%5D/edit-c30dbfb8d597ef38a16c.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/phones/new-452ea1fe3ea58b8f03d2.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/publications-7cb1de395676bf035699.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/publications/%5BpublicationId%5D-09f069d4db09259595ab.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/publications/%5BpublicationId%5D/edit-7b26268eea299b52d690.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/publications/new-bd8487fae853ac867548.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/references-e5ff5981067b36ca37b8.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/references/%5BreferenceId%5D-5d8faf286d98888b4fa3.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/references/%5BreferenceId%5D/edit-50fa63c1f628cc40a657.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/references/new-ebbdfc73541df1941d59.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/reset-password-723e4c37ceb048515cf8.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/signup-accbeaf897f4d1d926c6.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/skills-69f96f16ede09a29dcd8.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/skills/%5BskillId%5D-2f0af6baf973b104fbb9.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/skills/%5BskillId%5D/edit-4f003263ea9bce4dab78.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/skills/new-e772e22c85c61569e0a4.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/technical-educations-1f56c39a89ab0831a162.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/technical-educations/%5BtechnicalEducationId%5D-5e3cc0a3344dfc52c44e.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/technical-educations/%5BtechnicalEducationId%5D/edit-b4c497db23a5425a0ff6.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/technical-educations/new-d6fc54654935bce93172.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/templates-7d798604a8b9c28c9f18.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/templates/%5BtemplateId%5D-bbc5fb881b89df8a821a.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/templates/%5BtemplateId%5D/edit-61a2f666e596b9d340e2.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/templates/new-18005b0cca2c8ca058b9.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/users-344c43bbaa0c59c70d6a.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/users/%5BuserId%5D-f589edfd1eaa11df3a0d.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/pages/users/%5BuserId%5D/edit-51c7ec4b0be5f0660897.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/polyfills-b69b38e0e606287ba003.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/chunks/webpack-b2ec616955ce2765cf5c.js",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/css/8f5be552e2e8b49d9998.css",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/image/public/logo.67af55b936cfcb03fd400bb8d1d7dc71.png",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/_next/static/image/public/logoOnly.4f5e6086fd010c142ca8837e6c8ab97f.png",revision:"YuJUCP300GuP-8PJChQg9"},{url:"/favicon.ico",revision:"1b71789cb5f08b172a127eb6930d4392"},{url:"/logo.png",revision:"4f44978a78402eac209b5bd99b1a59d9"},{url:"/logoOnly.png",revision:"ff9cf3f4db3eacb03cdc2d38f5cb5d44"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
