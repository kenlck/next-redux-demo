import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { GMAP_API_KEY } from '../../../utils/env'

export type PlaceIdResType = {
  result: {
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
  }
}
const PlaceIDAPIHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Enter API logic here
  const { query } = req.query

  const re = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&fields=geometry&key=${GMAP_API_KEY}`,
  )
  if (re.status === 200) {
    const data = await re.json()
    // console.log(JSON.stringify(data))
    return res.status(200).json(data)
  }
}

export default PlaceIDAPIHandler
