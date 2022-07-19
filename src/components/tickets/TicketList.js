import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./Tickets.css"

export const TicketList = ({searchTermState}) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [employees, setEmployees] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const getAllTickets = () => {
        fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
            .then(res => res.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })
    }

    useEffect(
        () => {
            getAllTickets()

            fetch(`http://localhost:8088/employees?_expand=user`)
            .then(res => res.json())
            .then((data) => {
                setEmployees(data)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    useEffect(() => {
        const searchedTickets = tickets.filter(ticket => {
            return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
        })
        setFiltered(searchedTickets)
    }, [searchTermState])

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            } else {
                setFiltered(tickets)
            }
        }, 
        [emergency]
    )

    useEffect( () => {
        if (openOnly) {
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
        } else {
            setFiltered(tickets.filter(ticket => ticket.userId === honeyUserObject.id))
        }
    }, [openOnly])

    return <>
        {
            honeyUserObject.staff
                ? <>
                    <button onClick={() => setEmergency(true)}>Emergency Only</button>
                    <button onClick={() => setEmergency(false)}>Show All</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All Tickets</button>
                </>
        }
        <h2>List of Tickets</h2>

        <article className="tickets">
            {
            filteredTickets.map(
                ticket => {
                    return <Ticket 
                        ticket={ticket} 
                        employees={employees} 
                        currentUser={honeyUserObject}
                        getAllTickets={getAllTickets}
                        key={`ticket--${ticket.id}`} />
                }
                )
            }
        </article>
    </>
}