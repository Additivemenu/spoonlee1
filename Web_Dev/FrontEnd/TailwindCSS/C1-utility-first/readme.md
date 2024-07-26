1



# Utility first fundamentals

https://tailwindcss.com/docs/utility-first

vanilla CSS: Using a traditional approach where custom designs require custom CSS

+ cumbersome css classes naming, css class binding to HTML element

Tailwind CSS: Using `utility classes` to build custom designs without writing CSS

+ cleaner styling code
+ no need to invent css class name
+ easier to maintain styling code
  + making changes feels safer
  + maintaining HTML is easier than CSS 



utility class vs. inline styling 

---

But using utility classes has a few important advantages over inline styles:

- **Designing with constraints**. Using inline styles, every value is a magic number. With utilities, you’re choosing styles from a predefined [design system](https://tailwindcss.com/docs/theme), which makes it much easier to build visually consistent UIs.
- **Responsive design**. You can’t use media queries in inline styles, but you can use Tailwind’s [responsive utilities](https://tailwindcss.com/docs/responsive-design) to build fully responsive interfaces easily.
- **Hover, focus, and other states**. Inline styles can’t target states like hover or focus, but Tailwind’s [state variants](https://tailwindcss.com/docs/hover-focus-and-other-states) make it easy to style those states with utility classes.



maintainability concerns 

---

The biggest maintainability concern when using a utility-first approach is managing commonly repeated utility combinations.

This is easily solved by [extracting components and partials](https://tailwindcss.com/docs/reusing-styles#extracting-components-and-partials), and using [editor and language features](https://tailwindcss.com/docs/reusing-styles#using-editor-and-language-features) like multi-cursor editing and simple loops.



# :bangbang: Utility classes

the main doc that you should refer to 



tailwind breaks following utility classes categories:

| topic | Comments                  |      |
| ----- | ------------------------- | ---- |
| 1     | :bangbang: Layout         |      |
| 2     | :bangbang: Flexbox & grid |      |
| 3     | :moon: spacing            |      |
| 4     | :moon: Sizing             |      |
| 5     | :moon: Typography         |      |
| 6     | :moon: backgrounds        |      |
| 7     | :bangbang: Borders        |      |
| 8     | :bangbang: Effects        |      |
| 9     | Filters                   |      |
| 10    | Tables                    |      |
| 11    | Transitions & Animations  |      |
| 12    | Transform                 |      |
| 13    | Interactivity             |      |
| 14    | SVG                       |      |
| ...   |                           |      |





## Handling Hover, Focus & other states

https://tailwindcss.com/docs/hover-focus-and-other-states





## Responsive Design

https://tailwindcss.com/docs/responsive-design
