import { useState, useEffect } from "react"
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
            users.map(user => 
                <section className="employee" key={`employee--${user.id}`}>
                    <div>Name: {user.fullName}</div>
                    <div>Email: {user.email}</div>
                </section>
            )
        }
    </article>
}