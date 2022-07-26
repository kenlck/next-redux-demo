import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { GMAP_API_KEY } from '../../../utils/env'

export type LocationResType = {
  predictions: {
    description: string
    place_id: string
    reference: string
    structured_formatting: {
      main_text: string
      secondary_text: string
    }
  }[]
}
const PlacesAPIHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Enter API logic here
  const { query } = req.query

  const re = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GMAP_API_KEY}`,
  )
  if (re.status === 200) {
    const data = await re.json()
    // console.log(JSON.stringify(data))
    return res.status(200).json(data)
  }
}

export default PlacesAPIHandler
