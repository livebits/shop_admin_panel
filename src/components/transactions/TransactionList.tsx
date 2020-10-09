import * as React from 'react';
import { Datagrid, TextField, ReferenceInput, AutocompleteInput, Filter, SearchInput, NumberField, useTranslate, usePermissions, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { Customer, FilterProps } from '../../types';
import CustomDateField from '../commons/CustomDateField';
import { CustomFilterDateInput } from '../commons/CustomFilterDatePicker';
import FullNameField from '../reviews/FullNameField';

const translateType = (type: string, translate:any) => {

    switch (type) {
        case 'increase_credit':
            return translate('pos.transactionType.increase_credit');
        case 'decrease_credit':
            return translate('pos.transactionType.decrease_credit');
        default:
            return '';
    }
}

const translateReason = (reason: string, translate:any) => {

    switch (reason) {
        case 'order':
            return translate('pos.transactionReason.order');
        case 'charge':
            return translate('pos.transactionReason.charge');
        default:
            return '';
    }
}

interface FilterParams {
    code?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="id" alwaysOn />
        <ReferenceInput
            alwaysOn
            label="resources.orders.filters.customer" 
            source="customerId||eq" 
            reference="user-tenants"
            filter={{ 'user.type||eq': 'customer' }}
        >
            <AutocompleteInput
                optionText={(choice: Customer) =>
                    choice.user ? `${choice.user.firstName} ${choice.user.lastName ?? '' }` : ''
                }
            />
        </ReferenceInput>
        <CustomFilterDateInput source="createdAt||gte" label="resources.orders.filters.minDate" />
        <CustomFilterDateInput source="createdAt||lte" label="resources.orders.filters.maxDate" />
    </Filter>
);

const TransactionList = (props: any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'transaction', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        filters={<ListFilter />}
        bulkActionButtons={false}
        perPage={25}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <FunctionField
                source="createdAt"
                render={(record:any) => <CustomDateField source={record.createdAt} />}
            />
            <FunctionField
                source="customer"
                render={(record:any) => <FullNameField record={record.customer ? record.customer.user : ''} />}
            />
            <NumberField source="price" />
            <FunctionField
                source="type"
                render={(record:any) => translateType(record.type, translate)}
            />
            <FunctionField
                source="reason"
                render={(record:any) => translateReason(record.reason, translate)}
            />
            <TextField source="description" />
            {/* <FunctionField
                source="relatedId"
                render={(record:any) => <FullNameField record={record.customer ? record.customer.user : ''} />}
            /> */}
            {
                hasPermissions(permissions, [{ resource: 'transaction', action: 'update' }]) && 
                <EditButton />
            } 
            {/* {
                hasPermissions(permissions, [{ resource: 'transaction', action: 'delete' }]) && 
                <DeleteButton />
            } */}
        </Datagrid>
    </List>
}

export default TransactionList;
