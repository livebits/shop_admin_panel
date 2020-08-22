import * as React from 'react';
import { FC } from 'react';
import {
    usePermissions,
    Edit,
    DateInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    AutocompleteInput,
    FormDataConsumer,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const optionRenderer = (choice:any) => `${choice.firstName} ${choice.lastName}`;

const MessageEdit = (props: any) => {
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'message', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    const transform = (data:any) => {
        delete data.receiver
        delete data.tenantId
        delete data.updatedAt
        return {
            ...data,
        }
    };
    return <Edit title="ویرایش  پیام" {...props} transform={transform}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="body" fullWidth multiline />
            <SelectInput source="type" choices={[
                { id: 'SMS', name: 'پیامک' },
                { id: 'NOTIFICATION', name: 'اعلان' },
            ]} />
            <DateInput source="expiredAt" />
            <SelectInput source="receiversType" choices={[
                { id: 'SINGLE_USER', name: 'انتخاب کاربر' },
                { id: 'ALL_USERS', name: 'همه کاربران' },
            ]} />
            <FormDataConsumer>
                    {
                        ({ formData, ...rest }: { formData: any }) => formData.receiversType === 'SINGLE_USER' &&
                        <ReferenceInput 
                            source="receiverId" 
                            reference="customers" 
                            filter={{ 'type||eq': 'customer' }}
                            filterToQuery={(searchText:any) => (searchText ? { firstName: searchText, lastName: searchText } : {})}
                        >
                            <AutocompleteInput
                                optionText={optionRenderer}
                                optionValue="userTenants[0].id"
                            />
                        </ReferenceInput>
                    }
                </FormDataConsumer>
        </SimpleForm>
    </Edit>
};

export default MessageEdit;
