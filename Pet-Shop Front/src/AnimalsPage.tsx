import cat1 from '../assets/cat1.jpg';
import cat2 from '../assets/cat2.jpg';
import cat3 from '../assets/cat3.jpg';
import dog1 from '../assets/dog1.jpg';
import dog2 from '../assets/dog2.jpg';
import dog3 from '../assets/dog3.jpg';
import lizard1 from '../assets/lizzard1.jpg';
import lizard2 from '../assets/lizzard2.jpg';
import lizard3 from '../assets/lizzard3.jpg';
import parrot1 from '../assets/parrot1.jpg';
import parrot2 from '../assets/parrot2.jpg';
import parrot3 from '../assets/parrot3.jpg';
import wolf1 from '../assets/wolf1.jpg';
import wolf2 from '../assets/wolf2.jpg';
import wolf3 from '../assets/wolf3.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const animalImages = [
    cat1,
    cat2,
    cat3,
    dog1,
    dog2,
    dog3,
    lizard1,
    lizard2,
    lizard3,
    parrot1,
    parrot2,
    parrot3,
    wolf1,
    wolf2,
    wolf3,
];

function handleAddToWishlist(index: number) {
    const currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    currentWishlist.push(animalImages[index]);
    localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
}

async function handleAddToCard(index: number) {
    const currentCards = JSON.parse(localStorage.getItem('cards') || '[]');
    const animalToAdd = animalImages[index];
    currentCards.push(animalToAdd);
    
    try {
        await axios.post('https://crudapi.co.uk/api/v1/animals', { animal: animalToAdd });
        localStorage.setItem('cards', JSON.stringify(currentCards));
    } catch (error) {
        console.error('Error adding to card:', error);
    }
}

function AnimalsPage() {
    const navigate = useNavigate();

    const cards = Array.from({ length: animalImages.length }, (_, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 m-2">
            <h3 className="text-lg font-bold">Card {index + 1}</h3>
            <img src={animalImages[index]} alt={`Animal ${index + 1}`} className="w-full h-48 object-cover rounded-md" />
            <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleAddToCard(index)}>Add To Card</button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={() => handleAddToWishlist(index)}>Add To Wishlist</button>
                <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" onClick={() => navigate('/card')}>Go to Card Page</button>
            </div>
        </div>
    ));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cards}
        </div>
    );
}

export default AnimalsPage;
