import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"
import * as ProductService from "./../service/ProductService"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function ProductCreate(){
    let navigate = useNavigate();
    return(
        <>
        <Formik
        initialValues={{name: "", price: "", description: ""}}

        // validationSchema={Yup.object().shape({
        //     name: Yup.string().required("hello").min(5, "Không đc")
        // })}

        onSubmit={(values) => {
            const saveProduct = async () =>{
              await  ProductService.addProduct(values)
             navigate("/")
            //   alert("Thêm mới thành công")
            // toast.success("Thêm mới thành công")
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Thêm mới thành công',
                showConfirmButton: false,
                timer: 1500
              })
            }

            saveProduct();
        }

        }
        >
        <div>
            <Form class="px-md-2">
    <div class="row align-items-center pt-4 pb-4">
        <div class="col-md-2 ps-3">

            <label style={{fontWeight: "bold"}} for="name" class="mb-0">Tên sản phẩm</label>

        </div>
        <div class="col-md-10 pe-4">

            <Field type="text" id="name" name="name" placeholder="Nhập tên sản phẩm"
                   class="form-control form-control-md" />
                   {/* <p style={{color: "red"}}><ErrorMessage name="name"/></p> */}

        </div>
    </div>

    <div class="row align-items-center pt-4 pb-4">
        <div class="col-md-2 ps-3">

            <label style={{fontWeight: "bold"}} for="price" class="mb-0">Giá sản phẩm</label>

        </div>
        <div class="col-md-10 pe-4">

            <Field type="text" id="price" name="price"
                   placeholder="Nhập giá sản phẩm" class="form-control form-control-md" />
        </div>
    </div>

    <div class="row align-items-center pt-4 pb-4">
        <div class="col-md-2 ps-3">

            <label style={{fontWeight: "bold"}} for="description" class="mb-0">Mô tả</label>

        </div>
        <div class="col-md-10 pe-4">

            <Field type="text" id="description" name="description" placeholder="Nhập mô tả"
                   class="form-control form-control-md" />

        </div>
    </div>

    <div class=" text-center">
        <button type="submit" class="btn btn-primary m-4 w-25">Thêm mới</button>
        <Link to={"/"}><button type="reset" class="btn btn-secondary m-4 w-25">Hủy</button></Link>
        

    </div>
</Form>


        </div>
        </Formik>
        </>

    );
}

export default ProductCreate;