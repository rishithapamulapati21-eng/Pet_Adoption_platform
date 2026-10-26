import { useLocation, Link } from 'react-router-dom'

function Account() {
  const location = useLocation()
  const user = location.state

  return (
    <div className="login-page">
      <div className="login-container">

        <p className="tagline">MY ACCOUNT</p>

        <h1>Welcome, {user?.fullName || 'User'}! 🐾</h1>

        <p>Your account has been created successfully.</p>

        <div className="account-info">
          <p>
            <strong>Name:</strong> {user?.fullName}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <div className="account-actions">
  <Link to="/pet-registration" className="adopt-btn">
    🐾 Register a Pet for Adoption
  </Link>

  <Link to="/" className="adopt-btn">
    Back to Home
  </Link>
</div>

      </div>
    </div>
  )
}

export default Account