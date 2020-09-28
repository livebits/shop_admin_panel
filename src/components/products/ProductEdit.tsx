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
    useTranslate,
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
import { ColorInput } from 'react-admin-color-input';
import {
    usePermissions,
    DeleteButton
} from 'react-admin';
import { styles as createStyles } from './ProductCreate';
import { Product, EditComponentProps } from '../../types';
import { ProductCategoryFields } from './ProductCategoryFields';
import { useNotify, useRefresh, useRedirect, fetchStart, fetchEnd } from 'react-admin';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../App';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';


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
    const translate = useTranslate();
    const { permissions } = usePermissions();
    const classes = useStyles();
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [ id, setId ] = useState(Number(props.match.params.id));

    const hasPerm = hasPermissions(permissions, [{ resource: 'product', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    const transform = (data:any) => {
        let catFields:any[] = []
        Object.keys(data).forEach(element => {
            if (element.includes("cf_")) {
                let catFieldId = Number(element.split('_')[1]);
                let catId = Number(element.split('_')[2]);
                
                if (catId !== data.categoryId) {
                    return
                }

                let productCatField = data.productCategoryFields.filter((pcf: any) => pcf.categoryFieldId === catFieldId)[0]
                
                if (productCatField) {
                    catFields.push({
                        categoryFieldId: catFieldId,
                        id: productCatField.id,
                        value: data[element],
                    })
                } else {
                    catFields.push({
                        categoryFieldId: catFieldId,
                        value: data[element],
                    })
                }
            }
        });

        let requestBody = {
            ...data,
            pros: data.pros ? data.pros.map((val:any) => val) : [],
            cons: data.cons ? data.cons.map((val:any) => val) : [],
            productCategoryFields: catFields,
            brand: { id: data.brandId },
            category: { id: data.categoryId },
        }
        // delete requestBody.brand;
        // delete requestBody.category;
        delete requestBody.thumbnail;
        delete requestBody.attachments;
        delete requestBody.updatedAt;

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
                notify('notification.product_image_deleted');
            })
            .catch((e) => {
                notify('notification.product_thumbnail_not_deleted', 'warning')
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
                notify('notification.product_image_updated');
            })
            .catch((e) => {
                notify('notification.product_image_not_updated', 'warning')
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
                notify('notification.product_image_deleted');
            })
            .catch((e) => {
                notify('notification.product_image_not_deleted', 'warning')
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
                notify('notification.product_image_updated');
            })
            .catch((e) => {
                notify('notification.product_image_not_uploaded', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
        refresh();
    }

    ////////////////////////////////////////////////////////////


    const PreviewImage = (record:any) => {
        if (typeof record.record === 'string') {
            return <img width={150} src={`${API_URL}/${record.record}`} alt="Avatar" />
        } else {
            return <img width={150} src={`${record.record.undefined}`} alt="Avatar" />
        }
    };

    const PreviewImages = (record:any) => {
        if (record.record.fileName !== undefined) {
            return <img width={150} style={{padding: 5}} src={`${API_URL}/${record.record.fileName}`} alt="Avatar" />
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
                <FormTab label="resources.products.tabs.public">
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
                            { id: 'available', name: translate('pos.productStatus.available') },
                            { id: 'not_available', name: translate('pos.productStatus.not_available') },
                        ]}
                    />
                    
                    <ReferenceInput
                        source="brandId"
                        reference="brands"
                        validate={required()}
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <ImageInput 
                        source="thumbnail" 
                        accept="image/*" 
                        maxSize="2000000" 
                        multiple={false}
                        options={{ onRemove:onRemoveThumbnail, onDrop:onDropThumbnail }}
                    >
                        {/* <ImageField source="thumbnail" src="thumbnail" /> */}
                        <PreviewImage /> 
                    </ImageInput>
                </FormTab>
                <FormTab
                    label="resources.products.tabs.description"
                    path="description"
                >
                    <TextInput
                        source="guarantee"
                        fullWidth
                    />
                    <RichTextInput source="analysis" />
                </FormTab>
                <FormTab
                    label="resources.products.tabs.proscons"
                    path="proscons"
                >
                    <ArrayInput
                        source="pros"
                    >
                        <SimpleFormIterator>
                            <TextInput label="resources.products.fields.prosValue" fullWidth/>
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput
                        source="cons" 
                    >
                        <SimpleFormIterator>
                            <TextInput label="resources.products.fields.consValue" fullWidth/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab
                    label="resources.products.tabs.productFields"
                    path="productFields"
                >
                    <ArrayInput
                        source="productFields"
                    >
                        <SimpleFormIterator>
                            <TextInput source="key" label="resources.products.fields.fieldKey"/>
                            <TextInput source="value" label="resources.products.fields.fieldValue" fullWidth/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab
                    label="resources.products.tabs.category"
                    path="category"
                >
                    <FormDataConsumer>
                        {(formDataProps:any) => (
                            <ProductCategoryFields {...formDataProps} />
                        )}
                    </FormDataConsumer>
                </FormTab>
                <FormTab
                    label="resources.products.tabs.prices"
                    path="prices"
                >
                    <ArrayInput
                        source="prices"
                    >
                        <SimpleFormIterator>
                            <TextInput source="name" label="resources.products.fields.priceFields.name" validate={required()} />
                            <ColorInput source="color" variant="filled" label="resources.products.fields.priceFields.color" validate={required()} />
                            <NumberInput source="quantity" label="resources.products.fields.priceFields.quantity" validate={required()} />
                            <NumberInput source="price" label="resources.products.fields.priceFields.price" validate={required()} />
                            <NumberInput source="offPercent" label="resources.products.fields.priceFields.offPercent" />
                            <NumberInput source="offPrice" label="resources.products.fields.priceFields.offPrice" />
                            <SelectInput source="status" label="resources.products.fields.priceFields.status" 
                                validate={required()}
                                choices={[
                                    { id: 'available', name: translate('pos.productStatus.available') },
                                    { id: 'not_available', name: translate('pos.productStatus.not_available') },
                                ]}
                            />
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab
                    label="resources.products.tabs.other"
                    path="other"
                >
                    <ImageInput 
                        source="attachments"
                        accept="image/*" 
                        maxSize="2000000" 
                        multiple={true}
                        options={{ onRemove:onRemoveAttachments, onDrop:onDropAttachment }}
                    >
                        <PreviewImages /> 
                    </ImageInput>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

const requiredValidate = [required()];

export default ProductEdit;
