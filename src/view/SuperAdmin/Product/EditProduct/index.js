import React, { useEffect } from 'react'
import { Toast, Notification } from '../../../../components/ui'
import { useLocation, useNavigate } from 'react-router-dom'
import { injectReducer } from '../../../../store'
import editProductReducer from './store'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCategories,
  getAllMaterialGrades,
  getAllPatterns,
  getProductDetails
} from './store/dataSlice'
import { apiUpdateProduct } from '../../../../services/SuperAdmin/Product/IndexService'
import ProductForm from '../ProductForm'

injectReducer('edit_product', editProductReducer)

const popNotification = (keyword, type, message) => {
  Toast.push(
    <Notification
      title={keyword}
      type={type}
      duration={2500}
    >
      {message}
    </Notification>,
    {
      placement: 'top-center'
    }
  )
}

const EditProduct = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const product_id = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )
  const categories = useSelector(
    (state) => state.edit_product.data.categoryList
  )
  const materialGrades = useSelector(
    (state) => state.edit_product.data.materialGradeList
  )
  const patterns = useSelector((state) => state.edit_product.data.patternList)
  const initialData = useSelector(
    (state) => state.edit_product.data.productDetails
  )
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllMaterialGrades())
    dispatch(getAllPatterns())
    dispatch(getProductDetails({ product_id: product_id }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)

    const response = await apiUpdateProduct(values)

    if (response.data?.success) {
      popNotification('Successfull', 'success', 'Product Updated Successfully')
      navigate(`/product/list`)
    } else {
      popNotification('Unsuccessful', 'danger', 'Product not created')
    }
  }

  const handleDiscard = () => {
    navigate('/product/list')
  }

  return (
    <>
      <ProductForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        categories={categories}
        materialGrades={materialGrades}
        patterns={patterns}
        initialData={initialData}
      />
    </>
  )
}

export default EditProduct
