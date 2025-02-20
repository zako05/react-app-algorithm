import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 5001

/*
 * Enable CORS for development
*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

async function serveFile(filePath, res, contentType) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8')

    res.setHeader('Content-Type', contentType)
    res.json({ content: data })
  } catch (err) {
      console.log('Error reading file:', err)
      res.status(500).json({
        error: 'Failed to read file',
        details: err.message
      })
  }
}

app.get('/api/code', async (req, res) => {
  const filePath = path.join(__dirname, 'scripts', 'anagramCounter.js')

  await serveFile(filePath, res, 'application/javascript')
})

app.get('/api/note', async (req, res) => {
  const filePath = path.join(__dirname, 'scripts', 'anagramCounter.md')

  await serveFile(filePath, res, 'text/markdown')
})

app.listen(port, () => {
  console.log(`Server listing on port: ${port}`)
})
