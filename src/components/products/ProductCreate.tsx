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
    useTranslate,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';
import { CreateComponentProps } from '../../types';
import { ProductCategoryFields } from './ProductCategoryFields';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { ColorInput } from 'react-admin-color-input';

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
    const translate = useTranslate();
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
                pros: data.pros ? data.pros.map((val:any) => val.value) : [],
                cons: data.cons ? data.cons.map((val:any) => val.value) : []
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
                            <TextInput source="value" label="resources.products.fields.prosValue" fullWidth/>
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput
                        source="cons" 
                    >
                        <SimpleFormIterator>
                            <TextInput source="value" label="resources.products.fields.consValue" fullWidth/>
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
                            <ColorInput source="color" label="resources.products.fields.priceFields.color" validate={required()} />
                            <NumberInput source="quantity" label="resources.products.fields.priceFields.quantity" validate={required()} />
                            <NumberInput source="price" label="resources.products.fields.priceFields.price" validate={required()} />
                            <NumberInput source="offPercent" label="resources.products.fields.priceFields.offPercent" />
                            <NumberInput source="offPrice" label="resources.products.fields.priceFields.offPrice" />
                            <SelectInput source="status" label="resources.products.fields.priceFields.status" validate={required()}
                                choices={[
                                    { id: 'available', name: translate('pos.productStatus.available') },
                                    { id: 'not_available', name: translate('pos.productStatus.not_available') },
                                ]}
                            />
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default ProductCreate;
