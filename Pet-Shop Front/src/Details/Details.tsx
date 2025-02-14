import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addToWishlist } from "../store/wishlistSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProductDetails {
  _created: number;
  _data_type: string;
  _is_deleted: boolean;
  _modified: number;
  _self_link: string;
  _user: string;
  _uuid: string;
  animal_description: string;
  animal_uuid: string;
  category_description: string;
  category_uuid: string;
  image: string;
  isPopular: boolean;
  name: string;
  price: number;
  stock: number;
  title: string;
}

const Details = () => {
  const { id, source } = useParams<{ id: string; source?: string }>(); 
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/animals/${id}`;
        if (source === "category") {
          url = `${import.meta.env.VITE_API_URL}/animals-with-categories/${id}`;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CRUDAPI_KEY}`,
          },
        });
        const data = await response.json();
        setProduct(data);
      } catch {
        toast.error("Failed to fetch product details");
      }
    };

    if (id) fetchProduct();
  }, [id, source]); 

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product._uuid,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock: product.stock,
          image: product.image,
          type: source === "category" ? "animals-with-categories" : "animals",
          category_uuid: product.category_uuid,
        })
      );
      toast.success("Item added to cart");
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      dispatch(
        addToWishlist({
          id: product._uuid,
          name: product.name,
          price: product.price,
          stock: product.stock,
          image: product.image,
        })
      );
      toast.success("Item added to wishlist");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={new URL(`../assets/${product.image}`, import.meta.url).href}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-600">{product.animal_description}</p>
          <p className="text-lg font-semibold mt-4 text-blue-600">
            ₾{product.price}
          </p>
          <p className="mt-2 text-red-500">Stock: {product.stock}</p>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
