import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function AdoptionForm() {
  const [searchParams] = useSearchParams()
  const petName = searchParams.get('pet') || 'this pet'

  const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  phone: '',
  city: '',
  reason: '',
  hadPetsBefore: '',
  })
  const [submitted, setSubmitted] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch('http://localhost:5000/api/adoptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        petName,
        ...formData,
      }),
    })

    const data = await response.json()

    if (response.ok) {
  setSubmitted(true)
  console.log(data)
} else {
  alert('Failed to submit application')
}
  } catch (error) {
    console.error(error)
    alert('Unable to connect to the server')
  }
}

  return (
    <div className="adoption-page">
      <div className="adoption-form-container">

        <p className="tagline">ADOPTION APPLICATION</p>

        <h1>Apply to Adopt {petName}</h1>

        <p>
          Fill in the details below to start your adoption application.
        </p>

        
        {submitted && (
        <div className="success-message">
        <h2>Application Submitted Successfully! 🎉</h2>
        <p>Thank you for applying to adopt {petName}.</p>
        </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
            }
            required
         />

          <label>City</label>
          <input
            type="text"
            placeholder="Enter your city"
            value={formData.city}
            onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
            }
            required
          />

          <label>Why do you want to adopt {petName}?</label>
          <textarea
            placeholder="Tell us why you would like to adopt..."
            rows="5"
            value={formData.reason}
            onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
            }
            required
          ></textarea>

          <label>Have you had pets before?</label>
          <select
            value={formData.hadPetsBefore}
            onChange={(e) =>
                setFormData({
            ...formData,
            hadPetsBefore: e.target.value,
            })
            }
        required
        >
  <option value="">Select an option</option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>

          <button type="submit" className="adopt-btn">
            Submit Application
          </button>

        </form>

      </div>
    </div>
  )
}

export default AdoptionForm

