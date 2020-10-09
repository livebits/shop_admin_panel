import * as React from 'react';
import { Datagrid, TextField, ReferenceInput, AutocompleteInput, Filter, SearchInput, NumberField, useTranslate, usePermissions, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { Customer, FilterProps } from '../../types';
import CustomDateField from '../commons/CustomDateField';
import { CustomFilterDateInput } from '../commons/CustomFilterDatePicker';
import FullNameField from '../reviews/FullNameField';

interface FilterParams {
    code?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="refNum" alwaysOn />
        <ReferenceInput
            alwaysOn
            label="resources.orders.filters.customer" 
            source="creator.userId||eq" 
            reference="user-tenants"
            filter={{ 'user.type||eq': 'customer' }}
            resettable
        >
            <AutocompleteInput
                resettable
                optionText={(choice: Customer) =>
                    choice.user ? `${choice.user.firstName} ${choice.user.lastName ?? '' }` : ''
                }
            />
        </ReferenceInput>
        <CustomFilterDateInput source="createdAt||gte" label="resources.orders.filters.minDate" />
        <CustomFilterDateInput source="createdAt||lte" label="resources.orders.filters.maxDate" />
    </Filter>
);

const OnlinePaymentsList = (props: any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'payments', action: 'read' }])
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
                source="createdBy"
                render={(record:any) => <FullNameField record={record.createdBy ? record.createdBy.user : ''} />}
            />
            <NumberField source="amount" />
            <TextField source="status" />
            <TextField source="refNum" />
            <TextField source="cartNo" />
        </Datagrid>
    </List>
}

export default OnlinePaymentsList;
