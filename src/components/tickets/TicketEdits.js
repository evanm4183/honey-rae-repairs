import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export const TicketEdit = () => {
    // TODO: This state object should not be blank
    const [ticket, assignTicket] = useState({
        address: "",
        emergency: "",
        userId: 0
    })

    // TODO: What is the variable in which you stored the route parameter?
    const { ticketId } = useParams()

    // TODO: Get the ticket state from the API.
    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then(response => response.json())
        .then((data) => {assignTicket(data)})
    }, [ticketId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log(ticket)
        // TODO: Write the fetch for the PUT request to replace the object being edited
        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })           
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = {...ticket}
                            copy.description = evt.target.value
                            assignTicket(copy)
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox" checked={ticket.emergency}
                    onChange={
                        (evt) => {
                            const copy = {...ticket}
                            copy.emergency = evt.target.checked
                            assignTicket(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(e) => handleSaveButtonClick(e)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}