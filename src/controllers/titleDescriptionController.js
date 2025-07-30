import TitleDescriptionService from "../services/titleDescriptionService.js"

export const generateTitleAndDescription = async (req, res, next) => {
  try {
    const result = await TitleDescriptionService.generateTitleAndDescription()

    res.status(200).json({result})
  } catch (error) {
    next(error)
  }
}
