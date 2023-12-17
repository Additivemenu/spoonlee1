1

routing in next.js https://nextjs.org/docs/app/building-your-application/routing







# key takeaways

+ <span style="color: red">By default, components inside `app` are [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components).</span> 
+ A `page.js` file is required to make a route segment publicly accessible.
+ Pages vs. Templates





# Intro



`app` route

+ <span style="color: red">By default, components inside `app` are [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components).</span> This is a performance optimization and allows you to easily adopt them, and you can also use [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components).



## Folders and files

+ **Folders** are used to define routes. 
  + A route is a single path of nested folders, following the file-system hierarchy from the **root folder** down to a final **leaf folder** that includes a `page.js` file.
+ **Files** are used to create UI that is shown for a route segment. 





Route segment

https://nextjs.org/docs/app/building-your-application/routing#route-segments



Nested route

https://nextjs.org/docs/app/building-your-application/routing#nested-routes





## file conventions

https://nextjs.org/docs/app/building-your-application/routing#file-conventions

special files under `app` directory: 

| file name                                                    | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`layout`](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts) | Shared UI for a segment and its children                     |
| [`page`](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages) | Unique UI of a route and make routes publicly accessible     |
| [`loading`](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) | Loading UI for a segment and its children                    |
| [`not-found`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) | Not found UI for a segment and its children                  |
| [`error`](https://nextjs.org/docs/app/building-your-application/routing/error-handling) | Error UI for a segment and its children                      |
| [`global-error`](https://nextjs.org/docs/app/building-your-application/routing/error-handling) | Global Error UI                                              |
| [`route`](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | Server-side API endpoint                                     |
| [`template`](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates) | Specialized re-rendered Layout UI                            |
| [`default`](https://nextjs.org/docs/app/api-reference/file-conventions/default) | Fallback UI for [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) |



:bangbang: other files under `app` directory are not treated as react components by Next



see colocation: https://nextjs.org/docs/app/building-your-application/routing#colocation

+ while folders define routes, only the contents returned by `page.js` or `route.js` are publicly addressable. 就是说, folder对应route segment, 但是只有具有page.js 或者 route.js的folder对应的route, 才routable 可到达





## component hierarchy

上述folder, files是如何被next.js转化为对应的react component tree的

https://nextjs.org/docs/app/building-your-application/routing#component-hierarchy





# Pages & Layouts





## Pages

A page is UI that is **unique** to a route. You can define pages by exporting a component from a `page.js` file. Use nested folders to [define a route](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and a `page.js` file to make the route publicly accessible.

- A page is always the [leaf](https://nextjs.org/docs/app/building-your-application/routing#terminology) of the [route subtree](https://nextjs.org/docs/app/building-your-application/routing#terminology).
- A `page.js` file is required to make a route segment publicly accessible.
- Pages are [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) by default but can be set to a [Client Component](https://nextjs.org/docs/app/building-your-application/rendering/client-components).
- Pages can fetch data. View the [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching) section for more information.



## Layouts

https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts

A layout is UI that is **shared** between multiple pages. 

+ <span style="color:red">On navigation (route changing), layouts preserve state, remain interactive, and do not re-render.</span> Layouts can also be [nested](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#nesting-layouts).

- Layouts are [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) by default but can be set to a [Client Component](https://nextjs.org/docs/app/building-your-application/rendering/client-components).
- Layouts can fetch data. View the [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching) section for more information.
- A `layout.js` and `page.js` file can be defined in the same folder. The layout will wrap the page.
- Any route segment can optionally define its own [Layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#nesting-layouts). These layouts will be shared across all pages in that segment.
- and more ... 现在还看不太懂



Root layout

---

https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required



[Meta data: modifying <head>](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#modifying-head)



nested layout

---

https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#nesting-layouts



## Templates

https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates

Templates are similar to layouts in that they wrap each child layout or page. 

Unlike layouts that persist across routes and maintain state, <span style="color:red">templates create a new instance for each of their children on navigation</span>. 

+ This means that when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is **not** preserved, and effects are re-synchronized.



# Linking & navigation

https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating

2 ways to do navigation in Next.js

+ `<Link>` (primary use)
+ `useRouter` hook





## Link

`<Link>` is a built-in component that extends the HTML `<a>` tag to provide [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching) and client-side navigation between routes. 

+ 和react router就很类似了



[use cases of Next.js <Link>](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#examples)

+ linkingt to dynamic route
+ checking active Link 
+ Scrolling to an id 





## useRouter hook

The `useRouter` ([api reference](https://nextjs.org/docs/app/api-reference/functions/use-router)) hook allows you to <u>programmatically</u> change routes.

<span style="color: red">This hook can only be used inside Client Components</span> and is imported from `next/navigation`.



**Recommendation:** Use the `<Link>` component to navigate between routes unless you have a specific requirement for using `useRouter`.







## :question: Dive deeper into navigation

https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works

有点高级, 看不完全懂, 主要是说Next如何对route & navigation做出性能上的优化

后面看多了再回看这个



