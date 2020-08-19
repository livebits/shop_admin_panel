import * as React from 'react';
import { FC, useState } from 'react';
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
    ImageInput,
    ImageField,
} from 'react-admin';
import { InputAdornment, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

import {
    SaveButton,
    DeleteButton
} from 'react-admin';
import { styles as createStyles } from './ProductCreate';
import { Product, EditComponentProps } from '../../types';
import { ProductCategoryFields } from './ProductCategoryFields';
import { useNotify, useRefresh, useRedirect, fetchStart, fetchEnd } from 'react-admin';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../App';


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
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [ id, setId ] = useState(Number(props.match.params.id));

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
        delete requestBody.thumbnail;

        return requestBody;
    };

    ///////////////////    thumbnail     ///////////////////

    const onRemoveThumbnail = () => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator 
        
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/products/${id}/thumbnail`, 
            { 
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('product_image_deleted');
            })
            .catch((e) => {
                notify('product_thumbnail_not_deleted', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
    }

    const onDropThumbnail = (file:any) => {

        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator 
        
        const token = localStorage.getItem('token');
        const formData  = new FormData();
        formData.append('file', file[0]);

        fetch(`${API_URL}/products/${id}/thumbnail`, 
            { 
                method: 'POST', 
                body: formData,
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('product_image_updated');
            })
            .catch((e) => {
                notify('product_thumbnail_not_uploaded', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
    }

    ////////////////////////////////////////////////////////////

    ///////////////////    Attchments     ///////////////////

    const onRemoveAttachments = (data:any) => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator 
        
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/products/${id}/product-attachments/${data.id}`, 
            { 
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('product_image_deleted');
            })
            .catch((e) => {
                notify('product_image_not_deleted', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
    }

    const onDropAttachment = (file:any) => {        
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator 
        
        const token = localStorage.getItem('token');
        const formData  = new FormData();
        formData.append('file', file[0]);
        formData.append('description', file[0].name);

        fetch(`${API_URL}/products/${id}/product-attachments`, 
            { 
                method: 'POST', 
                body: formData,
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('product_image_updated');
            })
            .catch((e) => {
                notify('product_thumbnail_not_uploaded', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
        refresh();
    }

    ////////////////////////////////////////////////////////////


    const PreviewImage = (record:any) => {
        if (typeof record.record === 'string') {
            return <img width={150} src={`${API_URL}/public/products/${record.record}`} alt="Avatar" />
        } else {
            return <img width={150} src={`${record.record.undefined}`} alt="Avatar" />
        }
    };

    const PreviewImages = (record:any) => {
        if (record.record.fileName !== undefined) {
            return <img width={150} style={{padding: 5}} src={`${API_URL}/public/products/${record.record.fileName}`} alt="Avatar" />
        } else {
            return <img width={150} style={{padding: 5}} src={`${record.record.undefined}`} alt="Avatar" />
        }
    };

    return (
        <Edit 
            {...props} 
            undoable={false} 
            // onSuccess={onSuccess}
            title={<ProductTitle />} 
            transform={transform}
        >
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
                    <ImageInput 
                        source="thumbnail" 
                        label="تصویر محصول" 
                        accept="image/*" 
                        maxSize="2000000" 
                        multiple={false}
                        options={{ onRemove:onRemoveThumbnail, onDrop:onDropThumbnail }}
                    >
                        {/* <ImageField source="thumbnail" src="thumbnail" /> */}
                        <PreviewImage /> 
                    </ImageInput>

                    <SelectInput
                        source="status"
                        label="وضعیت"
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
                <FormTab
                    label="سایر"
                >
                    <ImageInput 
                        source="attachments" 
                        label="تصاویر" 
                        accept="image/*" 
                        maxSize="2000000" 
                        multiple={true}
                        options={{ onRemove:onRemoveAttachments, onDrop:onDropAttachment }}
                    >
                        {/* <ImageField source="thumbnail" src="thumbnail" /> */}
                        <PreviewImages /> 
                    </ImageInput>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

const requiredValidate = [required()];

export default ProductEdit;
