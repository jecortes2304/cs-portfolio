import {ProjectStatus} from "@/schemas/ProjectSchemas";
import {renderIcon} from "@/components/helpers/DeviceIconFactory";


const StatusIconFactory = ({status}: { status: ProjectStatus }) => {

    switch (status) {
        case "finished": {
            return (
                renderIcon("Finalizado", "M5 13l4 4L19 7")
            )
        }
        case "pending": {
            return (
                renderIcon("Pendiente", "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z")
            )
        }
        case "discontinued": {
            return (
                renderIcon("Descontinuado", "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z")
            )
        }
        case "inProgress": {
            return (
                renderIcon("En desarrollo",
                    "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605")
            )
        }
        default: {
            return (
                renderIcon("Finalizado", "M5 13l4 4L19 7")
            )
        }
    }
}


export default StatusIconFactory;