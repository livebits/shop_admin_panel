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
    required,
    useTranslate,
    usePermissions,
} from 'react-admin';
import { SaveButton, Toolbar } from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const CreateToolbar = (props: any) => (
    <Toolbar {...props} >
        <SaveButton
            redirect="show"
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

const RoleCreate = (props:any) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'role', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    
    return (
        <Create {...props}>
            <SimpleForm toolbar={<CreateToolbar />} redirect="show">
                <TextInput source="name" validate={required()} />
                <ArrayInput source="rolePermissions">
                    <SimpleFormIterator>
                        <ReferenceInput validate={required()} source="permissionId" reference="permissions" perPage={100}>
                            <SelectInput optionText={ (choice:any) => choice.description ? choice.description : `${choice.resource}-${choice.action}` }/>
                        </ReferenceInput>
                        <SelectInput source="status" validate={required()} choices={[
                            { id: 'allow', name: translate('pos.permissionStatus.allow') },
                            { id: 'deny', name: translate('pos.permissionStatus.deny') },
                        ]} />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};

export default RoleCreate;
