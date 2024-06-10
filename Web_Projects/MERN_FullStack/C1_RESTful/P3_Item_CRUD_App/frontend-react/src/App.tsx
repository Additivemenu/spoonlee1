import React, { useEffect, useState } from "react";

import "./App.css";
import { Item } from "./interface/Items";
import {
  createItem,
  deleteItem,
  fetchItemList,
  updateItem,
} from "./utils/http";

function App() {
  const [itemList, setItemList] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItemListData = async () => {
      try {
        const response = await fetchItemList();
        const itemListData = response.data as Item[];
        setItemList(itemListData);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };

    fetchItemListData();
  }, []);

  // handlers --------------------------------
  const handleCreateNewItem = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;

    // alert(`title: ${title}, description: ${description}`);

    try {
      const response = await createItem({ title, description });
      const newItem = response.data as Item;

      setItemList([...itemList, newItem]);
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);

      const updatedItemList = itemList.filter((item) => item.id !== id);
      setItemList(updatedItemList);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleUpdateItem = async (id: string) => {
    try {
      const newTitle = prompt("Enter new title");
      const newDescription = prompt("Enter new description");

      if (!newTitle || !newDescription) {
        return;
      }

      const response = await updateItem(id, {
        title: newTitle,
        description: newDescription,
      });
      const updatedItem = response.data as Item;

      const updatedItemList = itemList.map((item) =>
        item.id === id ? updatedItem : item
      );
      setItemList(updatedItemList);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // jsx -------------------------------------
  const renderItemList = (item: Item, index: number) => {
    return (
      <li key={item.id} style={{}}>
        <div
          style={{
            border: "1px solid black",
            maxWidth: "500px",
            padding: "12px",
          }}
        >
          <h3>
            No.{index + 1} {item.title}
          </h3>
          <p>{item.description}</p>
          <button
            onClick={() => {
              handleDeleteItem(item.id);
            }}
          >
            Delete Me!
          </button>
          <button
            onClick={() => {
              handleUpdateItem(item.id);
            }}
          >
            Update Me!
          </button>
        </div>
      </li>
    );
  };

  const renderCreateItemForm = () => {
    return (
      <form onSubmit={handleCreateNewItem}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "6px",
          }}
        >
          <label htmlFor="title">title</label>
          <input type="text" id="title" style={{ maxWidth: "70%" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "6px",
          }}
        >
          <label htmlFor="description">description</label>
          <textarea id="description" />
        </div>
        <button>Create</button>
      </form>
    );
  };

  return (
    <div className="App">
      <h2>item list</h2>

      <ul style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {itemList.map((item, index) => renderItemList(item, index))}
      </ul>

      <div
        style={{
          maxWidth: "500px",
          border: "1px black solid",
          padding: "6px",
          borderRadius: "6px",
        }}
      >
        <h2>create item</h2>
        {renderCreateItemForm()}
      </div>
    </div>
  );
}

export default App;
