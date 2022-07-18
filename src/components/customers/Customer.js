import { Link } from "react-router-dom"

export const Customer = ({customer}) => {

    return <section className="customer">
        <div>
            <Link to={`/customers/${customer.id}`}>{customer.user.fullName}</Link>
        </div>
        <div>Address: {customer.address}</div>
        <div>Phone Number: {customer.phoneNumber}</div>
    </section>
}