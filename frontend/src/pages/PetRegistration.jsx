import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PetRegistration() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    petName: '',
    animal: '',
    breed: '',
    age: '',
    location: '',
    health: '',
    vaccination: '',
    photo: null,
  })

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const data = new FormData()

    data.append('petName', formData.petName)
    data.append('animal', formData.animal)
    data.append('breed', formData.breed)
    data.append('age', formData.age)
    data.append('location', formData.location)
    data.append('health', formData.health)
    data.append('vaccination', formData.vaccination)
    data.append('photo', formData.photo)

    const response = await fetch('http://localhost:5000/api/pets', {
      method: 'POST',
      body: data,
    })

    const result = await response.json()

    if (response.ok) {
  alert('Pet registered successfully!')
  navigate('/')
}else {
      alert(result.message)
    }
  } catch (error) {
    console.error(error)
    alert('Unable to connect to the server')
  }
}

  return (
    <div className="pet-registration-page">
  <div className="pet-registration-container">

        <p className="tagline">PET REGISTRATION</p>

        <h1>Register Your Pet</h1>

        <p>
          Add your pet to PetNest for adoption.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Pet Name</label>
          <input
            type="text"
            placeholder="Enter pet name"
            value={formData.petName}
            onChange={(e) =>
              setFormData({ ...formData, petName: e.target.value })
            }
            required
          />

          <label>Animal</label>
          <select
            value={formData.animal}
            onChange={(e) =>
              setFormData({ ...formData, animal: e.target.value })
            }
            required
          >
            <option value="">Select animal</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Hamster">Hamster</option>
            <option value="Duck">Duck</option>
            <option value="Tortoise">Tortoise</option>
          </select>

          <label>Breed</label>
          <input
            type="text"
            placeholder="Enter breed"
            value={formData.breed}
            onChange={(e) =>
              setFormData({ ...formData, breed: e.target.value })
            }
            required
          />

          <label>Age</label>
          <input
            type="text"
            placeholder="Example: 2 years"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            }
            required
          />

          <label>Location</label>
          <input
            type="text"
            placeholder="Enter city"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />

          <label>Health</label>
          <input
            type="text"
            placeholder="Example: Healthy"
            value={formData.health}
            onChange={(e) =>
              setFormData({ ...formData, health: e.target.value })
            }
            required
          />

          <label>Vaccination</label>
          <select
            value={formData.vaccination}
            onChange={(e) =>
              setFormData({ ...formData, vaccination: e.target.value })
            }
            required
          >
            <option value="">Select vaccination status</option>
            <option value="Vaccinated">Vaccinated</option>
            <option value="Not Vaccinated">Not Vaccinated</option>
          </select>

          <label>Pet Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files[0] })
            }
            required
          />

          <button type="submit" className="adopt-btn">
            Register Pet
          </button>

        </form>

      </div>
    </div>
  )
}

export default PetRegistration