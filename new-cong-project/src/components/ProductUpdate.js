import { useParams } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"
import * as ProductService from "./../service/ProductService"
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react"
import React, { Component } from 'react';
import { Axios } from 'axios';

function ProductUpdate() {
    let navigate = useNavigate();
    let location = useLocation();
    const { id } = useParams();

    const [product, setProduct] = useState({ name: "Công", price: 0 });

    const getProduct = async (id) => {

        // try {
        //     const product1 = await ProductService.getProduct(id);
        //     setProduct(product1.data)
        // }catch (error){
        //     // alert("lỗi r")
        //     if(error.response.data === "errProduct"){
        //         toast.warning("Không tìm thấy sản phẩm", "Thông báo")
        //     }
        // }

        return new Promise(() => {
            ProductService.getProduct(id)
                .then(data => {
                    setProduct(data.data)
                })
                .catch(error => {
                    if (error.response.data === "errProduct") {
                        navigate("/")
                        toast.warning("Không tìm thấy sản phẩm", "Thông báo")
                    }
                })
        })
    }

    useEffect(() => {
        getProduct(id)
    }, [])

    return (
        <>
            {console.log(location)}
            <Formik enableReinitialize={true}
                initialValues={{ id: id, name: product.name, price: product.price, description: product.description }}

                onSubmit={(values) => {
                    const updateProduct = async () => {
                        console.log(values);
                        await ProductService.updateProduct(values)
                        navigate("/")
                        toast.success("Chỉnh sửa thành công")
                    }

                    updateProduct();
                }

                }
            >
                <div>
                    <Form className="px-md-2">

                        <div className="row align-items-center pt-4 pb-4">
                            <div className="col-md-2 ps-3">

                                <label style={{ fontWeight: "bold" }} htmlFor="name" className="mb-0">Tên sản phẩm</label>

                            </div>
                            <div className="col-md-10 pe-4">

                                <Field type="text" id="name" name="name" placeholder="Nhập tên sản phẩm"
                                    className="form-control form-control-md" />
                            </div>
                        </div>

                        <div className="row align-items-center pt-4 pb-4">
                            <div className="col-md-2 ps-3">

                                <label style={{ fontWeight: "bold" }} htmlFor="price" className="mb-0">Giá sản phẩm</label>

                            </div>
                            <div className="col-md-10 pe-4">

                                <Field type="text" id="price" name="price"
                                    placeholder="Nhập giá sản phẩm" className="form-control form-control-md" />
                            </div>
                        </div>

                        <div className="row align-items-center pt-4 pb-4">
                            <div className="col-md-2 ps-3">

                                <label style={{ fontWeight: "bold" }} htmlFor="description" className="mb-0">Mô tả</label>

                            </div>
                            <div className="col-md-10 pe-4">

                                <Field type="text" id="description" name="description" placeholder="Nhập mô tả"
                                    className="form-control form-control-md" />

                            </div>
                        </div>

                        <div className=" text-center">
                            <button type="submit" className="btn btn-primary m-4 w-25">Chỉnh sửa</button>
                            <button type="reset" className="btn btn-secondary m-4 w-25">Hủy</button>

                        </div>
                    </Form>


                </div>
            </Formik>
        </>
    )
}

export default ProductUpdate;