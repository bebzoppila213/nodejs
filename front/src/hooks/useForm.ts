import { useEffect, useState } from "react";


export default function useForm<T>(defaultData: T){

    const [formData, setFormData] = useState<T>(defaultData) ;

    const updateFormValue = (key: keyof T, value: string) => {
        setFormData({...formData, [key]: value})
    }
    return{
        formData,
        updateFormValue
    }
}