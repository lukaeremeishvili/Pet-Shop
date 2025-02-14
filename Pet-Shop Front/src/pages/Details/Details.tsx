import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist } from "../../store/wishlistSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import { IAnimalWithCategory } from "../../interfaces/animalWithCategory.interface";

const Details = () => {
  const { id } = useParams<{ id: string; source?: string }>();
  const {
    data: product,
    loading,
    error,
  } = useFetch<IAnimalWithCategory | object>(
    `${import.meta.env.VITE_API_URL}/animals-with-categories/${id}`,
    "GET",
    {}
  );
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if ("_uuid" in product) {
      dispatch(
        addToCart({
          id: product._uuid,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock: product.stock,
          image: product.image,
          type: "animals-with-categories",
          category_uuid: product.category_uuid,
        })
      );
      toast.success("Item added to cart");
    }
  };

  const handleAddToWishlist = () => {
    if ("_uuid" in product) {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      {"_uuid" in product && (
        <div className="container mx-auto p-6">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`../src/assets/${product.image}`}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <p className="text-sm text-gray-600">
                {product.animal_description}
              </p>
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
      )}
    </>
  );
};

export default Details;
