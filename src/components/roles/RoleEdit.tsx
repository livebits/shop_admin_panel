import * as React from 'react';
import { FC } from 'react';
import {
    ReferenceInput,
    Edit,
    EditButton,
    DateInput,
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
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'role', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <Edit title="ویرایش نقش" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" label="کد"/>
            <TextInput source="name" label="نام نقش"/>
            <ArrayInput source="rolePermissions" label="دسترسی ها">
                <SimpleFormIterator>
                    <ReferenceInput source="permissionId" reference="permissions" label="دسترسی" perPage={100}>
                        <SelectInput optionText={ (choice:any) => choice.description ? choice.description : `${choice.resource}-${choice.action}` }/>
                    </ReferenceInput>
                    <SelectInput source="status" label="وضعیت" choices={[
                        { id: 'allow', name: 'مجاز' },
                        { id: 'deny', name: 'غیرمجاز' },
                    ]} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
}

export default RoleEdit;
