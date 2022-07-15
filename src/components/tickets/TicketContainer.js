import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"
import { useState, useEffect } from "react"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms}/>
        <TicketList searchTermState={searchTerms}/>
    </>
}