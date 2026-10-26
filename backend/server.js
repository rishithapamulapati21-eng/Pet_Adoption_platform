const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const multer = require("multer");

const AdoptionApplication = require('./models/AdoptionApplication')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const Pet = require('./models/Pet')

const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

mongoose
  .connect('mongodb://127.0.0.1:27017/petAdoptionDB')
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })

app.get('/', (req, res) => {
  res.send('Pet Adoption Backend is running!')
})
app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    await user.save()

    res.status(201).json({
      message: 'Account created successfully',
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create account',
      error: error.message,
    })
  }
})
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(400).json({
      message: 'Login failed',
      error: error.message,
    })
  }
})
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 })

    res.status(200).json(pets)
  } catch (error) {
    console.error('Failed to fetch pets:', error)

    res.status(500).json({
      message: 'Failed to fetch pets',
      error: error.message,
    })
  }
})
app.post('/api/pets', upload.single('photo'), async (req, res) => {
  try {
    const pet = new Pet({
  ...req.body,
  photo: `/uploads/${req.file.filename}`,
})

    await pet.save()

    res.status(201).json({
      message: 'Pet registered successfully',
      pet,
    })
  } catch (error) {
    console.error('Pet registration error:', error)

    res.status(400).json({
      message: 'Failed to register pet',
      error: error.message,
    })
  }
})
app.post('/api/adoptions', async (req, res) => {
  try {
    const application = new AdoptionApplication(req.body)

    await application.save()

    res.status(201).json({
      message: 'Adoption application submitted successfully',
      application,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to submit adoption application',
      error: error.message,
    })
  }
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})