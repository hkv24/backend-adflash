import TitleDescriptionService from "../services/titleDescriptionService.js"

export const generateTitleAndDescription = async (req, res, next) => {
  try {
    const { title, description } = req.body

    const result = await TitleDescriptionService.generateTitleAndDescription(title, description)

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
