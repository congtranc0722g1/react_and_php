import * as ProductService from "./../service/ProductService"
import { useState, useEffect } from "react"
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductList() {

    let productPage;
    let size = 0;
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [product, setProduct] = useState([]);
    const [name, setName] = useState("")

    const changeName = (event) => {
        setName(event)
    }

    const findNameProduct = async () => {
        const product = await ProductService.findNameProduct(name)
        setProduct(product)
    }

    const getAll = async (page) => {
        const product = await ProductService.getAll(page);
        setProduct(product.content)
        setTotalPage(product.totalPages)
    }

    const nextPage = (page) => {
        getAll(page)
        setPage(page)
    }

    const deleteP = async (id) => {
        await ProductService.deleteProduct(id);
        getAll();
    }

    const deleteProduct = async (id, name) => {

        Swal.fire({
            title: "Xóa sản phẩm!",
            text: "Bạn có muốn xóa sản phẩm: " + name,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#007bff",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {

                deleteP(id)
                toast.success("Xóa thành công")
            }
        })
    }

    useEffect(() => {
        getAll(page)
    }, [])


    return (
        <>

            <div>
                <h1 className="text-center">Quản lý sản phẩm</h1>
                <div className="row m-2">
                    <div className="col-7">
                        <Link to="/add"><button className="btn btn-primary">Thêm mới</button></Link>
                    </div>
                    <div className="col-5 d-flex">
                        <input name="search" className="form-control me-1 w-50" placeholder="Nhập tên sản phẩm" onChange={(event) => changeName(event.target.value)}></input>
                        <button className="btn btn-success" onClick={() => findNameProduct()}>Tìm kiếm</button>
                    </div>
                </div>
                <table className='table table-hover'>
                    <thead>
                        <tr style={{ backgroundColor: "blue", color: "white", textAlign: "center"}}>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th>Chỉnh Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product, index) => (
                            <tr key={index} style={{textAlign: "center"}}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td><Link to={"/edit/" + product.id}><button className="btn btn-primary">Chỉnh sửa</button></Link></td>
                                <td><button className="btn btn-danger" onClick={() => deleteProduct(product.id, product.name)}>Xóa</button></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <div className="row" style={{ margin: "0", padding: "0" }}>
                    <div className="col-4"></div>
                    <div className="col-1">
                        {page + 1 > 1 && <button type="button" className="btn btn-outline-primary" onClick={() => nextPage(page - 1)}>Trước</button>}
                    </div>
                    <div className="col-2 text-center">
                        <p className="text-primary" style={{ marginTop: "5px" }}>{page + 1}/{totalPage}</p>
                    </div>
                    <div className="col-1">
                        {page + 1 < totalPage && <button type="button" className="btn btn-outline-primary" onClick={() => nextPage(page + 1)}>Sau</button>}
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>


        </>

    );
}

export default ProductList;