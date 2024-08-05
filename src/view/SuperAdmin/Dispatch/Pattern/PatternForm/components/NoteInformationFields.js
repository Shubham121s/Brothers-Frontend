import React, { memo } from 'react'
import { Card, FormItem, Select } from '../../../../../../components/ui'
import { Field } from 'formik'
import { isEmpty } from 'lodash';
import { NOTE_LIST } from '../constant';


const NoteInformationFields = (props) => {
    const { values, errors, touched } = props

    const noteListData = NOTE_LIST.map((note) => {
        return { label: note.title, value: note }
    })

    return (
        <FormItem
            className='mb-0 h-max'
            label="Note Details"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="DispatchNote">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={noteListData}
                        value={noteListData.filter(
                            (note) =>
                                note.value?.id === values?.id
                        )}
                        onChange={(option) =>
                            form.setFieldValue(
                                field.name,
                                option.value
                            )
                        }
                    />
                )}
            </Field>
            {!isEmpty(values) ? <Card className='mt-2'>
                <div className='flex justify-between'>
                    <div dangerouslySetInnerHTML={{ __html: values?.note }}></div>
                </div>
            </Card> : null
            }
        </FormItem>
    )
}

export default memo(NoteInformationFields)