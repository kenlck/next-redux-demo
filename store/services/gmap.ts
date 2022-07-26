import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PlaceIdResType } from '../../pages/api/placeid/[query]'
import { LocationResType } from '../../pages/api/places/[query]'
import { GMAP_API_KEY } from '../../utils/env'

export const gmapApi = createApi({
  reducerPath: 'gmapApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    headers: {
      'content-type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    getLocations: builder.query<LocationResType, string>({
      query: (query) => ({
        url: `places/${query}`,
      }),
    }),
    getLatLng: builder.query<PlaceIdResType, string>({
      query: (query) => ({
        url: `placeid/${query}`,
      }),
    }),
  }),
})

export const { useGetLocationsQuery, useGetLatLngQuery } = gmapApi
