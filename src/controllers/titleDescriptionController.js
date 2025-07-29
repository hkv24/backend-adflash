import TitleDescriptionService from "../services/titleDescriptionService.js"

export const generateTitleAndDescription = async (req, res, next) => {
  try {
    const result = await TitleDescriptionService.generateTitleAndDescription()

    // Send response with generated title and description
    res.status(200).json({result})
  } catch (error) {
    next(error)
  }
}
