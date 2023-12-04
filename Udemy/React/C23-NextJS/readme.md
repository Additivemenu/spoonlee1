Intro to Next.js



3hrs 



# key takeaways

:bangbang::bangbang::pencil:[what is Nextjs? why](./sub_topics/why_nextjs.md) 





file-based routing & Page pre-rendering

+ [routing in next](https://nextjs.org/docs/app/building-your-application/routing)
  + `<Link>`







server component vs. client component

+ check C11 **When to use the `useSearchParams()` hook vs. the `searchParams` prop?**

:bangbang::pencil: [server components vs. client components](./sub_topics/server_client_components.md)



data fetching & adding an API

+ Static & dynamic rendering
+ streaming
  + granularity of loading dynamic component (e.g. components relying on data fetching)
    + `<Suspense>`
    + loading.tsx



use url search params

+ check C11



best practice: debouncing  (a programming practice, nothing to do with Next.js)

+ implement it by yourself
+ use 3rd party lib e.g. `use-debounce`



# Intro

a fullstack framework for react.js / a react framework for production

+ Next.js solves common problems and make it easier to build react



## key features

Server-side rendering

+ next.js allows automatic page pre-rendering before sending html to the client
  +  great for SEO and inital load
+ blending client-side and server-side.
  +  Fecth data on the server and render finished pages

file-based routing

+ react router needs code to define routing logics, 
+ but Nest.js gets rid of that code-based routing: it defines pages and routes with files and folders instead of code
  + Less code, less work, more understandable

build fullstack app

+ easily add backend (server-side) code to your Next/React apps
+ CRUD data, authentication etc. can be added to your react projects



# Hands-on

p532-



create a Next project

https://nextjs.org/docs/getting-started/installation



the starting project file structure changed after running `npx create-next-app` compared to the lec

```js
> pages
> public 
> styles
```

:bangbang: it seems the lec content has outdated, when run `npm run dev` pop environment issues

stop learning !



# :gem: Learn Next js with vercel tut

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
  + <img src="./src_md/colocate1.png" style="zoom:50%;" />





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

    + <img src="./src_md/layout1.png" style="zoom:50%;" />

    

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
+  a good fit for a dashboard that has personalized data that is regularly updated.
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





## adding search and pagenation

C11

https://nextjs.org/learn/dashboard-app/adding-search-and-pagination



In the previous chapter, you improved your dashboard's initial loading performance with streaming. Now let's move on to the `/invoices` page, and learn how to add search and pagination!

+ Learn how to use the Next.js APIs: `searchParams`, `usePathname`, and `useRouter`.

+ Implement search and pagination using URL search params.



to implement the searching, we [use url search param](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#why-use-url-search-params)



[Adding the search functionality](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#adding-the-search-functionality)

---

These are the Next.js client hooks that you'll use to implement the search functionality:

- **`useSearchParams`**- Allows you to access the parameters of the current URL. For example, the search params for this URL `/dashboard/invoices?page=1&query=pending` would look like this: `{page: '1', query: 'pending'}`.
- **`usePathname`** - Lets you read the current URL's pathname. For example, for the route `/dashboard/invoices`, `usePathname` would return `'/dashboard/invoices'`.
- **`useRouter`** - Enables navigation between routes within client components programmatically. There are [multiple methods](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter) you can use.

```ts
// steps to implement the searching
1. Capture the user's input.
2. Update the URL with the search params.
3. Keep the URL in sync with the input field.
4. Update the table to reflect the search query.
```



:moon: [best practice: debouncing](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#best-practice-debouncing): a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

```ts
How Debouncing Works:

1. Trigger Event: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
2. Wait: If a new event occurs before the timer expires, the timer is reset.
3. Execution: If the timer reaches the end of its countdown, the debounced function is executed.
```



[adding pagination](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#adding-pagination)

---

up here







# Learn Next.js in 30 mins

youtube: web dev simplify - a todo list app with database



```ts
npx create-next-app@latest		// use typescript, eslint, tailwind
```

database setup

```ts
npm i prisma --save-dev
npx prisma init --datasource-provider sqlite

// write prisma model code...

npx prisma migrate dev --name init
```





