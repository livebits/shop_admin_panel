import * as React from 'react';
import { FC } from 'react';
import {
    FunctionField,
    useTranslate,
    Edit,
    required,
    SelectInput,
    SimpleForm,
    TextInput,
    usePermissions,
} from 'react-admin';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
import RichTextInput from 'ra-input-rich-text';
import { API_URL } from '../../App';
const TicketEdit = (props: any) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();
    const hasPerm = hasPermissions(permissions, [{ resource: 'ticket', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    const PreviewImages = (record:any) => {
        return <img width={150} style={{padding: 5}} src={`${API_URL}/public/tickets/${record.fileName}`} alt="Avatar" />
    };

    return <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" validate={required()} />
            <RichTextInput source="body" />
            <SelectInput
                source="status"
                validate={required()}
                choices={[
                    { id: 'pending', name: translate('pos.ticketStatus.pending') },
                    { id: 'checked', name: translate('pos.ticketStatus.checked') },
                ]}
            />
            <FunctionField
                source="attachments"
                render={(record:any) => record.attachments.map((attachment:any) => PreviewImages(attachment))}
            />
            
        </SimpleForm>
    </Edit>
}

export default TicketEdit;
