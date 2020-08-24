import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    usePermissions,
    ReferenceInput,
    SelectInput,
    DateInput,
    TextInput,
    useTranslate,
    AutocompleteInput,
    FormDataConsumer,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const optionRenderer = (choice:any) => `${choice.firstName} ${choice.lastName}`;

const MessageCreate = (props:any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'message', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    
    return (
        <Create {...props}>
            <SimpleForm >
                <TextInput source="title" />
                <TextInput source="body" fullWidth multiline />
                <SelectInput source="type" choices={[
                    { id: 'SMS', name: translate('pos.messageType.sms') },
                    { id: 'NOTIFICATION', name: translate('pos.messageType.notification') },
                ]} />
                <DateInput source="expiredAt" />
                <SelectInput source="receiversType" choices={[
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
        </Create>
    );
};

export default MessageCreate;
