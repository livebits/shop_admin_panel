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

const BrandCreate = (props:any) => {
    
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="description" fullWidth />
            </SimpleForm>
        </Create>
    );
};

export default BrandCreate;
