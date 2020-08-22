import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const DiscountCreate = (props:any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'discount', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    return (
        <Create {...props}>
            <SimpleForm >
                <TextInput source="code" />
                <SelectInput source="type" choices={[
                    { id: 'constant', name: 'ثابت' },
                    { id: 'percent', name: 'درصدی' },
                ]} />
                <NumberInput source="value" />
            </SimpleForm>
        </Create>
    );
};

export default DiscountCreate;
