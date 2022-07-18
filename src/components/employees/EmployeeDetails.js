import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState({})

    useEffect(() => {
        fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(response => response.json())
        .then(data => {updateEmployee(data[0])})
    }, [employeeId])

    return <>
        <section className="employee">
            <header>{employee?.user?.fullName}</header>
            <div>Email: {employee?.user?.email}</div>
            <div>Specialty: {employee.specialty}</div>
            <div>Pay Rate: {employee.rate}</div>
            <footer>Currently Working on {employee?.employeeTickets?.length} tickets</footer>
        </section>
    </>
}