import { Link } from "react-router-dom"

export const Ticket = ({ticket, employees, currentUser, getAllTickets}) => {
    let employee = null
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    if (ticket.employeeTickets.length > 0) {
        const employeeTicket = ticket.employeeTickets[0]
        employee = employees.find(employee => employee.id === employeeTicket.employeeId)
    }

    const canClose = () => {
        if (userEmployee?.id === employee?.id && ticket.dateCompleted === "") {
            return <button className="ticket__finish" onClick={closeTicket}>Finish</button>
        } else {
            return ""
        }
    }

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button className="ticket__delete" onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
                    method: "DELETE"
                })
                .then(() => {getAllTickets()})
            }}>Delete</button>
        } else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
            })
            .then(() => {getAllTickets()})
        
    }

    return <section className="ticket" key={ticket.id}>
    <header>
        {
            currentUser.staff
            ? `Ticket ${ticket.id}`
            : <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
        }   
    </header>
    <section>{ticket.description}</section>
    <section>Emergency: {ticket.emergency ? "Yes" : "No"}</section>
    <footer>
        {
            ticket.employeeTickets.length
                ? `Currently being worked on by ${employee !== null ? employee?.user.fullName : ""}`
                : currentUser.staff
                    ? <button 
                        onClick={() => {
                            fetch(`http://localhost:8088/employeeTickets`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                }, 
                                body: JSON.stringify({
                                    employeeId: userEmployee.id, 
                                    serviceTicketId: ticket.id})
                            })
                            .then(response => response.json())
                            .then(() => {getAllTickets()})
                        }}
                        >Claim</button>
                    : ""
        }
        {canClose()}
        {deleteButton()}
    </footer>
</section>
}