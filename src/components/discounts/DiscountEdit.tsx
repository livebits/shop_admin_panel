import * as React from 'react';
import { FC } from 'react';
import {
    required,
    Edit,
    useTranslate,
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
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'discount', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput validate={required()} source="code" />
            <SelectInput validate={required()} source="type" choices={[
                { id: 'constant', name: translate('pos.discountType.constant') },
                { id: 'percent', name: translate('pos.discountType.percent') },
            ]} />
            <NumberInput validate={required()} source="value" />
        </SimpleForm>
    </Edit>
}

export default DiscountEdit;
