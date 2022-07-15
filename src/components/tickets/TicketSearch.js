

export const TicketSearch = ({setterFunction}) => {

    return (
        <>
            <div>
                <input type="text" placeholder="Enter search terms" onChange={
                    e => {
                        setterFunction(e.target.value)
                    }
                }></input>
            </div>
        </>
    )
}