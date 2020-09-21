import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    ArrayInput,
    ReferenceInput,
    SelectInput,
    required,
    TextInput,
    NumberInput,
    usePermissions,
    BooleanInput,
} from 'react-admin';
import { SaveButton, Toolbar } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const CreateToolbar = (props: any) => (
    <Toolbar {...props} >
        <SaveButton
            redirect="list"
            submitOnEnter={true}
        />
        <SaveButton
            label="ra.action.saveAndNew"
            redirect={false}
            submitOnEnter={false}
            variant="text"
        />
    </Toolbar>
);

const DepartmentCreate = (props:any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'department', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return (
        <Create {...props}>
            <SimpleForm toolbar={<CreateToolbar />} redirect="list">
                <TextInput source="name" validate={required()}/>
                <TextInput source="description" fullWidth />
            </SimpleForm>
        </Create>
    );
};

export default DepartmentCreate;
