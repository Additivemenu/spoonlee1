Intro to Next.js 3hrs 



:pencil: [learn nextjs from vercel officially](./myNextJS.md)
+ just check out on this, no need to look at this md









# key takeaways





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



vercel's next tutorial - file structure

```ts
> app: for putting pages & layout, setting up the skeleton & navigation logic
> ui: for putting detailed ui components
> lib: some data fetching logics
```







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



just stop learning !  -----------------















# :gem: Learn Next.js in 30 mins

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





