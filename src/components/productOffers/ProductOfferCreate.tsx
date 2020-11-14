import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    usePermissions,
    ReferenceInput,
    NumberInput,
    TextInput,
    useTranslate,
    AutocompleteInput,
    required,
    FormDataConsumer,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { CustomDateInput } from '../commons/CustomDatePicker';

const optionRenderer = (choice:any) => `${choice.name} ${choice.caption ? ` - ${choice.caption} ` : ''}`;

const productPriceRenderer = (choice:any) => `${choice.name} (${choice.price})`;

const ProductOfferCreate = (props:any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'product', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    
    return (
        <Create {...props}>
            <SimpleForm >
                <ReferenceInput 
                    source="productId"
                    label="resources.product-offers.fields.product"
                    reference="products"
                    validate={required()}
                    // filter={{ 'user.type||eq': 'customer' }}
                    filterToQuery={(searchText:any) => (searchText ? { 'name': searchText } : {})}
                >
                    <AutocompleteInput
                        optionText={optionRenderer}
                    />
                </ReferenceInput>
                <FormDataConsumer>
                    {
                        ({ formData, ...rest }: { formData: any }) => formData.productId > 0 &&
                        <ReferenceInput 
                            source="productPriceId"
                            label="resources.product-offers.fields.productPrice"
                            reference="product-prices"
                            validate={required()}
                            filter={{ 'productId||eq': formData.productId, 'deleted||eq': false }}
                        >
                            <AutocompleteInput
                                optionText={productPriceRenderer}
                            />
                        </ReferenceInput>
                    }
                </FormDataConsumer>

                <NumberInput source="discountPercent" validate={required()} />
                {/* <TextInput source="discountPrice" /> */}
                <CustomDateInput source="expireDate" label="resources.product-offers.fields.expireAt" />
                <NumberInput source="totalQuantity" />
                {/* <TextInput source="remainQuantity" /> */}
                
            </SimpleForm>
        </Create>
    );
};

export default ProductOfferCreate;
