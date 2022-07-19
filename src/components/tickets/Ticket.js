import { Link } from "react-router-dom"

export const Ticket = ({ticket, employees, currentUser, getAllTickets}) => {
    let employee = null

    if (ticket.employeeTickets.length > 0) {
        const employeeTicket = ticket.employeeTickets[0]
        employee = employees.find(employee => employee.id === employeeTicket.employeeId)
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
                                    employeeId: employees.find(employee => employee.userId === currentUser.id).id, 
                                    serviceTicketId: ticket.id})
                            })
                            .then(response => response.json())
                            .then(() => {getAllTickets()})
                        }}
                        >Claim</button>
                    : ""
        }
    </footer>
</section>
}