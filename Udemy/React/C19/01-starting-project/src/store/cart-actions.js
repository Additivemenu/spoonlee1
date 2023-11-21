import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// async code should always be outside of the reducer function
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    // async code define
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-79df7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT", // ! overwrite the existing data
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    // async code execution
    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-redux-79df7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      ); // !
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};
