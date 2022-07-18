import { useState, useEffect } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/users?isStaff=true`)
        .then(response => response.json())
        .then(users => {setUsers(users)})
    }, [])

    return <article className="employees">
        {
            users.map(user => <Employee key={`employee--${user.id}`} id={user.id} fullName={user.fullName} email={user.email}/>)
        }
    </article>
}