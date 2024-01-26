Resource

https://www.youtube.com/watch?v=pUNSHPyVryU&t=5150s
3.5 hrs 

https://github.com/adrianhajdin/project_next13_car_showcase

a demo project that showcasing an array of car models 





# Key takeaways

to use some ui libs, you have to use in client component



some common used tailwind utility class

```css
w-full

relative

h-40

my-2

object-contain

hidden group-hover:flex
```







# Intro

0-5min
project intro

+ typescript
+ tailwind
  + you can look up a utility class in tailwind webpage!







# layout 

## basic project setup

5min -30min



写页头的text和image, 

+ replace global.css, tailwind.config.ts









## layout

30-47minutes

https://github.com/Additivemenu/nextjs-carhub/commit/47c03b924bbdc10f7b366e50591fe4078bf5e1d6



Shared component in root [Layout.tsx](https://github.com/Additivemenu/nextjs-carhub/commit/47c03b924bbdc10f7b366e50591fe4078bf5e1d6#diff-eca96d2c09f31517696a26e1d0be4070e1fbab02831481bed006e275741d030b)

+ [Navbar.tsx](https://github.com/Additivemenu/nextjs-carhub/commit/47c03b924bbdc10f7b366e50591fe4078bf5e1d6#diff-e7b4dc7397284cbc0d49c6bc13d16309470409bda06a199aa6eb9d9d61b573b8)
+ [Footer.tsx](https://github.com/Additivemenu/nextjs-carhub/commit/47c03b924bbdc10f7b366e50591fe4078bf5e1d6#diff-4f34a078049f572f5ebcdf8a3b771ce47c64ec9808cf3acf95a04e1ab72c214d)

> 注意其中用到的常见的tailwind utility class





# main functionality - car browsing
47min-



## car catalogue

47min-1h16min

https://github.com/Additivemenu/nextjs-carhub/commit/a291fce8ec6a37fc7d6d83cd20e9aea9cc942865



we use ui lib: [headless ui](https://headlessui.com/react/combobox#combobox-option)  for some components

+ a good thing is that headless ui supports tailwind

这里主要做了个search bar, 输入字母会有下拉选项 





## Rapid API cars
1h16min-1h44min

we get data from this api call https://rapidapi.com/apininjas/api/cars-by-api-ninjas?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=referral&utm_campaign=DevRel



### CarCard

fetching data using fetch api (in a typical react client component manner)

map data into car card 

adding more options to CustomButton







### CarDetailModal

1h44min-2h03min

just the modal that adds on car card



up here





## car image

2h03min-2h10min



# side functionality

## search
2h13min-

## filtering
2h34min-

## show more



# deployment