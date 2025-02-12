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
  description: string;
  image: string;
  name: string;
  price: number;
  stock: number;
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/animals/${id}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_CRUDAPI_KEY}`,
            },
          }
        );
        const data = await response.json();
        setProduct(data);
      } catch {
        toast.error("Failed to fetch product details");
      }
    };

    if (id) fetchProduct();
  }, [id]);

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="flex mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-1/3 h-auto rounded-md"
        />
        <div className="ml-6 flex-1">
          <p className="text-lg">{product.description}</p>
          <p className="text-xl font-semibold mt-2">Price: ₾{product.price}</p>
          <p className="mt-2">Stock: {product.stock}</p>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-green-500 text-white rounded-md"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md"
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
