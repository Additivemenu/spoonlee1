Sure, here are some examples of CSS selectors:

1. **Type selectors**: Selects all elements that match the given node name.
    ```css
    p {
        color: blue;
    }
    ```
   This will select all `<p>` elements in your HTML.

2. **Class selectors**: Selects all elements that have the given class attribute.
    ```css
    .myClass {
        color: blue;
    }
    ```
    This will select all elements with `class="myClass"`.

3. **ID selectors**: Selects an element based on the id attribute. IDs should be unique within a page.
    ```css
    #myID {
        color: blue;
    }
    ```
    This will select the element with `id="myID"`.

4. **Attribute selectors**: Selects elements based on attribute value.
    ```css
    a[target="_blank"] {
        color: blue;
    }
    ```
    This will select all `<a>` elements with `target="_blank"`.

5. **Pseudo-class selectors**: Selects elements based on a certain state.
    ```css
    p:hover {
        color: blue;
    }
    ```
    This will select and style a `<p>` element when you hover over it.

6. **Descendant selectors (space)**: Select an element that is a descendant of another element (not just a direct child).
    ```css
    div p {
        color: blue;
    }
    ```
    This will select all `<p>` elements that are descendants of a `<div>`.

7. **Child selectors (>)**: Select an element that is a direct child of another element.
    ```css
    div > p {
        color: blue;
    }
    ```
    This will select all `<p>` elements that are direct children of a `<div>`.

8. **Adjacent sibling selectors (+)**: Select an element that is directly after another specific element.
    ```css
    div + p {
        color: blue;
    }
    ```
    This will select the first `<p>` element immediately following a `<div>`.

9. **General sibling selectors (~)**: Select elements that are siblings of a specified element.
    ```css
    h1 ~ p {
        color: blue;
    }
    ```
    This will select all `<p>` elements that are siblings of an `<h1>` (i.e., they share the same parent).

10. **Universal selectors (*)**: Selects all elements.
    ```css
    * {
        color: blue;
    }
    ```
    This will select and style all elements.

Remember, these selectors can be combined to create very specific rules. For example, `p.class1#id1` would select a `<p>` element with the class of "class1" and the ID of "id1".