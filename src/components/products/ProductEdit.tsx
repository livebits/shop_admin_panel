import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    FormTab,
    NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    TabbedForm,
    required,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    FormDataConsumer,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

import CustomerReferenceField from '../../visitors/CustomerReferenceField';
import StarRatingField from '../../reviews/StarRatingField';
import Poster from './Poster';
import { styles as createStyles } from './ProductCreate';
import { Product, EditComponentProps } from '../../types';
import { ProductCategoryFields } from './ProductCategoryFields';

interface ProductTitleProps {
    record?: Product;
}

const ProductTitle: FC<ProductTitleProps> = ({ record }) =>
    record ? <span>ویرایش: {record.name}</span> : null;

const useStyles = makeStyles({
    ...createStyles,
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    tab: {
        maxWidth: '40em',
        display: 'block',
    },
});

const ProductEdit: FC<EditComponentProps> = props => {
    const classes = useStyles();

    const transform = (data:any) => {
        
        let catFields:any[] = []
        Object.keys(data).forEach(element => {
            if (element.includes("cf_")) {
                let catFieldId = Number(element.split('_')[1]);
                let productCatField = data.productCategoryFields.filter((pcf: any) => pcf.categoryFieldId === catFieldId)[0]
                
                catFields.push({
                    categoryFieldId: catFieldId,
                    id: productCatField.id,
                    value: data[element],
                })
            }
        });

        let requestBody = {
            ...data,
            prosAndCons: {
                pros: data.pros.map((val:any) => val.value),
                cons: data.cons.map((val:any) => val.value)
            },
            productCategoryFields: catFields,
        }
        delete requestBody.pros;
        delete requestBody.cons;
        delete requestBody.brand;
        delete requestBody.category;

        return requestBody;
    };

    return (
        <Edit {...props} title={<ProductTitle />} transform={transform}>
            <TabbedForm>
                <FormTab label="مشخصات محصول">
                    <TextInput
                        autoFocus
                        source="name"
                        validate={required()}
                    />
                    <TextInput
                        source="secondName"
                        fullWidth
                    />

                    <SelectInput 
                        source="status"
                        validate={required()}
                        choices={[
                            { id: 'available', name: 'موجود' },
                            { id: 'not_available', name: 'ناموجود' },
                        ]} 
                    />
                    
                    <ReferenceInput
                        source="brandId"
                        reference="brands"
                        validate={required()}
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                </FormTab>
                <FormTab
                    label="توضیحات"
                    path="description"
                >
                    <RichTextInput source="analysis" label="توضیحات فنی" />
                </FormTab>
                <FormTab
                    label="معایب/مزایا"
                    // path="description"
                >
                    <ArrayInput
                        source="pros" 
                        label="مزایا"
                    >
                        <SimpleFormIterator>
                            <TextInput source="value" label="عنوان مزایا" fullWidth/>
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput
                        source="cons" 
                        label="معایب"
                    >
                        <SimpleFormIterator>
                            <TextInput source="value" label="عنوان عیب" fullWidth/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab
                    label="فیلدهای اختصاصی"
                >
                    <ArrayInput
                        source="productFields" 
                        label="فیلد"
                    >
                        <SimpleFormIterator>
                            <TextInput source="key" label="نام"/>
                            <TextInput source="value" label="مقدار" fullWidth/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab
                    label="فیلدهای دسته بندی"
                >
                    <FormDataConsumer>
                        {(formDataProps:any) => (
                            <ProductCategoryFields {...formDataProps} />
                        )}
                    </FormDataConsumer>
                </FormTab>
                <FormTab
                    label="قیمت ها"
                >
                    <ArrayInput
                        source="prices" 
                        label="قیمت های محصول"
                    >
                        <SimpleFormIterator>
                            <TextInput source="name" label="نام" />
                            <TextInput source="color" label="رنگ" />
                            <NumberInput source="quantity" label="تعداد" />
                            <NumberInput source="price" label="قیمت" />
                            <SelectInput source="status" label="وضعیت" choices={[
                                { id: 'available', name: 'موجود' },
                                { id: 'not_available', name: 'ناموجود' },
                            ]} />
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

const requiredValidate = [required()];

export default ProductEdit;
