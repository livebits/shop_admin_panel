import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    ImageField,
    required,
    ImageInput,
    NumberInput,
    TextInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const BannerCreate = (props:any) => {
    const { permissions } = usePermissions();    
    const hasPerm = hasPermissions(permissions, [{ resource: 'banner', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="link" validate={required()} />
                <NumberInput source="priority" />
                <TextInput source="description" fullWidth />

                <ImageInput
                    source="filename"
                    accept="image/*" 
                    maxSize="5000000"
                    validate={required()}
                    // multiple={false}
                    // options={{ onRemove:onRemoveAvatar, onDrop:onDropAvatar }}
                >
                    <ImageField source="src" />
                </ImageInput>
            </SimpleForm>
        </Create>
    );
};

export default BannerCreate;
