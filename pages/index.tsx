import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import HistoryOutlined from '@ant-design/icons/lib/icons/HistoryOutlined'
import { Button, Modal, Space } from 'antd'
import Card from 'antd/lib/card/Card'
import Input from 'antd/lib/input/Input'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LocationAutoComplete from '../components/locationAutoComplete'
import { addToHistory, removeFromHistory } from '../store/slice/historySlice'
import { setSearch, setSearchAndID } from '../store/slice/searchSlice'
import { RootState } from '../store/store'
import { GMAP_API_KEY } from '../utils/env'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import GoogleMap from '../components/googleMap'
import { useGetLatLngQuery } from '../store/services/gmap'

const render: React.FC = (status: Status) => {
  // if (status === Status.FAILURE) return <ErrorComponent />
  return <p>Loading</p>
}

const Home: NextPage = () => {
  const state = useSelector((state: RootState) => state.history)
  const stateSearch = useSelector((state: RootState) => state.search)
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data } = useGetLatLngQuery(stateSearch.placeId)
  console.log(data)
  const defaultProps = {
    center: {
      lat: data.result.geometry.location.lat ?? 10.99835602,
      lng: data.result.geometry.location.lng ?? 77.01502627,
    },
    zoom: 13,
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Wrapper apiKey={GMAP_API_KEY} render={render}>
        <GoogleMap center={defaultProps.center} zoom={defaultProps.zoom}></GoogleMap>
        <Modal visible={isModalVisible} title="History" footer={null} onCancel={() => setIsModalVisible(false)}>
          {state.history.map((h, idx) => {
            return (
              <Card
                key={idx}
                onClick={() => {
                  // console.log(h)
                  setIsModalVisible(false)
                  dispatch(setSearchAndID({ search: h.description, placeId: h.placeId }))
                }}
              >
                <Space direction="horizontal" className="flex justify-between">
                  <p>{h.description}</p>
                  <Button
                    type="link"
                    color="red-5"
                    onClick={() => {
                      dispatch(removeFromHistory(idx))
                    }}
                  >
                    <DeleteOutlined className="text-red-600" />
                  </Button>
                </Space>
              </Card>
            )
          })}
        </Modal>

        <div className="fixed left-64 w-2/3 top-4 ">
          <div className="flex justify-between z-10">
            <div className="flex-1">
              <LocationAutoComplete />
            </div>
            <Button type="default" onClick={() => setIsModalVisible(true)}>
              <HistoryOutlined />
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Home
