import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
const pets = {
  Buddy: {
    image:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85',
    breed: 'Golden Retriever',
    age: '2 years old',
    animal: 'Dog',
    location: 'Hyderabad',
    health: 'Healthy',
    vaccination: 'Vaccinated',
  },

  Luna: {
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85',
    breed: 'Persian Cat',
    age: '1 year old',
    animal: 'Cat',
    location: 'Hyderabad',
    health: 'Healthy',
    vaccination: 'Vaccinated',
  },
    Charlie: {
    image:
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=85',
    breed: 'Beagle',
    age: '3 years old',
    animal: 'Dog',
    location: 'Hyderabad',
    health: 'Healthy',
    vaccination: 'Vaccinated',
  },
  Rio: {
  image:
    'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=85',
  breed: 'Parrot',
  age: '2 years old',
  animal: 'Bird',
  location: 'Hyderabad',
  health: 'Healthy',
  vaccination: 'Vaccinated',
},
Coco: {
  image:
    'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=85',
  breed: 'Rabbit',
  age: '1 year old',
  animal: 'Rabbit',
  location: 'Hyderabad',
  health: 'Healthy',
  vaccination: 'Vaccinated',
},
Daisy: {
  image:
    'https://images.unsplash.com/photo-1555852095-64e7428df0fa?auto=format&fit=crop&w=900&q=85',
  breed: 'Rabbit',
  age: '1 year old',
  animal: 'Rabbit',
  location: 'Hyderabad',
  health: 'Healthy',
  vaccination: 'Vaccinated',
},
Peanut: {
  image:
    'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=900&q=85',
  breed: 'Hamster',
  age: '1 year old',
  animal: 'Hamster',
  location: 'Hyderabad',
  health: 'Healthy',
  vaccination: 'Vaccinated',
},
}

function PetDetails() {
  const [searchParams] = useSearchParams()
  const petName = searchParams.get('pet')

  const [registeredPet, setRegisteredPet] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/pets')
      .then((response) => response.json())
      .then((data) => {
        const foundPet = data.find(
          (pet) => pet.petName === petName
        )

        setRegisteredPet(foundPet)
      })
      .catch((error) => {
        console.error('Failed to load pet:', error)
      })
  }, [petName])

  const pet = registeredPet
    ? {
        image: `http://localhost:5000${registeredPet.photo}`,
        breed: registeredPet.breed,
        age: registeredPet.age,
        animal: registeredPet.animal,
        location: registeredPet.location,
        health: registeredPet.health,
        vaccination: registeredPet.vaccination,
      }
    : pets[petName] || pets.Buddy

  return (
    <div className="pet-details-page">

      <div className="pet-details-image">
        <img
          src={pet.image}
          alt={petName}
        />
      </div>

      <div className="pet-details-info">

        <p className="tagline">AVAILABLE FOR ADOPTION</p>

        <h1>{petName || 'Buddy'}</h1>

        <p className="pet-breed">
          {pet.breed} · {pet.age}
        </p>

        <div className="pet-details-list">
          <p><strong>Animal:</strong> {pet.animal}</p>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Location:</strong> {pet.location}</p>
          <p><strong>Health:</strong> {pet.health}</p>
          <p><strong>Vaccination:</strong> {pet.vaccination}</p>
        </div>

        <h2>About {petName || 'Buddy'}</h2>

        <p>
          {petName || 'Buddy'} is a friendly and loving pet looking for a
          caring family and a safe place to call home.
        </p>

        <Link
          to={`/adoption-form?pet=${encodeURIComponent(petName || 'Buddy')}`}
          className="adopt-btn"
        >
  Apply for Adoption
</Link>

      </div>

    </div>
  )
}

export default PetDetails