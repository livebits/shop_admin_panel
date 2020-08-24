import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    NumberInput,
    ReferenceInput,
    SelectInput,
    useTranslate,
    TextInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const DiscountCreate = (props:any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'discount', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    return (
        <Create {...props}>
            <SimpleForm >
                <TextInput source="code" />
                <SelectInput source="type" choices={[
                    { id: 'constant', name: translate('pos.discountType.constant') },
                    { id: 'percent', name: translate('pos.discountType.percent') },
                ]} />
                <NumberInput source="value" />
            </SimpleForm>
        </Create>
    );
};

export default DiscountCreate;
