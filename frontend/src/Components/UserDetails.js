import React, { useState } from 'react'
import { AddressSelector } from './AddresSelector'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UserDetails = ({ data }) => {
    const value = useSelector(state => state.user.address)
    const navigate=useNavigate()
    // const changeValue = (index) => {
    //     setValue(data?.address[index])
    // }
    return (
        <>
            <div style={{ display: "flex" }}>
                <img src={data?.photo} />
                <div>
                    <h1>{data?.name}</h1>
                    <AddressSelector />
                </div>
                <Button onClick={()=>navigate("/profile")}>ADD ADDRESS</Button>
            </div>
            <p>Shipping details</p>
            <hr />
            <table>
                <tr>
                    <td>Address</td>
                    <td>{value?.location}</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>{value?.city}</td>
                </tr>
                <tr>
                    <td>Pincode</td>
                    <td>{value?.pincode}</td>
                </tr>
                <tr>
                    <td>State</td>
                    <td>{value?.state}</td>
                </tr>
            </table>
        </>
    )
}

export default UserDetails