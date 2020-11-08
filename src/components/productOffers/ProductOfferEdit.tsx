import * as React from 'react';
import { FC } from 'react';
import {
    usePermissions,
    Edit,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
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

const ProductOfferEdit = (props: any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'product', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    const transform = (data:any) => {
        delete data.tenantId
        delete data.updatedAt

        return {
            ...data,
        }
    };
    return <Edit {...props} transform={transform}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput 
                source="productId"
                label="resources.product-offers.fields.product"
                reference="products"
                disabled
                validate={required()}
                // filter={{ 'user.type||eq': 'customer' }}
                filterToQuery={(searchText:any) => (searchText ? { 'user.name': searchText, 'user.caption': searchText } : {})}
            >
                <AutocompleteInput
                    optionText={optionRenderer}
                />
            </ReferenceInput>
            <FormDataConsumer>
                {
                    ({ formData, ...rest }: { formData: any }) => formData.productId !== null &&
                    <ReferenceInput 
                        source="productPriceId"
                        label="resources.product-offers.fields.productPrice"
                        reference="product-prices"
                        validate={required()}
                        disabled
                        filter={{ 'productId||eq': formData.productId, 'deleted||eq': false }}
                    >
                        <AutocompleteInput
                            optionText={productPriceRenderer}
                        />
                    </ReferenceInput>
                }
            </FormDataConsumer>

            <NumberInput source="discountPercent" validate={required()} />
            <NumberInput source="discountPrice" disabled />
            <CustomDateInput source="expireDate" label="resources.product-offers.fields.expireAt" />
            <NumberInput source="totalQuantity" />
            <NumberInput source="remainQuantity" />
        </SimpleForm>
    </Edit>
};

export default ProductOfferEdit;
