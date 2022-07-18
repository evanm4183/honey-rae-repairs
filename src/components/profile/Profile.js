import { EmployeeForm } from "./EmployeeForm"
import { CustomerForm } from "./CustomerForm"

export const Profile = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        return <EmployeeForm />
    } else {
        return <CustomerForm />
    }
}
