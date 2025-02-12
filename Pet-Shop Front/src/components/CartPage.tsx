import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { useState, useEffect } from "react";
import { convertCurrency } from "../Services/exchange";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
}

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: { cart: { items: CartItem[] } }) => state.cart.items
  );

  const [currency, setCurrency] = useState<"USD" | "GEL">("GEL");
  const [itemCurrencyState, setItemCurrencyState] = useState<{
    [key: string]: "USD" | "GEL";
  }>({});
  const [convertedPrices, setConvertedPrices] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") as
      | "USD"
      | "GEL"
      | null;
    const initialCurrency = savedCurrency || "GEL";
    setCurrency(initialCurrency);

    const savedItemCurrencies = localStorage.getItem("itemCurrencies");
    if (savedItemCurrencies) {
      setItemCurrencyState(JSON.parse(savedItemCurrencies));
    }
  }, []);

  useEffect(() => {
    if (currency) {
      localStorage.setItem("currency", currency);
    }
    if (Object.keys(itemCurrencyState).length > 0) {
      localStorage.setItem("itemCurrencies", JSON.stringify(itemCurrencyState));
    }
  }, [currency, itemCurrencyState]);

  useEffect(() => {
    const convertPrices = async () => {
      const newConvertedPrices: { [key: string]: number } = {};
      for (const item of cartItems) {
        const itemCurrency = itemCurrencyState[item.id] || currency;
        if (itemCurrency === "USD") {
          const usdPrice = await convertCurrency(item.price, "GEL", "USD");
          if (usdPrice !== null) {
            newConvertedPrices[item.id] = usdPrice;
          }
        }
      }
      setConvertedPrices(newConvertedPrices);
    };

    if (currency && cartItems.length > 0) {
      convertPrices();
    }
  }, [currency, cartItems, itemCurrencyState]);

  const handleIncreaseQuantity = (id: string, stock: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity < stock) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleCheckout = async () => {
    try {
      const apiKey = import.meta.env.VITE_CRUDAPI_KEY;
      const apiUrl = import.meta.env.VITE_API_URL;

      const updateStockPromises = cartItems.map(async (item) => {
        const newStock = item.stock - item.quantity;
        if (newStock >= 0) {
          const response = await fetch(
            `${apiUrl}/animals-with-categories/${item.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({ stock: newStock }),
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `Failed to update stock for ${item.name}: ${errorText}`
            );
          }
        }
      });

      await Promise.all(updateStockPromises);

      dispatch(clearCart());
      toast.success("Checkout successful! Stock updated and cart cleared.");
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
      console.error(error);
    }
  };

  const toggleCurrencyForItem = async (
    itemId: string,
    currentPrice: number
  ) => {
    const newItemCurrency = itemCurrencyState[itemId] === "USD" ? "GEL" : "USD";
    setItemCurrencyState((prev) => {
      const newState: { [key: string]: "USD" | "GEL" } = {
        ...prev,
        [itemId]: newItemCurrency,
      };
      localStorage.setItem("itemCurrencies", JSON.stringify(newState));
      return newState;
    });

    const newConvertedPrices: { [key: string]: number } = {
      ...convertedPrices,
    };

    if (newItemCurrency === "USD") {
      const usdPrice = await convertCurrency(currentPrice, "GEL", "USD");
      if (usdPrice !== null) {
        newConvertedPrices[itemId] = usdPrice;
      }
    } else {
      newConvertedPrices[itemId] = currentPrice;
    }

    setConvertedPrices(newConvertedPrices);
  };

  const getCurrencySymbol = (currency: "USD" | "GEL") => {
    return currency === "USD" ? "$" : "₾";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-extralight mb-4 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center h-64 border-dashed border-2 border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-500">Your cart is empty!</p>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div className="flex items-center">
                <img
                src={`${new URL(`../assets/${item.image}`, import.meta.url).href}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <p>{item.name}</p>
                  <p>
                    Price:{" "}
                    {itemCurrencyState[item.id] === "USD" ? (
                      <span>
                        {getCurrencySymbol("USD")}
                        {(convertedPrices[item.id] ?? item.price).toFixed(2)}
                      </span>
                    ) : (
                      <span>
                        {getCurrencySymbol("GEL")}
                        {(convertedPrices[item.id] ?? item.price).toFixed(2)}
                      </span>
                    )}
                  </p>
                  <p>Stock: {item.stock}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(item.id, item.stock)
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
                <button
                  onClick={() => toggleCurrencyForItem(item.id, item.price)}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {itemCurrencyState[item.id] === "USD"
                    ? "Convert to GEL"
                    : "Convert to USD"}
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-yellow-500 text-white rounded-md"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
