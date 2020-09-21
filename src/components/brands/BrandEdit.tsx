import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    required,
    ImageInput,
    SimpleForm,
    TextInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
const BrandEdit = (props: any) => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'brand', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    return <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={required()} />
            <TextInput source="description" fullWidth />
            <ImageInput 
                source="logo"
                accept="image/*" 
                maxSize="2000000" 
                multiple={false}
                // options={{ onRemove:onRemoveAvatar, onDrop:onDropAvatar }}
            >
                {/* <PreviewImage />  */}
            </ImageInput>
        </SimpleForm>
    </Edit>
}

export default BrandEdit;
