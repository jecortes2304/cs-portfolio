import {Alert, triggerAlert} from "@/components/admin/AlertManager";


export function useAlert() {
    return (message: string, type: Alert['type'] = 'alert-info') => {
        triggerAlert({ message, type })
    }
}
