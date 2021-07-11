import  { useState } from "react"

export default function useCustomForm(initialState) {

    const [data, setData] = useState(initialState)

    const handleChange = (event) => {
      
        const { name, value } = event.target;

        setData({ ...data, [name]: value })
    }


    return [data, handleChange];

}

export function useCustomFormFile(initialState) {

    const [data, setData] = useState(initialState)

    const handleChange = (event) => {
     
        const { name, files } = event.target;
        setData({ ...data, [name]: files[0] })
    }


    return [data, handleChange];

}