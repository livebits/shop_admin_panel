import * as React from 'react';
import { FC } from 'react';
import {
    ReferenceInput,
    Edit,
    useTranslate,
    required,
    SelectInput,
    SimpleForm,
    TextInput,
    usePermissions,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
const RoleEdit = (props: any) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'role', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={required()} />
            <ArrayInput source="rolePermissions">
                <SimpleFormIterator>
                    <ReferenceInput validate={required()} source="permissionId" reference="permissions" perPage={100}>
                        <SelectInput optionText={ (choice:any) => choice.description ? choice.description : `${choice.resource}-${choice.action}` }/>
                    </ReferenceInput>
                    <SelectInput validate={required()} source="status" choices={[
                        { id: 'allow', name: translate('pos.permissionStatus.allow') },
                        { id: 'deny', name: translate('pos.permissionStatus.deny') },
                    ]} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
}

export default RoleEdit;
