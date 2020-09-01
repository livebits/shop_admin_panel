import * as React from 'react';
import { Datagrid, TextField, Filter, SearchInput, usePermissions, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { FilterProps } from '../../types';

interface FilterParams {
    name?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="name" alwaysOn />
    </Filter>
);

const BrandList = (props: any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'brand', action: 'read' }])
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
            <TextField source="name" />
            <TextField source="description" />
            {
                hasPermissions(permissions, [{ resource: 'brand', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'brand', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default BrandList;
