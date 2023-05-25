import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"
import * as ProductService from "./../service/ProductService"
import * as CategoryService from "./../service/CategoryService"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function ProductCreate(){
    let navigate = useNavigate();
    const  [categoryList, setCategoryList] = useState([]);

    const getListCategory = async () => {
        const categorys = await CategoryService.getAll();
        setCategoryList(categorys);
    }

    useEffect(() => {
        getListCategory();
    }, [])
    return(
        <>
        <Formik
        initialValues={{name: "", price: "", description: "", category: ""}}

        validationSchema={Yup.object().shape({
            name: Yup.string().required("Không được để trống.").min(5, "Không được ít hơn 5 ký tự."),
            price: Yup.number().required("Không được để trống.").min(1, "Không được nhỏ hơn 1.").typeError("Giá phải là một số."),
            description: Yup.string().required("Không được để trống.").max(200, "Mô tả tối đa 200 ký tự"),
            category: Yup.string().required("Không được để trống.")
        })}

        onSubmit={(values) => {
            const saveProduct = async () =>{
                console.log(values)
              await  ProductService.addProduct(values)
             navigate("/")
            //   alert("Thêm mới thành công")
            // toast.success("Thêm mới thành công")
            Swal.fire({
                position: 'center',
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
                   <p style={{color: "red"}}><ErrorMessage name="name"/></p>

        </div>
    </div>

    <div class="row align-items-center pt-4 pb-4">
        <div class="col-md-2 ps-3">

            <label style={{fontWeight: "bold"}} for="price" class="mb-0">Giá sản phẩm</label>

        </div>
        <div class="col-md-10 pe-4">

            <Field type="text" id="price" name="price"
                   placeholder="Nhập giá sản phẩm" class="form-control form-control-md" />
                   <p style={{color: "red"}}><ErrorMessage name="price"/></p>
        </div>
    </div>

    <div class="row align-items-center pt-4 pb-4">
        <div class="col-md-2 ps-3">

            <label style={{fontWeight: "bold"}} for="description" class="mb-0">Mô tả</label>

        </div>
        <div class="col-md-10 pe-4">

            <Field type="text" id="description" name="description" placeholder="Nhập mô tả"
                   class="form-control form-control-md" />
                   <p style={{color: "red"}}><ErrorMessage name="description"/></p>

        </div>
    </div>

    <div class="row align-items-center pt-4 pb-4">
        <div class="col-md-2 ps-3">

            <label style={{fontWeight: "bold"}} for="category" class="mb-0">Danh mục</label>

        </div>
        <div class="col-md-10 pe-4">

            <Field as="select" id="category" name="category" placeholder="Nhập mô tả"
                   class="form-control form-control-md">
                    {/* <option value="">Chọn danh mục</option>
                    <option value="1">Bánh</option>
                    <option value="2">Kẹo</option>
                    <option value="3">Mỳ ăn liền</option> */}
                    <option value="">Chọn danh mục</option>

                    {categoryList.map((category, index) => (
                        <option key={index} value={category.id}>{category.name}</option>
                    ))}
                   </Field>
                   <p style={{color: "red"}}><ErrorMessage name="category"/></p>

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