import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    PasswordInput,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
} from 'react-admin';

const TenantCreate = (props:any) => {
    
    return (
        <Create {...props}>
            <SimpleForm >
                <TextInput source="name" />
                <TextInput source="description" multiline fullWidth />
                <TextInput source="phone" />
                <TextInput source="mobile" />
                <SelectInput source="status" choices={[
                    { id: 'active', name: 'فعال' },
                    { id: 'inactive', name: 'غیرفعال' },
                    { id: 'pending_confirmation', name: 'در حال بررسی' },
                    { id: 'expired', name: 'منقضی شده' },
                ]} />
                <TextInput source="address" />
                <TextInput source="country" />
                <TextInput source="city" />
                <TextInput source="state" />
                <TextInput source="zip" />
            </SimpleForm>
        </Create>
    );
};

export default TenantCreate;
