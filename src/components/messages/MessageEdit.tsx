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
    useTranslate,
    AutocompleteInput,
    required,
    FormDataConsumer,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const optionRenderer = (choice:any) => `${choice.firstName} ${choice.lastName}`;

const MessageEdit = (props: any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
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
    return <Edit {...props} transform={transform}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" validate={required()} />
            <TextInput source="body" fullWidth multiline validate={required()} />
            <SelectInput source="type" validate={required()} choices={[
                { id: 'SMS', name: translate('pos.messageType.sms') },
                { id: 'NOTIFICATION', name: translate('pos.messageType.notification') },
            ]} />
            <DateInput source="expiredAt" />
            <SelectInput source="receiversType" validate={required()} choices={[
                { id: 'SINGLE_USER', name: translate('pos.receiverType.single_user') },
                { id: 'ALL_USERS', name: translate('pos.receiverType.all_users') },
            ]} />
            <FormDataConsumer>
                    {
                        ({ formData, ...rest }: { formData: any }) => formData.receiversType === 'SINGLE_USER' &&
                        <ReferenceInput 
                            source="receiverId"
                            label="resources.messages.fields.receiver"
                            reference="customers"
                            validate={required()}
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
