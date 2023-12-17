notes made based on vercel docs and official tut





:bangbang: see Next.js basics at, should make notes for these

https://nextjs.org/docs/app/building-your-application/routing

 https://nextjs.org/docs/app/building-your-application/data-fetching

https://nextjs.org/docs/app/building-your-application/rendering





# 0. key takeaways

:bangbang::bangbang::pencil:[what is Nextjs? why](./sub_topics/why_nextjs.md) 

+ rendering 
+ Routing & pages
+ better development experiences







file-based routing & Page pre-rendering

+ :bangbang: [routing in next](https://nextjs.org/docs/app/building-your-application/routing) (to be study in details )
  + `<Link>`

```ts
// vercel's next tutorial - file structure
> app: for putting pages & layout, setting up the skeleton & navigation logic
> ui: for putting detailed ui components
> lib: some data fetching logics
```





server component vs. client component

+ check C11 **When to use the `useSearchParams()` hook vs. the `searchParams` prop?**

:bangbang::pencil: [server components vs. client components](./sub_topics/server_client_components.md)



data fetching & adding an API

+ Static & dynamic rendering
+ streaming
  + granularity of loading dynamic component (e.g. components relying on data fetching)
    + `<Suspense>`
    + loading.tsx





:bangbang: use url search params, instead of using client state in react.js way

+ next.js client hooks (`useSearchParams`, `usePathname`, `useRouter`) to read & manipulate the URL <span style="color: red">directly in browser in real-time</span>, insead of saving user input as client state
  + that said, when manipulating the URL, the URL is updated without reloading the page, thanks to Next.js's client-side navigation (which you learned about in the chapter on [navigating between pages](https://nextjs.org/learn/dashboard-app/navigating-between-pages).
  + 其实想想, URL中的query信息也是state, 在react app中我们是利用react state来表达这种信息的, 只是这里更进一步将这种特殊的状态信息做成了hook, 这样在开发时对URL的info进行CRUD时会更加便捷 (e.g. 我全局的组件都可以利用这些next 的hook 来获取同一个URL里的query info, 而不是还得通过定义react state并在组件间传递这些react state), C11中涉及到query database的状态参数都是直接从URL里拿的. [当然还有其他的好处](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#why-use-url-search-params) .
    + :question: <u>我怀疑当URL改变时, 涉及到使用这3个hooks的component都得re-redner</u>



best practice: debouncing  (a programming practice, nothing to do with Next.js)

+ you can implement it by yourself OR
+ use 3rd party lib e.g. `use-debounce`





C11-C12 总而言之, CRUD这种操作就分两步

+ Step1: allows user to input data and submit the data
+ Step2: capture user input data and launch request to CUD in db
  + 只不过这步在next.js里可以用server action来实现, 相关code集中放在lib>actions.ts



C13 Error handling & fallback ui in Next.js





# 1. :gem: Demo: nextjs-dashboard

an up-to-date Next learning tutorial offered by vercel: 

https://nextjs.org/learn/dashboard-app

see nextjs-dashboard repository ( as this tut will deploy the app on vercel )

+ Uses typescript, tailwind css / css module, eslint 



Next official doc https://nextjs.org/docs/getting-started/project-structure



Getting started

---

C1

project file structure





styling 

---

C2

+ use `tailwind css` or `css modules` to add styling 
+ `clsx` for toggling class names
  + 直接在classname里写conditional className 的代码
    + 其实也可以用 react state 来控制额外的变量, 再让其与className concatnate来写
+ and even more options for styling code (omitted)



optimizing fonts & imgs

---

C3

Images without dimensions and web fonts are common causes of <u>layout shift</u>.

+ next/font: next automatically optimizes the font to improve performance
  + directly use the font in tailwind className
+ Next/imgs:  next automatically optimizes the images to improve performance
  + `Image` component
  + tailwind responsive design



## :bangbang: layout, pages & navigations in next



creating layout and pages

---

C4

file-system routing



`page.tsx` is a special Next.js file that exports a React component, and it's required for the route to be accessible. In your application, you already have a page file: `/app/page.tsx` - this is the home page associated with the route `/`.

+ This is how you can create different pages in Next.js: create a new route segment using a folder, and add a `page` file inside it.
+ next allows colocate ui files
  + This is because while folders define routes, only the contents returned by `page.js` or `route.js` are publicly addressable. 
  + <img src="/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/Udemy/React/C23-NextJS/src_md/colocate1.png" style="zoom:50%;" />





In Next.js, you can use a special `layout.tsx` file to create UI that is shared between multiple pages.

such pattern allows [partial rendering](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#3-partial-rendering) 



+ The `<Layout />` component receives a `children` prop. This child can either be a page or another layout. 

  + ```ts
    import SideNav from '@/app/ui/dashboard/sidenav';
     
    export default function Layout({ children }: { children: React.ReactNode }) {
      return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      );
    }
    ```

  + In your case, the pages inside `/dashboard` will automatically be nested inside a `<Layout />` like so:

    + <img src="/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/Udemy/React/C23-NextJS/src_md/layout1.png" style="zoom:50%;" />

    

Navigating between pages

---

C5

`next/link` 

+ similar to react router, allowing client-side navigation without re-rendering the whole page
  + but \<Link\> in next is gifted with more features, learn more at [how navigation in next works](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)
    + Pre-fetching => space & time trade-off
    + caching 
    + partial rendering
    + Soft navigation
    + ...



show active link

+ `usePathname()` hook to get the current active path name
  + then use this info & react conditional styling to give user visual feedback of active link

```ts
// file > /app/ui/dashboard/nav-links.tsx
'use client';   // ! what is this for ? 

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```



## adding database & intereact with DB directly

setting up database 

---

C6 

https://nextjs.org/learn/dashboard-app/setting-up-your-database



 you'll be 

+ deploy your app to vercel

+ setting up a PostgreSQL database on vercel, and seed it with some init data
  + nothing to do with next, but a vercel eco
  + vercel has its own middleware for interacting with postgresql database `@vercel/postgres`





这个有点6, 直接一条龙



fetching data

---



using server component to fetch data

yes, in next.js app, you would be allow to query database directly without implementing a server logic  by yourself

+ Server Components support promises, providing a simpler solution for asynchronous tasks like data fetching. You can use `async/await` syntax without reaching out for `useEffect`, `useState` or data fetching libraries.

+ Server Components execute on the server, so you can keep expensive data fetches and logic on the server and only send the result to the client. As mentioned before, since Server Components execute on the server, you can query the database directly without an additional API layer.



we will be fetching data for dashboard and visualize those data in the ui

```ts
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';		// !the data fetching logic using vercel/postgresql

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
```



request warterfall vs. parallel data fetching

+ [request waterfall](https://nextjs.org/learn/dashboard-app/fetching-data#what-are-request-waterfalls)

+ [parallel data fetching](https://nextjs.org/learn/dashboard-app/fetching-data#parallel-data-fetching)





## :bangbang: static & dynamic rendering

---

C8

https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering

In the previous chapter, you fetched data for the Dashboard Overview page. However, we briefly discussed two limitations of the current setup:

1. The data requests are creating an unintentional waterfall.
2. The dashboard is static, so any data updates will not be reflected on your application.

we now look at the 2nd problem here



[static rendering](https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#what-is-static-rendering)

+ With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or during [revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data). The result can then be distributed and cached in a [Content Delivery Network (CDN)](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default).
+ Static rendering is useful for UI with **no data** or **data that is shared across users**



[dynamic rendering](https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#what-is-dynamic-rendering)

+ With dynamic rendering, content is rendered on the server for each user at **request time** (when the user visits the page). 
+ a good fit for a dashboard that has personalized data that is regularly updated.
+ challenge: 
  + With dynamic rendering, **your application is only as fast as your slowest data fetch.**
    + we simulated a slow fetch (takes about 3 s) for fetchRevenue(),  it took the dashboard page 3 s to be loaded after user type it in browser



making the dashboard dynamic 

+ developer can control the rendering behaviour to be static or dynamic in the `server component`



## :bangbang: streaming

C9 这节更像是性能优化和提升用户体验(面对react的优化问题?), 控制不同dynamic component (e.g. 依赖fetching data的组件)的loading行为的granularity

https://nextjs.org/learn/dashboard-app/streaming

In the previous chapter, you made your dashboard page dynamic, however, we discussed how the slow data fetches can impact the performance of your application. Let's look at how you can improve the user experience when there are slow data requests.



[what is streaming](https://nextjs.org/learn/dashboard-app/streaming#what-is-streaming)

+ Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready. By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user. 
  + 说人话就是允许并行fetch data, 先fetch好的dynamic component先呈现, 不必拘泥于"共同富裕"



there are two ways of implementing streaming in nextjs: loading.tsx OR `<Suspense>`



option1 at page level: another next special file- `loading.tsx`

+ `loading.tsx` is a special Next.js file built on top of Suspense, it allows you to create fallback UI to show as a replacement while page content loads.
+ Add loading skeleton
  + [route group](https://nextjs.org/docs/app/building-your-application/routing/route-groups): organize the route without affecting the URL path. This helps to apply loading.tsx & page.tsx of dashboard only to the path /dashboard, not cascading downward further



Option2 for specific component:  \<Suspense\>

+ this allows a streaming a specific component, 从而允许各个dynamic component独立地loading, fetch速度慢的component也不会影响fetch速度快的component的呈现, 提升用户体验

+ 2 steps to implement this
  + Step1: wrapp the dynamic component with `<Suspense>`
  + Step2: fetch the data inside dynamic component itself
+ it is also possible to group a few components together and then wrap with a `<Suspense>` to avoid staggered loading 
  + e.g. a group of card can be grouped together





decide the Suspense boundary?  - no right answer, depends on your reqirement

- You could stream the **whole page** like we did with `loading.tsx`... but that may lead to a longer loading time if one of the components has a slow data fetch.
- You could stream **every component** individually... but that may lead to UI *popping* into the screen as it becomes ready.
- You could also create a *staggered* effect by streaming **page sections**. But you'll need to create wrapper components.

Where you place your suspense boundaries will vary depending on your application. In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.





partial rendering (optional)

---

C10

New experiment feature introduced in Next14, can be skipped 





## :full_moon: CRUD invoice data 

for data fetching in Next.js fashion (directly fetch from database in server component)

see official docs at:  https://nextjs.org/docs/app/building-your-application/data-fetching



### R: Adding search and pagenation

C11

https://nextjs.org/learn/dashboard-app/adding-search-and-pagination



In the previous chapter, you improved your dashboard's initial loading performance with streaming. Now let's move on to the `/invoices` page, and learn how to add search and pagination in the flavor of Next.js!

+ Learn how to use the Next.js APIs: `searchParams`, `usePathname`, and `useRouter`.

+ :bangbang: Implement search and pagination using URL search params, insead of using client state 
  +  [why we use url search param](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#why-use-url-search-params)





[Adding the search functionality](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#adding-the-search-functionality)

---



These are the <u>Next.js client hooks</u> that you'll use to implement the search functionality:

+ for capturing URL info

  - **`useSearchParams`**- Allows you to access the parameters of the current URL (pasing your current URL in browser to Js object) 
    - For example, the search params for this URL `/dashboard/invoices?page=1&query=pending` would look like this: `{page: '1', query: 'pending'}`.

  - **`usePathname`** - Lets you read the current URL's pathname. 
    - For example, for the route `/dashboard/invoices`, `usePathname` would return `'/dashboard/invoices'`.
      - together with `useSearchParam`, we can get the URL info in real-time 

- for navigation between routes programmatically
  - **`useRouter`** - Enables navigation between routes within client components programmatically. There are [multiple methods](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter) you can use.
    - it works pretty similar to react router 

Summary: using above next.js client hooks, we will be able to read & manipulate the URL in the browser more easily



```ts
// steps to implement the searching
1. Capture the user's input.
2. Update the URL with the search params.
	 + use the `useSearchParams`, `usePathname`, `useRouter` hooks
3. Keep the URL in sync with the input field.
4. Update the table to reflect the search query.
	 + just read the query data in URL & send query to database to fetch the data
	
```



:moon: [best practice: debouncing](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#best-practice-debouncing): a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

```ts
How Debouncing Works:

1. Trigger Event: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
2. Wait: If a new event occurs before the timer expires, the timer is reset.
3. Execution: If the timer reaches the end of its countdown, the debounced function is executed.
```



:gem: code are mostly in ui > search.tsx





[adding pagination](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#adding-pagination)

---

Just similar to adding seach, we still use url search parameters instead of client state



实现分页的原理

+ table底部的页码本质是`<Link>`, 点击就触发navigate到绑定的URL, 具体如何实现navigation的看 [routing in next](https://nextjs.org/docs/app/building-your-application/routing)



:gem: code are mostly in ui > invoices > pagination.tsx





### CUD: Mutating data

C12 https://github.com/Additivemenu/nextjs-dashboard/tree/C12-mutating-data

In the previous chapter, you implemented search and pagination using URL Search Params and Next.js APIs. 

Now let's do CUD (R just done) invoices

:bangbang: note we will still be using url state to directly extract and manipulate with url



总而言之, CUD这种操作就分两步

+ Step1: allows user to input data and submit the data
+ Step2: capture user input data and launch request to CUD in db
  + 只不过这步在next.js里可以用server action来实现, 相关code集中放在lib>actions.ts



server actions  

learn more athttps://nextjs.org/docs/app/building-your-application/data-fetching

+ React Server Actions allow you to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate your data.
+ React Server Actions also provide security solutions



#### creating an invoice

Here are the steps you'll take to create a new invoice (其实就是用next的fashion来提交一个form的post request):

大多数情况下都可沿用如下步骤



step1: setup component to intake user's input

[code piece1](https://github.com/Additivemenu/nextjs-dashboard/blob/6e74ab2da2e7ccb0ea33d38d15f6f0a2d6d241cb/app/dashboard/invoices/create/page.tsx#L22)

+ Create a form to capture the user's input.
  + Code

+ Create a Server Action and invoke it from the form. [code piece2](https://github.com/Additivemenu/nextjs-dashboard/blob/6e74ab2da2e7ccb0ea33d38d15f6f0a2d6d241cb/app/ui/invoices/create-form.tsx#L15)
  + create a server function in a standalone file (for the sake of cohesion), and attach it to `<form>`



step2: get and parase form data, insert them to db

 [code piece](https://github.com/Additivemenu/nextjs-dashboard/blob/6e74ab2da2e7ccb0ea33d38d15f6f0a2d6d241cb/app/lib/actions.ts#L20-L34)

+ Inside your Server Action, extract the data from the `formData` object.

  + Code

+ Validate and prepare the data to be inserted into your database.

  + ensures Type safety => use [zod](https://zod.dev/):  a TypeScript-first validation library 

+ Insert the data into database and handle any errors (we actually handle errors in next class!)

  + using sql database facade  in next.js

  

step3: post-work to do 

[code piece](https://github.com/Additivemenu/nextjs-dashboard/blob/6e74ab2da2e7ccb0ea33d38d15f6f0a2d6d241cb/app/lib/actions.ts#L36-L38)

+ Revalidate the cache and redirect the user back to invoices page.
  + this is the after-work to do, it may differ case-to-case





#### updating an invoice 



These are the steps you'll take to update an invoice:



sdefine how to navigate to invoices editing page with specific id as param

+ Create a new dynamic route segment with the invoice `id`. 
  + just add corresponding files path to form a new url route
    + [code piece 1](https://github.com/Additivemenu/nextjs-dashboard/blob/C12-mutating-data/app/dashboard/invoices/%5Bid%5D/edit/page.tsx)
    + [update link in invoice table](https://github.com/Additivemenu/nextjs-dashboard/blob/28d19a7ac2da68bb99c46ee4fa8baf8fb06c6fb4/app/ui/invoices/table.tsx#L50) > [button's link to the edit invoices url](https://github.com/Additivemenu/nextjs-dashboard/blob/28d19a7ac2da68bb99c46ee4fa8baf8fb06c6fb4/app/ui/invoices/buttons.tsx#L19)
  + [dynamic route in next](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

+ when navigating to edit invoice page,

  +  get the invoice id from url state
    + [code piece 1](https://github.com/Additivemenu/nextjs-dashboard/blob/28d19a7ac2da68bb99c46ee4fa8baf8fb06c6fb4/app/dashboard/invoices/%5Bid%5D/edit/page.tsx#L6C1-L8C24)

  + Fetch the specific invoice from your database. & Pre-populate the 'edit a invoice form' with the invoice data.
    + [code piece 2](https://github.com/Additivemenu/nextjs-dashboard/blob/28d19a7ac2da68bb99c46ee4fa8baf8fb06c6fb4/app/dashboard/invoices/%5Bid%5D/edit/page.tsx#L9-L12)
    + uuid vs. auto-incrementing id 



step2: after user populated the updating form with data, we then

+ Update the invoice data in your database once user submit the form
  + [define server action](https://github.com/Additivemenu/nextjs-dashboard/blob/28d19a7ac2da68bb99c46ee4fa8baf8fb06c6fb4/app/lib/actions.ts#L42-L62)
  + [bound the server action to form action](https://github.com/Additivemenu/nextjs-dashboard/blob/C12-mutating-data/app/ui/invoices/edit-form.tsx#L25)
    + Instead, you can pass `id` to the Server Action using JS `bind`. 





#### deleting an invoice 

+ [server action for deleting an invoice](https://github.com/Additivemenu/nextjs-dashboard/blob/47c7e9eed09702ba330dfd96626e961dc9ecff6e/app/lib/actions.ts#L66-L69)
+ [get url params and bind the server action with a form](https://github.com/Additivemenu/nextjs-dashboard/blob/47c7e9eed09702ba330dfd96626e961dc9ecff6e/app/ui/invoices/buttons.tsx#L28-L39)





## :moon: Error handling & improving accessibility

C13 https://nextjs.org/learn/dashboard-app/error-handling



就记住: nest有一些特殊的file(e.g. error.tsx, not-found.tsx ...)可以当做fallback ui如果主体ui (page.tsx) throw error 





[code piece: add try catch block for server action](https://github.com/Additivemenu/nextjs-dashboard/blob/0cb217a6ee6bca0a53cac5c48d311334f0ab5218/app/lib/actions.ts#L31-L40)



Option1: How to use the special `error.tsx` file to catch errors in your route segments, and show a fallback UI to the user.

+ [error.tsx](https://github.com/Additivemenu/nextjs-dashboard/blob/0cb217a6ee6bca0a53cac5c48d311334f0ab5218/app/dashboard/invoices/error.tsx#L9-L10)
  + note error.tsx is a client component
  + 应该是接收往下sub-route throw的error并作为fallback ui呈现
  + note its property: error, reset



Option2: How to use the `notFound` function and `not-found` file to handle 404 errors (for resources that don’t exist).

+ [not-found.tsx](https://github.com/Additivemenu/nextjs-dashboard/blob/C13-error-handling-when-CRUD/app/dashboard/invoices/%5Bid%5D/edit/not-found.tsx)
  + [how is it triggered in page.tsx](https://github.com/Additivemenu/nextjs-dashboard/blob/0cb217a6ee6bca0a53cac5c48d311334f0ab5218/app/dashboard/invoices/%5Bid%5D/edit/page.tsx#L14-L16)

+ That's something to keep in mind, `notFound` will take precedence over `error.tsx`, so you can reach out for it when you want to handle more specific errors!



more reading at https://nextjs.org/learn/dashboard-app/error-handling#further-reading





## Improving Accessibility

C14 https://nextjs.org/learn/dashboard-app/improving-accessibility

看到这里





## Adding authentication

C15 https://nextjs.org/learn/dashboard-app/adding-authentication







## Adding metadata

C16 https://nextjs.org/learn/dashboard-app/adding-metadata









# 2. Next for learning Next.js!

https://nextjs.org/learn/dashboard-app/next-steps





