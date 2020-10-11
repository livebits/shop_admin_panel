import * as React from 'react';
import { FC } from 'react';
import {
    required,
    Edit,
    useTranslate,
    NumberInput,
    SelectInput,
    SimpleForm,
    AutocompleteInput,
    TextInput,
    ReferenceInput,
    FormDataConsumer,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import { Customer } from '../../types';

const optionRenderer = (choice:any) => `سفارش: #${choice.id}`;

const TransactionEdit = (props: any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const hasPerm = hasPermissions(permissions, [{ resource: 'transaction', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    const transform = (data:any) => {
        let requestBody = {
            description: data.description
        }

        return requestBody;
    };

    return <Edit {...props} transform={transform}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput
                source="customerId"
                disabled
                validate={required()}
                filter={{ 'user.type||eq': 'customer' }}
                reference="user-tenants"
            >
                <AutocompleteInput
                    optionText={(choice: Customer) =>
                        `${choice.user.firstName} ${choice.user.lastName}`
                    }
                />
            </ReferenceInput>
            <NumberInput disabled source="price" validate={required()}/>
            <SelectInput disabled source="reason" validate={required()} choices={[
                { id: 'order', name: translate('pos.transactionReason.order') },
                { id: 'charge', name: translate('pos.transactionReason.charge') },
            ]} />
            <FormDataConsumer>
                {
                    ({ formData, ...rest }: { formData: any }) => formData.reason === 'charge' &&
                    <SelectInput disabled source="type" label="resources.transactions.fields.type" validate={required()} choices={[
                        { id: 'increase_credit', name: translate('pos.transactionType.increase_credit') },
                        { id: 'decrease_credit', name: translate('pos.transactionType.decrease_credit') },
                    ]} />
                }
            </FormDataConsumer>

            <FormDataConsumer>
                {
                    ({ formData, ...rest }: { formData: any }) => formData.reason === 'order' &&
                    <ReferenceInput 
                        source="relatedId"
                        label="resources.transactions.fields.relatedId"
                        reference="orders"
                        disabled
                        validate={required()}
                        filter={{ 'factor.status||eq': 'not_paid' }}
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
    </Edit>
}

export default TransactionEdit;
