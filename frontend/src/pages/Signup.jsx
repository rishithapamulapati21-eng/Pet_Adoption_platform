import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match')
    return
  }

  try {
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      }),
    })

    const data = await response.json()

    if (response.ok) {
        alert('Account created successfully!')
    navigate('/account', {
        state: {
            fullName: formData.fullName,
            email: formData.email,
        },
    })
    }else {
      alert(data.message)
    }
  } catch (error) {
    console.error(error)
    alert('Unable to connect to the server')
  }
}

  return (
    <div className="login-page">
      <div className="login-container">

        <p className="tagline">JOIN PETNEST</p>

        <h1>Create an Account</h1>

        <p>
          Create an account to list your pets for adoption.
        </p>

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

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />

          <button type="submit" className="adopt-btn">
            Create Account
          </button>
        </form>

        <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Signup