import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    usePermissions,
    SelectArrayInput,
    ReferenceArrayInput,
    SelectInput,
    SimpleForm,
    TextInput,
    ImageInput,
} from 'react-admin';
import { useDispatch } from 'react-redux';
import { useNotify, useRedirect, fetchStart, fetchEnd, useRefresh } from 'react-admin';
import { API_URL } from '../../App';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const ManagerEdit = (props: any) => {
    const { permissions } = usePermissions();
    
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [ id, setId ] = React.useState(Number(props.match.params.id));
    
    const hasPerm = hasPermissions(permissions, [{ resource: 'user', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    const transform = (data:any) => {
        let requestBody = {
            ...data
        }
        delete requestBody.avatar;

        return requestBody;
    };

    ///////////////////    avatar     ///////////////////

    ///////////////////    avatar     ///////////////////

    const onRemoveAvatar = () => {
        setLoading(true);
        dispatch(fetchStart());
        
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/users/${id}/avatar`, 
            { 
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('user_image_deleted');
            })
            .catch((e) => {
                notify('user_image_not_deleted', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
    }

    const onDropAvatar = (file:any) => {

        setLoading(true);
        dispatch(fetchStart());
        
        const token = localStorage.getItem('token');
        const formData  = new FormData();
        formData.append('file', file[0]);

        fetch(`${API_URL}/users/${id}/avatar`, 
            { 
                method: 'POST', 
                body: formData,
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('user_image_updated');
            })
            .catch((e) => {
                notify('user_image_not_uploaded', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
    }

    const PreviewImage = (record:any) => {
        if (typeof record.record === 'string') {
            return <img width={150} src={`${API_URL}/public/users/${record.record}`} alt="Avatar" />
        } else {
            return <img width={150} src={`${record.record.undefined}`} alt="Avatar" />
        }
    };

    ////////////////////////////////////////////////////////////

    return <Edit title="ویرایش کاربر" transform={transform} undoable={false} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="username" />
            <ImageInput 
                source="avatar" 
                label="تصویر کاربر" 
                accept="image/*" 
                maxSize="2000000" 
                multiple={false}
                options={{ onRemove:onRemoveAvatar, onDrop:onDropAvatar }}
            >
                <PreviewImage /> 
            </ImageInput>
            <TextInput source="email" />
            <SelectInput source="status" choices={[
                { id: 'active', name: 'فعال' },
                { id: 'inactive', name: 'غیرفعال' },
            ]} />
            <ReferenceArrayInput
                label="نقش"
                source="roles"
                reference="roles"
                filterToQuery={(searchText:string) => (searchText ? { name: searchText } : null)}>
                    <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
}

export default ManagerEdit;
