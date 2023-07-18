import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetAllOrdersService } from '../services/Order/GetAllOrdersService'
import { setMessage } from '../redux/slice/messageSlice'
import { SetOrderStatusService } from '../services/Order/SetOrderStatusService'
import { orderUpdate, serverError } from '../data/constants'
import OrderComponent from '../Components/Orders/User/OrderComponent'

const AllOrder = () => {
  const [orders, setOrder] = useState([])
  const dispatch = useDispatch()

  const setStatus = async (data) => {
    const response = await SetOrderStatusService(data)
    if (response === serverError) {
      dispatch(setMessage(serverError))
    } else {
      getOrders()
      dispatch(setMessage(orderUpdate))
    }
  }
  const getOrders = async () => {
    try {
      const response = await GetAllOrdersService()
      setOrder(response.data)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <>
      <OrderComponent orders={orders} setStatus={setStatus} />
    </>
  )
}

export default AllOrder