import * as React from 'react';
import { useTranslate, Datagrid, TextField, usePermissions, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

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
        perPage={25}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="createdAt" />
            <TextField source="title" />
            <FunctionField
                source="type"
                render={(record:any) => translateType(record.type, translate)}
            />
            <DateField source="expiredAt" />
            <FunctionField
                source="receivers"
                render={(record:any) => translateReceiverType(record.receiversType, translate)}
            />
            <FunctionField
                source="receiver"
                render={(record:any) => record.receiver ? `${record.receiver.user.firstName} ${record.receiver.user.lastName}` : ''}
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
