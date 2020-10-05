import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    usePermissions,
    ReferenceInput,
    SelectInput,
    TextInput,
    useTranslate,
    AutocompleteInput,
    required,
    FormDataConsumer,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { CustomDateInput } from '../commons/CustomDatePicker';

const optionRenderer = (choice:any) => `${choice.user.firstName} ${choice.user.lastName}`;

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
                <TextInput source="title" validate={required()} />
                <TextInput source="body" fullWidth multiline validate={required()} />
                <SelectInput source="type" validate={required()} choices={[
                    { id: 'SMS', name: translate('pos.messageType.sms') },
                    { id: 'NOTIFICATION', name: translate('pos.messageType.notification') },
                ]} />
                {/* <DateInput source="expiredAt" /> */}
                <CustomDateInput source="expiredAt" label="resources.messages.fields.expiredAt" />
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
                            reference="user-tenants"
                            validate={required()}
                            filter={{ 'user.type||eq': 'customer' }}
                            filterToQuery={(searchText:any) => (searchText ? { 'user.firstName': searchText, 'user.lastName': searchText } : {})}
                        >
                            <AutocompleteInput
                                optionText={optionRenderer}
                                // optionValue="userTenants[0].id"
                            />
                        </ReferenceInput>
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    );
};

export default MessageCreate;
