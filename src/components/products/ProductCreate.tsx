import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    FormTab,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
    ArrayInput,
    SimpleFormIterator,
    FormDataConsumer,
    usePermissions,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';
import { CreateComponentProps } from '../../types';
import { ProductCategoryFields } from './ProductCategoryFields';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

export const styles = {
    price: { width: '7em' },
    width: { width: '7em' },
    height: { width: '7em' },
    stock: { width: '7em' },
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const ProductCreate: FC<CreateComponentProps> = props => {
    const classes = useStyles();
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'product', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }

    const transform = (data:any) => {
        
        let catFields:any[] = []
        Object.keys(data).forEach(element => {
            if (element.includes("cf_")) {
                let catId = element.split('_')[1];
                catFields.push({
                    categoryFieldId: catId,
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

        return requestBody;
    };

    return (
        <Create {...props} transform={transform}>
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
        </Create>
    );
};

export default ProductCreate;
