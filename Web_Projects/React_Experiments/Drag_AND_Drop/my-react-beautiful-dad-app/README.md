resource: 

https://www.youtube.com/watch?v=YJ5EMzyimfc&t=141s

https://github.com/harblaith7/React-Beautiful-DND


+ exactly what we want




check out more react beautiful DAD demo at https://react-beautiful-dnd.netlify.app/?path=/story/single-vertical-list--basic


:bangbang: turn off strict mode so that react beautiful DAD can work!


# 1-layer drag and drop list
0-26min: simple 1 layer container for a list of items

DragDropContext
+ <></>

Droppable
+ essentially a div
+ need placeholder to keep its size during dragging an element inside
Draggable
+ can be any element tag

App.js

+ 注意此时我们还没有handle drag drop event, 所以你拖拽之后会变灰原样

```js
import "./App.css";
import { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

function App() {
  const [stores, setStores] = useState(DATA);

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext
          onDragEnd={() => {
            console.log("drop drop event occured!");
          }}
        >
          <div className="header">
            <h1>Shopping List</h1>
          </div>

          {/* ! children to Droppable and Draggable has to be function ! */}
          <Droppable droppableId="ROOT" type="group">
            {/* provided is the argument of the children function */}
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {stores.map((store, index) => (
                    <Draggable
                      draggableId={store.id}
                      key={store.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="store-container"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <h3>{store.name}</h3>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
```


## :bangbang: handle drag and drop event
we would adjust the state as per the drag and drop behaviour

App.js

+ 注意给 `DragDropContext` bound的onDragEnd callback

  + 这个callback会自动接受一个result object as argument, 里面有drag & drop 的容器信息, 以及source, destination信息, 这些信息是react beautiful DAD提供的蓝图信息, 我们利用这些信息来操作实际的state进而操作ui

  

  > Source, destination 含有的信息: 
  >
  > + 拖拽的是哪一个`Draggable`, 
  > + 从哪一个`Droppable` container的第几个位置拖拽到哪一个`Droppable` container的第几个位置
  > + 如果是Droppable 嵌套, 那么是Drop 到了第几层的Droppable
  >   + 完成体代码是通过Droppable的type来确定的

```js
import "./App.css";
import { useState, useEffect } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

function App() {
  const [stores, setStores] = useState(DATA);

  useEffect(()=>{
    console.log(`inside useEffect: `, stores )
  },[stores])

  const handleDragDrop = (results) => {
    console.log("hello, there!", results);

    const { source, destination, type } = results;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // change the state as per drag drop result
    if (type === "group") {
      const reorderedStores = [...stores];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="header">
            <h1>Shopping List</h1>
          </div>

          {/* ! children to Droppable and Draggable has to be function ! */}
          <Droppable droppableId="ROOT" type="group">
            {/* provided is the argument of the children function */}
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {stores.map((store, index) => (
                    <Draggable
                      draggableId={store.id}
                      key={store.id}
                      index={index}
                    >
                      {/* provided is the argument of the children function */}
                      {(provided) => (
                        <div
                          className="store-container"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <h3>{store.name}</h3>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {/* ! placeholder is to ensure the droppable container not shrink its size when we drag a draggable component */}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
```





# 2-layers drag and drop list



App.js

+ 完全体

```js
import "./App.css";
import { useState, useEffect } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

function App() {
  const [stores, setStores] = useState(DATA);

  useEffect(() => {
    console.log(`inside useEffect: `, stores);
  }, [stores]);

  const handleDragDrop = (results) => {
    // console.log("hello, there!", results);

    const { source, destination, type } = results;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      console.log("drag and drop to the same place");
      return;
    }

    // ! moving stores (layer-2 container)
    if (type === "group") {
      console.log("moving stores -------------", results);

      const reorderedStores = [...stores];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);

      return setStores(reorderedStores);
    }

    // ! moving items between stores or within a store (items in layer-2 container)
    console.log( "moving items --------------", results);

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );
    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, deletedItem);

    // update the stores state
    const newStores = [...stores];
    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(newStores);
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="header">
            <h1>Shopping List</h1>
          </div>

          {/* ! children to Droppable and Draggable has to be function ! */}
          {/* this Droppable is the layer-1 container: for store reordering  */}
          <Droppable droppableId="ROOT" type="group">
            {/* provided is the argument of the children function */}
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {stores.map((store, index) => (
                    <Draggable
                      draggableId={store.id}
                      key={store.id}
                      index={index}
                    >
                      {/* provided is the argument of the children function */}
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <StoreList {...store} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {/* ! placeholder is to ensure the droppable container not shrink its size when we drag a draggable component */}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

function StoreList({ name, items, id }) {
  return (
    // layer-2 container: for item reordering or swapping between stores
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {/* part1: header */}
          <div className="store-container">
            <h3>{name}</h3>
          </div>
          {/* part2: body */}
          <div className="items-container">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="item-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <h4>{item.name}</h4>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default App;
```

