2





# Intro

https://nextjs.org/docs/app/building-your-application/rendering

To start, it's helpful to be familiar with three foundational web concepts:

- The [Environments](https://nextjs.org/docs/app/building-your-application/rendering#rendering-environments) your application code can be executed in: the server and the client.
- The [Request-Response Lifecycle](https://nextjs.org/docs/app/building-your-application/rendering#request-response-lifecycle) that's initiated when a user visits or interacts with your application.
- The [Network Boundary](https://nextjs.org/docs/app/building-your-application/rendering#network-boundary) that separates server and client code.







# 1. Server component

https://nextjs.org/docs/app/building-your-application/rendering/server-components



简言之, 如果是server component, 那么一些react hooks以及browser api将无法使用, next的server component有自己的一套state management, data fetching ...的api, 至于具体的实现原理, 见 section 1.3



## 1.1 :bangbang: Benefit of server rendering

https://nextjs.org/docs/app/building-your-application/rendering/server-components#benefits-of-server-rendering

+ performance
  + data fetching
  + Caching
  + bundle size
  + Streaming
+ security
+ SEO optimization



## 1.2 Using server rendering in Next.js

<span style="color:red">By default, Next.js uses Server Components.</span> 

This allows you to automatically implement server rendering with no additional configuration, and you can opt into using Client Components when needed, see [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components).



## 1.3:question: How are server components rendered?

https://nextjs.org/docs/app/building-your-application/rendering/server-components#how-are-server-components-rendered

2 steps: (没看太明白)

+ on server, generate RSC payload and use it to generate html
+ then on the client, first non-interactive html then hydrate



Gpt: how are server components rendered in plain English



maybe check this video;

https://www.youtube.com/watch?v=d2yNsZd5PMs





## 1.4 :bangbang: server rendering strategies 

There are three subsets of server rendering: Static, Dynamic, and Streaming.





### Static rendering (default)

<span style="color:yellow">With Static Rendering, routes are rendered at **build time**, or in the background after [data revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data).</span> 

+ The result is cached and can be pushed to a [Content Delivery Network (CDN)](https://developer.mozilla.org/docs/Glossary/CDN). This optimization allows you to share the result of the rendering work between users and server requests. see more in caching of next.js

Use case: Static rendering is useful when a route has data that is not personalized to the user and can be known at build time, such as a static blog post or a product page.





### Dynamic rendering

more complex than static rendering

<span style="color:yellow">With Dynamic Rendering, routes are rendered for each user at **request time**.</span>

Use case: Dynamic rendering is useful when a route has data that is personalized to the user or has information that can only be known at request time, such as cookies or the URL's search params.





### Streaming

Streaming enables you to progressively render UI from the server. 

Work is split into chunks and streamed to the client as it becomes ready. This allows the user to see parts of the page immediately, before the entire content has finished rendering.





# 2. Client component

https://nextjs.org/docs/app/building-your-application/rendering/client-components

Client Components allows you to write interactive UI that can be rendered on the client at request time. 

In Next.js, client rendering is **opt-in**, meaning you have to <u>explicitly decide what components React should render on the client.</u>



简言之, client component写起来就跟vanilla react 一样了



## 2.1 :bangbang: Benefits of client rendering

There are a couple of benefits to doing the rendering work on the client, including:

- **Interactivity**: Client Components can use state, effects, and event listeners, meaning they can provide immediate feedback to the user and update the UI.
- **Browser APIs**: Client Components have access to browser APIs, like [geolocation](https://developer.mozilla.org/docs/Web/API/Geolocation_API) or [localStorage](https://developer.mozilla.org/docs/Web/API/Window/localStorage), allowing you to build UI for specific use cases.



## 2.2 Using client rendering in next

https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs

To use Client Components, you can add the React [`"use client"` directive](https://react.dev/reference/react/use-client) at the top of a file, above your imports.

:bangbang: note: `"use client"` is used to declare a [boundary](https://nextjs.org/docs/app/building-your-application/rendering#network-boundary) between a Server and Client Component modules. This means that by defining a `"use client"` in a file, all other modules imported into it, including child components, are considered part of the client bundle



## 2.3:question: How are client components rendered?

https://nextjs.org/docs/app/building-your-application/rendering/client-components#how-are-client-components-rendered

Client Components are rendered differently depending on whether the request is:

+ Full page load https://nextjs.org/docs/app/building-your-application/rendering/client-components#full-page-load
  + just similar to server rendering
+ subsequent navigations
  + On subsequent navigations, Client Components are rendered entirely on the client, without the server-rendered HTML. This means the Client Component JavaScript bundle is downloaded and parsed. Once the bundle is ready, React will use the RSC Payload to reconcile the Client and Server Component trees, and update the DOM.







# 3. Composition pattern

When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. 



简言之, 如何同时使用server AND client component 



## 3.1 :bangbang: when to use server and client components

https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#when-to-use-server-and-client-components





## 3.2 server component patterns

+ [Sharing data between components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#sharing-data-between-components)
+ [Keeping Server-only Code out of the Client Environment](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment)
+ [Using Third-party Packages and Providers](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-third-party-packages-and-providers)





## 3.3 client component patterns

+ [Moving Client Components Down the Tree](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#moving-client-components-down-the-tree)
  + good practice: just keep the interactive component as client component
+ [Passing props from Server to Client Components (Serialization)](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#passing-props-from-server-to-client-components-serialization)



## 3.3 :bangbang: Interleaving server and client components

When interleaving Client and Server Components, it may be helpful to visualize your UI as a tree of components. <span style="color:yellow">Starting with the [root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required), which is a Server Component, you can then render certain subtrees of components on the client by adding the `"use client"` directive.</span>

Within those client subtrees, you can still nest Server Components or call Server Actions, however there are some things to keep in mind:

- During a request-response lifecycle, your code moves from the server to the client. If you need to access data or resources on the server while on the client, you'll be making a **new** request to the server - not switching back and forth.
- When a new request is made to the server, all Server Components are rendered first, including those nested inside Client Components. The rendered result (RSC Payload) will contain references to the locations of Client Components. Then, on the client, React uses the RSC Payload to reconcile Server and Client Components into a single tree.

- Since Client Components are rendered after Server Components, you cannot import a Server Component into a Client Component module (since it would require a new request back to the server). Instead, you can pass a Server Component as `props` to a Client Component. See the [unsupported pattern](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#unsupported-pattern-importing-server-components-into-client-components) and [supported pattern](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props) sections below.





# Runtime choices

https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes

需要再看

Edge runtime



Node.js runtime



serverless runtime