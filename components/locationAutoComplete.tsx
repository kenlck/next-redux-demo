import { AutoComplete, Input } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'react-use'
import { useGetLocationsQuery } from '../store/services/gmap'
import { addToHistory } from '../store/slice/historySlice'
import { setSearch, setSearchAndID } from '../store/slice/searchSlice'
import { RootState } from '../store/store'

const LocationAutoComplete: React.FC = () => {
  const search = useSelector((state: RootState) => state.search)

  const { data, error, isLoading } = useGetLocationsQuery(search.search, { skip: !search })
  const dispatch = useDispatch()

  const options = data?.predictions.map((d) => ({ id: d.place_id, value: d.description })) ?? []
  const onSelect = (v: string) => {
    console.log(v)
    const current = options.find((d) => d.value === v)
    dispatch(setSearchAndID({ search: v, placeId: current?.id ?? '' }))
    dispatch(addToHistory({ description: v, placeId: current?.id ?? '' }))
  }

  const onSearch = (v) => {
    console.log(v)
    dispatch(setSearch(v))
  }

  return (
    <div>
      <AutoComplete
        value={search.search}
        options={options}
        className="w-full"
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />
    </div>
  )
}

export default LocationAutoComplete
