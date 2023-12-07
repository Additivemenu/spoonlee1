Resource:

https://www.youtube.com/watch?v=ucX2zXAZ1I0&t=509s

11hrs tut

this is just notes, code is in another repo

snapshots of repo is created on different branches. 这样做有很多好处

+ 易于创建repo在不同阶段的snapshot, 并且直接将snapshot关联到笔记中, 不需要在笔记中粘贴大段代码
+ 利用repo snapshot, 可以在不同的阶段进行调试与修改
+ 开发历程更加明确, 回头复习看会更加明晰



features

+ payment & susbscription
+ PDF uploader & viewer
  + intuitive drag & drop upload
+ use ui lib 'shadcn-ui'
+ LangChain for AI memory
+ modern data fetching using tRPC & Zod
+ Prisma as our ORM







THe Saas building process overview

Landing Page & Navigation -> Auth -> Functionality -> Payment & Launch



# 1. Creating landing page

snapshot: https://github.com/Additivemenu/nextjs-quill/tree/01-init-globalcss-tailwindcss-setup



## Dummy landing page

10min-24min



[MaxWidthWrapper.tsx](https://github.com/Additivemenu/nextjs-quill/blob/01-init-globalcss-tailwindcss-setup/src/components/MaxWidthWrapper.tsx)

+ a wrapper component 




```ts
npm i clsx tailwind-merge
```

[src/lib/utils.ts](https://github.com/Additivemenu/nextjs-quill/blob/01-init-globalcss-tailwindcss-setup/src/lib/utils.ts)

+ use `clsx` and `tailwind-merge` for styling cascading



[pages](https://github.com/Additivemenu/nextjs-quill/blob/01-init-globalcss-tailwindcss-setup/src/app/page.tsx) & [layout](https://github.com/Additivemenu/nextjs-quill/blob/01-init-globalcss-tailwindcss-setup/src/app/layout.tsx) for init dummy landing page

+ watch for how to do styling cascading



## styling config



24min-35min

use shadcn's theme (blue I chosen https://ui.shadcn.com/themes) config for global.css

[global.css](https://github.com/Additivemenu/nextjs-quill/blob/01-init-globalcss-tailwindcss-setup/src/app/globals.css)



Tailwind config 

+ link the css variables we just defined in global.css with tailwind

```ts
// we will use below dependency as plugin in tailwind config 
npm i tailwindcss-animate @tailwindcss/typography
```

[tailwind.config.ts](https://github.com/Additivemenu/nextjs-quill/blob/01-init-globalcss-tailwindcss-setup/tailwind.config.ts)





# 2. Making landing page look awesome

35min- 1h11min

snapshot: https://github.com/Additivemenu/nextjs-quill/tree/02-making-landing-page-look-awesome





add button from a ui lib

---

35-45min

```ts
// for icon
npm i lucide-react
```

we continue to use shadcn as ui lib

https://ui.shadcn.com/docs/components/button













add color gradient styling for home page

---

45min-

有点秀, 高级的css做视觉效果





add PDF preview img

---





feature section

---

58min-

just chunks of text and Link







add uploading pdf preview img at the bottom of home page

1h07min-





grainy effect

---

1h10min-

高级的css视觉纹理效果





# 3. Adding navbar

1h11min-1h20min







# 4. Adding Authentication