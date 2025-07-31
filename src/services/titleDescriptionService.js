import dotenv from 'dotenv'
import OpenAI from 'openai'
const client = new OpenAI()

dotenv.config()

class TitleDescriptionService {
    constructor() {
        this.apikey = process.env.OPENAI_API_KEY
        this.baseURL = 'https://api.openai.com/v1'
    }

    async generateTitleAndDescription(title, description) {
        if (!this.apikey) {
            throw new Error('OpenAI API key is not configured')
        }

        try {
            const response = await client.responses.create({
                model: "gpt-4o",
                temperature: 1.45,
                input: [
                    {
                        role: 'developer',
                        content: 'I run a advertisement generation agency, so while replying keep that in mind. Give response in minimum words possible.'
                    },
                    {
                        role: 'user',
                        content: `Suggest me 3 different combination of title and description suitable for topic 'Title: ${title}, Description: ${description}'. Start the title with 'Title:' and description with 'Description:'. `
                    }
                ]
            })

            return response.output[0].content[0].text
        } catch (e) {
            console.error('OpenAI API Error:', e.response?.data || e.message)
            throw e
        }
    }
}

export default new TitleDescriptionService()
