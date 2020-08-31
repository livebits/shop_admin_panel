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
    NumberInput,
    usePermissions,
    FormDataConsumer,
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

const CategoryCreate = (props:any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'category', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    return (
        <Create {...props}>
            <SimpleForm toolbar={<CreateToolbar />} redirect="list">
                <TextInput source="name" />
                <TextInput source="description" fullWidth/>
                <ReferenceInput source="parentId" reference="categories">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ArrayInput 
                    source="categoryFields" 
                    sort={{ field: 'priority', order: 'ASC' }}
                >
                    <SimpleFormIterator>
                        <TextInput source="name"/>
                        <NumberInput source="priority"/>
                        <TextInput source="hint" fullWidth/>
                        <SelectInput source="dataType" choices={[
                            { id: 'number', name: 'pos.dataType.number' },
                            { id: 'string', name: 'pos.dataType.string' },
                            { id: 'text', name: 'pos.dataType.text' },
                            { id: 'date', name: 'pos.dataType.date' },
                            { id: 'option', name: 'pos.dataType.option' },
                        ]} />
                        
                        <FormDataConsumer>
                            {
                                (props:any) => {                                    
                                    return props.scopedFormData && props.scopedFormData.dataType && props.scopedFormData.dataType === 'number' &&
                                    <>
                                        <NumberInput 
                                            source={props.getSource('min')} 
                                            label="resources.categories.fields.min"
                                        />
                                        <NumberInput 
                                            style={{padding: '0px 5px'}}
                                            source={props.getSource('max')} 
                                            label="resources.categories.fields.max"
                                        />
                                    </>
                                }
                            }
                        </FormDataConsumer>
                        <FormDataConsumer>
                            {
                                (props:any) => {                                    
                                    return props.scopedFormData && props.scopedFormData.dataType && props.scopedFormData.dataType === 'option' &&
                                    <TextInput 
                                        source={props.getSource('options')} 
                                        label="resources.categories.fields.options" 
                                        fullWidth 
                                        multiline
                                    />
                                }
                            }
                        </FormDataConsumer>
                        <BooleanInput source="showInFilter"/>
                        {/* <TextInput source="defaultValue"/> */}
                        {/* <BooleanInput source="isRequired"/> */}
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};

export default CategoryCreate;
