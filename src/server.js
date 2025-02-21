import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mime from 'mime'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const scriptsDir = path.join(__dirname, 'scripts');

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

async function getFileContent(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8')

    return data
  } catch (err) {
    console.log('Error, file not found', err)

    return null
  }
}

app.get('/api/algos', async (req, res) => {
  try {
    const files = await fs.promises.readdir(scriptsDir)
    const fileData = {}

    for (let file of files) {
      const baseName = path.basename(file, path.extname(file))

      if (!fileData[baseName]) {
        fileData[baseName] = {}
      }

      const ext = path.extname(file)
      const contentType = mime.getType(file) || 'application/octet-stream'
      const content = await getFileContent(path.join(scriptsDir, file))

      if (content !== null) {
        fileData[baseName][ext.substring(1)] = {
          content,
          contentType,
        }
      }
    }

    res.json(fileData)
  } catch(err) {
    console.error('Error reading directory:', err)
    res.status(500).json({ error: 'Failed to read directory' })
  }
})

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
