import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState()

    useEffect(() => {
        fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
        .then(response => response.json())
        .then(data => updateCustomer(data[0]))
    }, [customerId])

    return <article className="customer">
        <div>Name: {customer?.user?.fullName}</div>
        <div>Email: {customer?.user?.email}</div>
        <div>Phone Number: {customer?.phoneNumber}</div>
        <div>Address: {customer?.address}</div>
    </article>
}