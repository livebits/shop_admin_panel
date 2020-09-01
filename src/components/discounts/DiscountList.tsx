import * as React from 'react';
import { Datagrid, TextField, Filter, SearchInput, NumberField, useTranslate, usePermissions, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { FilterProps } from '../../types';

const translateType = (type: string, translate:any) => {

    switch (type) {
        case 'percent':
            return translate('pos.discountType.percent');
        case 'constant':
            return translate('pos.discountType.constant');
        default:
            return '';
    }
}

interface FilterParams {
    code?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="code" alwaysOn />
    </Filter>
);

const DiscountList = (props: any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'discount', action: 'read' }])
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
                source="type"
                render={(record:any) => translateType(record.type, translate)}
            />
            <TextField source="code" />
            <NumberField source="value" />
            {
                hasPermissions(permissions, [{ resource: 'discount', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'discount', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default DiscountList;
