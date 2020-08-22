import * as React from 'react';
import { Datagrid, TextField, NumberField, usePermissions, EditButton, List, FunctionField, DeleteButton } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const translateType = (type: string) => {
    switch (type) {
        case 'percent':
            return 'درصدی';
        case 'constant':
            return 'ثابت';
        default:
            return '';
    }
}

const DiscountList = (props: any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'discount', action: 'read' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={20}
        title="تخفیفات"
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <FunctionField
                label="نوع تخفیف"
                render={(record:any) => translateType(record.type)}
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
