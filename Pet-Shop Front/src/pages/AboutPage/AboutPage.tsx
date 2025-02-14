import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist } from "../../store/wishlistSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { IAnimalWithCategory } from "../../interfaces/animalWithCategory.interface";

interface Animal {
  _uuid: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

const AboutPage = () => {
  const dispatch = useDispatch();
  const {
    data: animals,
    loading,
    error,
  } = useFetch<IAnimalWithCategory[]>(
    `${import.meta.env.VITE_API_URL}/animals-with-categories`,
    "GET",
    []
  );

  const handleAddToWishlist = (animal: Animal) => {
    dispatch(
      addToWishlist({
        id: animal._uuid,
        name: animal.name,
        price: animal.price,
        stock: animal.stock,
        image: animal.image,
      })
    );
    toast.success("Added to wishlist");
  };

  const handleAddToCart = (animal: Animal) => {
    dispatch(
      addToCart({
        id: animal._uuid,
        name: animal.name,
        price: animal.price,
        quantity: 1,
        stock: animal.stock,
        image: animal.image,
        type: "animals-with-categories",
      })
    );
    toast.success("Added to cart");
  };

  if (error) return <div>{error}</div>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-extralight mb-4 text-center">All Animals</h1>

      {loading ? (
        <p>Loading animals...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {animals.map((animal) => (
            <div
              key={animal._uuid}
              className="border p-4 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img
                src={`./src/assets/${animal.image}`}
                alt={animal.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="font-bold text-lg mb-2">{animal.name}</h3>
              <p className="text-gray-600 mb-2">Price: ₾{animal.price}</p>
              <p className="text-gray-500 mb-4">Stock: {animal.stock}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(animal)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(animal)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Add to Wishlist
                </button>
                <Link
                  to={`/details/${animal._uuid}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutPage;
