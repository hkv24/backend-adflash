# AdFlash AI Backend

A Node.js/Express backend for generating AI-powered advertisement images using OpenAI's API.

## Features

- Upload multiple images for processing
- Generate AI-enhanced advertisement images
- Professional ad styling with clear text and CTAs
- Base64 image response for easy frontend integration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   ```

3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### POST `/api/v1/generate`
Generate AI-enhanced advertisement images.

**Parameters:**
- `images`: Array of image files (required)
- `prompt`: Text prompt for image generation (required)
- `n`: Number of images to generate (1-10, default: 1)
- `size`: Image size (default: 1024x1024)

**Response:**
```json
{
  "success": true,
  "message": "Successfully generated X images",
  "images": [
    {
      "imageBuffer": "base64_string",
      "filename": "generated_image_timestamp_index.png",
      "mimeType": "image/png"
    }
  ]
}
```

## Deployment

The app is ready for deployment on platforms like:
- Heroku
- Railway
- Render
- Vercel (with Node.js runtime)
- etc.

Make sure to set the required environment variables in your deployment platform.
