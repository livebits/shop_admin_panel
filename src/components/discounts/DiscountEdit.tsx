import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    NumberInput,
    SelectInput,
    SimpleForm,
    TextInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
const DiscountEdit = (props: any) => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'discount', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <Edit title="ویرایش  تخفیف" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <SelectInput source="type" choices={[
                { id: 'constant', name: 'ثابت' },
                { id: 'percent', name: 'درصدی' },
            ]} />
            <NumberInput source="value" />
        </SimpleForm>
    </Edit>
}

export default DiscountEdit;
