import axios from "axios"

export const getAll = async (page) =>{
    const categoryList = await axios.get("http://localhost:8080/category")
    return categoryList.data
    }