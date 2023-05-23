import axios from "axios"

export const getAll = async (page) =>{
const product = await axios.get("http://localhost:8080/products?page=" + page)
return product.data
}

export const deleteProduct = async (id) => {
 await axios.delete("http://localhost:8080/delete?id=" + id)
}

export const addProduct = async (product) => {

        await axios.post("http://localhost:8080/create", product)
    
    }

    export const getProduct = async (id) => {
        const product = await axios.get("http://localhost:8080/detail/" + id)
        return product
    }

    export const updateProduct = async (product) => {

        await axios.put("http://localhost:8080/update", product)
    
    }

    export const findNameProduct = async (name) => {
        const product = await axios.get("http://localhost:8080/find-name?name=" + name)
        return product.data
    }