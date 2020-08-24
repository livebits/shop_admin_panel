import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    ArrayInput,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    TextInput,
    usePermissions,
} from 'react-admin';
import { SaveButton, Toolbar } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const CreateToolbar = (props: any) => (
    <Toolbar {...props} >
        <SaveButton
            label="ذخیره"
            redirect="show"
            submitOnEnter={true}
        />
        <SaveButton
            label="ذخیره و جدید"
            redirect={false}
            submitOnEnter={false}
            variant="text"
        />
    </Toolbar>
);

const RoleCreate = (props:any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'role', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    
    return (
        <Create {...props}>
            <SimpleForm toolbar={<CreateToolbar />} redirect="show">
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
        </Create>
    );
};

export default RoleCreate;
