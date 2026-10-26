import { useState, useEffect } from 'react'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import PetDetails from './pages/PetDetails'
import AdoptionForm from './pages/AdoptionForm'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import PetRegistration from './pages/PetRegistration'

function App() {
  const [search, setSearch] = useState('')
  const [petType, setPetType] = useState('All')
  const [registeredPets, setRegisteredPets] = useState([])
  const location = useLocation()
  const defaultPets = [
  {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '2 years',
    type: 'Dog',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Luna',
    breed: 'Domestic Cat',
    age: '1 year',
    type: 'Cat',
    image:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Charlie',
    breed: 'Mixed Breed',
    age: '3 years',
    type: 'Dog',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Rio',
    breed: 'Parakeet',
    age: '1 year',
    type: 'Bird',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Coco',
    breed: 'Domestic Rabbit',
    age: '8 months',
    type: 'Rabbit',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Daisy',
    breed: 'Domestic Duck',
    age: '1 year',
    type: 'Duck',
    image: 'https://images.unsplash.com/photo-1555852095-64e7428df0fa?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Peanut',
    breed: 'Syrian Hamster',
    age: '6 months',
    type: 'Hamster',
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=600&q=80',
  },
]

const allPets = [
  ...registeredPets.map((pet) => ({
    name: pet.petName,
    breed: pet.breed,
    age: pet.age,
    type: pet.animal,
    image: `http://localhost:5000${pet.photo}`,
    uploaded: true,
  })),
  ...defaultPets,
]

  useEffect(() => {
  fetch('http://localhost:5000/api/pets')
    .then((response) => response.json())
    .then((data) => {
      setRegisteredPets(data)
    })
    .catch((error) => {
      console.error('Failed to load pets:', error)
    })
}, [])

    if (location.pathname === '/pet-details') {
  return <PetDetails />
}

if (location.pathname === '/adoption-form') {
  return <AdoptionForm />
}
if (location.pathname === '/login') {
  return <Login />
}
if (location.pathname === '/signup') {
  return <Signup />
}
if (location.pathname === '/account') {
  return <Account />
}
if (location.pathname === '/pet-registration') {
  return <PetRegistration />
}
  return (
    <div className="app">
      <header className="navbar">
        <h2 className="logo">PetNest 🐾</h2>

        <nav>
          <a href="#home">Home</a>
          <a href="#pets">Adopt a Pet</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <Link to="/login" className="login-btn">
          Login
        </Link>
      </header>

      <main className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">FIND YOUR NEW BEST FRIEND</p>

          <h1>
            Give a Pet a Home,
            <br />
            Gain a Friend for Life.
          </h1>

          <p className="description">
            Every pet deserves love, care, and a place to call home.
            Find your perfect companion and make a difference today.
          </p>

          <button
            className="adopt-btn"
            onClick={() => {
              document.getElementById('pets')?.scrollIntoView({
                behavior: 'smooth',
              })
            }}
          >
            Explore Pets →
          </button>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=85"
            alt="Happy dogs waiting for a loving home"
          />
        </div>
      </main>

      
<section className="welcome" id="pets">
  <p className="tagline">MEET YOUR NEW BEST FRIEND</p>
  <h2>Pets Waiting for a Home</h2>
  <p className="section-description">
    Every pet has a story. Maybe you are the happy ending
    they have been waiting for.
  </p>
  
<div className="pet-filters">
  <input
    type="text"
    placeholder="Search by pet name or breed..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  
<select
  value={petType}
  onChange={(e) => setPetType(e.target.value)}
>
  <option value="All">All Pets</option>
  <option value="Dog">Dogs</option>
  <option value="Cat">Cats</option>
  <option value="Bird">Birds</option>
  <option value="Rabbit">Rabbits</option>
  <option value="Duck">Ducks</option>
  <option value="Hamster">Hamsters</option>
</select>
</div>

  <div className="pet-grid">
    
{
allPets
  .filter((pet) => petType === 'All' || pet.type === petType)
  .filter((pet) =>
    `${pet.name} ${pet.breed}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((pet) => (
    <article className="pet-card" key={pet.name}>
      <img
        src={pet.image}
        alt={pet.breed}
      />

      <div className="pet-info">
        <h3>{pet.name}</h3>
        <p>{pet.breed} · {pet.age}</p>
        <span>Health details to be confirmed</span>

        <Link
          to={`/pet-details?pet=${encodeURIComponent(pet.name)}`}
          className="meet-pet-btn"
        >
          Meet {pet.name} →
        </Link>
      </div>
    </article>
  ))}
  </div>
</section>

      <footer id="contact">
        <p>PetNest © 2026 — Every Paw Deserves a Home 🐾</p>
      </footer>
    </div>
  )
}

export default App