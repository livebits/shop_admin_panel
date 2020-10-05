import * as React from 'react';
import { useTranslate, Datagrid, Filter, SearchInput, TextField, usePermissions, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { FilterProps } from '../../types';
import CustomDateField from '../commons/CustomDateField';

const translateType = (type: string, translate: any) => {
    switch (type) {
        case 'SMS':
            return translate('pos.messageType.sms');
        case 'NOTIFICATION':
            return translate('pos.messageType.notification');
        default:
            return '';
    }
}

const translateReceiverType = (type: string, translate: any) => {
    switch (type) {
        case 'SINGLE_USER':
            return translate('pos.receiverType.single_user');
        case 'ALL_USERS':
            return translate('pos.receiverType.all_users');
        default:
            return '';
    }
}

interface FilterParams {
    name?: string;
}

export const ListFilter: React.FC<FilterProps<FilterParams>> = props => (
    <Filter {...props}>
        <SearchInput source="title" alwaysOn />
    </Filter>
);

const MessageList = (props: any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'message', action: 'read' }])
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
            <TextField source="title" />
            <FunctionField
                source="type"
                render={(record:any) => translateType(record.type, translate)}
            />
            <FunctionField
                source="expiredAt"
                render={(record:any) => <CustomDateField source={record.expiredAt} />}
            />
            <FunctionField
                source="receivers"
                render={(record:any) => translateReceiverType(record.receiversType, translate)}
            />
            <FunctionField
                source="receiver"
                render={(record:any) => record.receiver && record.receiver.user ? `${record.receiver.user.firstName} ${record.receiver.user.lastName}` : ''}
            />
            {
                hasPermissions(permissions, [{ resource: 'user', action: 'update' }]) && 
                <EditButton />
            } 
            {
                hasPermissions(permissions, [{ resource: 'user', action: 'delete' }]) && 
                <DeleteButton />
            }
        </Datagrid>
    </List>
}

export default MessageList;
