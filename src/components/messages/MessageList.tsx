import * as React from 'react';
import { Datagrid, TextField, ReferenceField, DateField, EditButton, List, FunctionField, DeleteButton } from 'react-admin';

const translateType = (type: string) => {
    switch (type) {
        case 'SMS':
            return 'پیامک';
        case 'NOTIFICATION':
            return 'اعلان';
        default:
            return '';
    }
}

const translateReceiverType = (type: string) => {
    switch (type) {
        case 'SINGLE_USER':
            return 'کاربر خاص';
        case 'ALL_USERS':
            return 'همه کاربران';
        default:
            return '';
    }
}

const MessageList = (props: any) => (
    <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={20}
        title="پیام ها"
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="createdAt" />
            <TextField source="title" />
            <FunctionField
                label="نوع پیام"
                render={(record:any) => translateType(record.type)}
            />
            <DateField source="expiredAt" />
            <FunctionField
                label="دریافت کنندگان"
                render={(record:any) => translateReceiverType(record.receiversType)}
            />
            <FunctionField
                label="دریافت کننده"
                render={(record:any) => record.receiver ? `${record.receiver.user.firstName} ${record.receiver.user.lastName}` : ''}
            />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default MessageList;
