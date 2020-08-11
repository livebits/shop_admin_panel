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
} from 'react-admin';
import { SaveButton, Toolbar } from 'react-admin';

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
    
    return (
        <Create {...props}>
            <SimpleForm toolbar={<CreateToolbar />} redirect="show">
                <TextInput source="name" label="نام نقش"/>
                <ArrayInput source="permissions" label="دسترسی ها">
                    <SimpleFormIterator>
                        <ReferenceInput source="actionId" reference="actions" label="دسترسی">
                            <SelectInput optionText="name" />
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
