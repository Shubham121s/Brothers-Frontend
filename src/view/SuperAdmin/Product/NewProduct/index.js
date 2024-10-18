import React, { useEffect } from 'react'
import { Toast, Notification } from '../../../../components/ui'
import { useNavigate } from 'react-router-dom'
import { injectReducer } from '../../../../store'
import newProductReducer from './store'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCategories,
  getAllMaterialGrades,
  getAllPatterns,
  postNewProduct
} from './store/dataSlice'
import { apiPostNewProduct } from '../../../../services/SuperAdmin/Product/IndexService'
import ProductForm from '../ProductForm'
import FormData from 'form-data'
import { apiPostNewDrawing } from '../../../../services/SuperAdmin/Product/DrawingService'

injectReducer('new_product', newProductReducer)

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

const NewProduct = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.new_product.data.categoryList)
  const materialGrades = useSelector(
    (state) => state.new_product.data.materialGradeList
  )
  const patterns = useSelector((state) => state.new_product.data.patternList)
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllMaterialGrades())
    dispatch(getAllPatterns())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)

    const action = await dispatch(postNewProduct(values))

    if (action.payload.status < 300) {
      const formData = new FormData()

      formData.append('process_attachment', values.process_attachment)
      formData.append('raw_attachment', values.raw_attachment)
      formData.append('finish_attachment', values.finish_attachment)
      formData.append('revision_number', values.revision_number)
      formData.append('raw_weight', values.raw_weight)
      formData.append('finish_weight', values.finish_weight)
      formData.append('product_id', action.payload.data?.data?.product_id)
      const response2 = await apiPostNewDrawing(formData)
      setSubmitting(false)
      if (response2.data?.success) {
        popNotification(
          'Successfully Added',
          'success',
          'Product Successfully created'
        )
        setSubmitting(false)
      } else {
        popNotification('Unsuccessful', 'danger', 'Product not created')
        setSubmitting(false)
      }
      navigate(`/product/drawing/${action.payload.data?.data?.product_id}`)
    } else {
      popNotification('Unsuccessful', 'danger', action.payload?.data?.message)
      setSubmitting(false)
    }
  }

  const handleDiscard = () => {
    navigate('/product')
  }

  return (
    <>
      <ProductForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        categories={categories}
        materialGrades={materialGrades}
        patterns={patterns}
      />
    </>
  )
}

export default NewProduct
