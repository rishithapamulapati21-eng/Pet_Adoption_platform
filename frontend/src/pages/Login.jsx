import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

const [formData, setFormData] = useState({
  email: '',
  password: '',
})
const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      navigate('/account', {
        state: {
          fullName: data.user.fullName,
          email: data.user.email,
        },
      })
    } else {
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

        <p className="tagline">WELCOME BACK</p>

        <h1>Login to PetNest</h1>

        <p>
          Login to manage your pets and adoption listings.
        </p>

        <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
            }
            required
           />

          <button type="submit" className="adopt-btn">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>

      </div>
    </div>
  )
}

export default Login