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
    required,
} from 'react-admin';

const DiscountCreate = (props:any) => {
    
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
