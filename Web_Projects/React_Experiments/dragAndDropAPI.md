https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

重点看MDN中对以下:bangbang:的内容的解释





The core idea of the HTML5 Drag and Drop API is to provide an easy and interactive way to move data (usually elements) around a web page. It is designed to enhance the user experience by enabling drag-and-drop interactions within the browser, mimicking a natural, physical interaction that users might have with objects on a desktop interface. Here's a breakdown of the core concepts:

1. **Draggable Elements**: To enable drag-and-drop, certain elements on the webpage must be designated as 'draggable'. This is typically done by setting the `draggable` attribute to `true` on those elements.
2. :bangbang: **Drag Events**: The API defines a series of events that are fired during the drag-and-drop process. These include:
   - `dragstart`: Fired when the user starts dragging an element.
   - `drag`: Continuously fired as the element is being dragged.
   - `dragend`: Fired when the drag action ends (either by dropping the element or cancelling the action).
3. :bangbang: **Drop Targets**: Areas where draggable elements can be dropped are defined as drop targets. For an element to become a drop target, you generally need to prevent the default handling of certain events, particularly the `dragover` event.
   + **Handling the Drop**: When an element is dropped onto a target, the `drop` event is fired. In the event handler for this event, you typically retrieve the data from the `DataTransfer` object and perform the desired action, like moving an element in the DOM.
4. :bangbang: **Data Transfer**: The `DataTransfer` object is a crucial part of this API. <u>It is used to hold the data that is being dragged during a drag-and-drop operation.</u> This object is accessible from the drag event and is used to transfer data from the source element (where the drag started) to the target element (where the element is dropped).
5. **Feedback and Effects**: The API also allows for visual feedback during a drag-and-drop operation. For example, you can set a custom drag image or use the `dropEffect` property to control the cursor's appearance, indicating the type of operation that's taking place (like copy, move, or link).



Use Cases: 

The Drag and Drop API is versatile and can be used for a variety of purposes, <span style="color:yellow">from reordering lists to uploading files.</span> It simplifies complex interactions by providing a native HTML/JavaScript solution, eliminating the need for extensive custom scripting or reliance on third-party libraries for these functionalities. 



For more detailed information, you can refer to the resources provided earlier from MDN Web Docs, W3Schools, and LogRocket Blog.