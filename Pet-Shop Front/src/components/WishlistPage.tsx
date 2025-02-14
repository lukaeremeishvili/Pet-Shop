import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../store/cartSlice";
import {
  removeFromWishlist,
  moveToCart,
  selectWishlist,
  clearWishlist,
} from "../store/wishlistSlice";
import { useState, useEffect } from "react";
import { convertCurrency } from "../Services/exchange";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlist).items;

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

      for (const item of wishlistItems) {
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

    if (currency && wishlistItems.length > 0) {
      convertPrices();
    }
  }, [currency, wishlistItems, itemCurrencyState]);

  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast.success("Item removed from wishlist");
  };

  const handleMoveToCart = (item: WishlistItem) => {
    if (item.stock > 0) {
      dispatch(moveToCart({ item, stock: item.stock }));
      dispatch(addToCart({ ...item, quantity: 1, stock: item.stock }));
      toast.success("Item moved to cart");
    } else {
      toast.error("Out of stock");
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

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-extralight mb-4 text-center">
        Your Wishlist
      </h1>
      {wishlistItems.length === 0 ? (
        <div className="flex justify-center items-center h-64 border-dashed border-2 border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-500">Your wishlist is empty!</p>
        </div>
      ) : (
        <div>
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div className="flex items-center">
                <img
                  src={`${
                    new URL(`../assets/${item.image}`, import.meta.url).href
                  }`}
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
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
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
              onClick={handleClearWishlist}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
