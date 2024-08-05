import { Field } from 'formik';
import { Button, FormItem, Upload } from '../../../../../components/ui'
import FormData from 'form-data'
import { apiUploadDrawingAttachment } from '../../../../../services/admin/product/DrawingService';

const DrawingPdf = (props) => {
    const { touched, errors, label } = props
    const beforeUpload = (files) => {
        let valid = true;
        const allowedFileTypes = ['.pdf'];

        if (files) {
            for (const file of files) {
                const fileExtension = file.name.split('.').pop().toLowerCase();

                if (!allowedFileTypes.includes(`.${fileExtension}`)) {
                    valid = 'Please upload a .pdf file!';
                }
            }
        }

        return valid;
    }
    const onSetFormFile = async (form, field, file) => {
        if (file.length > 0) {
            const formData = new FormData()
            formData.append('file', file[0])
            // const response = await apiUploadDrawingAttachment(formData)
            // if (response.data.success) {
            //     form.setFieldValue(field.name, response.data.filePath)
            // }
        } else {
            form.setFieldValue(field.name, '')
        }
    }

    return (
        <FormItem
            label={`${label} (.pdf)`}
            labelClass='mb-0'
            className='w-max' 
            invalid={errors[String(label).split(' ').join('_').toLowerCase()] && touched[String(label).split(' ').join('_').toLowerCase()]}
            errorMessage={errors[String(label).split(' ').join('_').toLowerCase()]}
        >
            <Field name={String(label).split(' ').join('_').toLowerCase()} className='mb-0'>
                {({ field, form }) => {
                    return (
                        <>
                            <Upload
                                className="cursor-pointer text-center items-center flex"
                                showList={true}
                                uploadLimit={1}
                                onChange={(files) => onSetFormFile(form, field, files)}
                                onFileRemove={(files) =>
                                    onSetFormFile(form, field, files)
                                }
                                beforeUpload={beforeUpload}
                            >
                                <Button size='sm' type='button' variant='solid'>Upload {label}</Button>
                            </Upload>
                        </>
                    )
                }}
            </Field>
        </FormItem>
    )
}

export default DrawingPdf