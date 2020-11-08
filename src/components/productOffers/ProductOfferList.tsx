import * as React from 'react';
import { useTranslate, Datagrid, Filter, ReferenceInput, TextField, usePermissions, AutocompleteInput, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { FilterProps } from '../../types';
import CustomDateField from '../commons/CustomDateField';
import ProductNameField from '../reviews/ProductNameField';

interface FilterParams {
    name?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <ReferenceInput
            alwaysOn
            source="productId||eq" 
            reference="products"
            label="resources.product-offers.fields.product"
            ressetable
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const ProductOfferList = (props: any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'product', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }
    
    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        filters={<ListFilter />}
        perPage={25}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <FunctionField
                source="createdAt"
                render={(record:any) => <CustomDateField source={record.createdAt} />}
            />
            <FunctionField
                source="product"
                render={(record:any) => <ProductNameField record={record.product} />}
            />
            <FunctionField
                source="productPrice"
                render={(record:any) => <ProductNameField record={record.productPrice} />}
            />
            <TextField source="discountPercent" />
            <TextField source="discountPrice" />
            <FunctionField
                source="expireAt"
                render={(record:any) => <CustomDateField source={record.expireDate} />}
            />
            <TextField source="totalQuantity" />
            <TextField source="remainQuantity" />

            {
                hasPermissions(permissions, [{ resource: 'product', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'product', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default ProductOfferList;
