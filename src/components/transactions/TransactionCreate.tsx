import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    NumberInput,
    required,
    SelectInput,
    useTranslate,
    TextInput,
    ReferenceInput,
    FormDataConsumer,
    AutocompleteInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { Customer } from '../../types';

const optionRenderer = (choice:any) => `سفارش: #${choice.id}`;

const TransactionCreate = (props:any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'transaction', action: 'create' }])
    if (!hasPerm) {
        return <ACLError />
    }
    return (
        <Create {...props}>
            <SimpleForm >
                <ReferenceInput
                    source="customerId"
                    validate={required()}
                    filter={{ 'user.type||eq': 'customer' }}
                    filterToQuery={(searchText:any) => (searchText ? { 'user.firstName': searchText, 'user.lastName': searchText } : {})}
                    reference="user-tenants"
                >
                    <AutocompleteInput
                        optionText={(choice: Customer) =>
                            `${choice.user.firstName} ${choice.user.lastName}`
                        }
                    />
                </ReferenceInput>
                <NumberInput source="price" validate={required()}/>
                <SelectInput source="reason" validate={required()} choices={[
                    { id: 'order', name: translate('pos.transactionReason.order') },
                    { id: 'charge', name: translate('pos.transactionReason.charge') },
                ]} />
                <FormDataConsumer>
                    {
                        ({ formData, ...rest }: { formData: any }) => formData.reason === 'charge' &&
                        <SelectInput source="type" validate={required()} choices={[
                            { id: 'increase_credit', name: translate('pos.transactionType.increase_credit') },
                            { id: 'decrease_credit', name: translate('pos.transactionType.decrease_credit') },
                        ]} />
                    }
                </FormDataConsumer>

                <FormDataConsumer>
                    {
                        ({ formData, ...rest }: { formData: any }) => formData.reason === 'order' && formData.customerId &&
                        <ReferenceInput 
                            source="relatedId"
                            label="resources.transactions.fields.relatedId"
                            reference="orders"
                            validate={required()}
                            filter={{ 'customerId||eq': formData.customerId, 'factor.status||eq': 'not_paid' }}
                            filterToQuery={(searchText:any) => (searchText ? { 'id': searchText } : {})}
                        >
                            <AutocompleteInput
                                optionText={optionRenderer}
                            />
                        </ReferenceInput>
                    }
                </FormDataConsumer>
                <TextInput multiline fullWidth source="description" />
            </SimpleForm>
        </Create>
    );
};

export default TransactionCreate;
