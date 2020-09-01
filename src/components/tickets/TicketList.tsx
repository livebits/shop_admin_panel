import * as React from 'react';
import { Datagrid, TextField, Filter, SearchInput, useTranslate, usePermissions, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import FullNameField from '../reviews/FullNameField';
import { FilterProps } from '../../types';

interface FilterParams {
    name?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="title" alwaysOn />
    </Filter>
);

const TicketList = (props: any) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'ticket', action: 'read' }])
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
                source="customer"
                render={(record:any) => record.customer ? <FullNameField record={record.customer.user} /> : ''}
            />
            <TextField source="title" />
            <FunctionField
                source="status"
                render={(record:any) => translate(`pos.ticketStatus.${record.status}`)}
            />
            {
                hasPermissions(permissions, [{ resource: 'ticket', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'ticket', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default TicketList;
