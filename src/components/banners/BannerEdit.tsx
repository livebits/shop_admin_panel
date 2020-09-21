import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    Edit,
    required,
    NumberInput,
    ImageInput,
    SimpleForm,
    TextInput,
    usePermissions,
} from 'react-admin';
import { useNotify, useRefresh, useRedirect, fetchStart, fetchEnd } from 'react-admin';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../App';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';
const BannerEdit = (props: any) => {
    const { permissions } = usePermissions();
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [ id, setId ] = React.useState(Number(props.match.params.id));
    
    const hasPerm = hasPermissions(permissions, [{ resource: 'banner', action: 'update' }])
    if (!hasPerm) {
        return <ACLError />
    }

    const transform = (data:any) => {
        let requestBody = {
            ...data
        }
        delete requestBody.createdAt;
        delete requestBody.tenantId;
        delete requestBody.filename;

        return requestBody;
    };

    ///////////////////    avatar     ///////////////////

    const onRemoveAvatar = () => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator 
        
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/banners/${id}/image`, 
            { 
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('notification.banner_image_deleted');
            })
            .catch((e) => {
                notify('notification.banner_image_not_deleted', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
    }

    const onDropAvatar = (file:any) => {

        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator 
        
        const token = localStorage.getItem('token');
        const formData  = new FormData();
        formData.append('file', file[0]);

        fetch(`${API_URL}/banners/${id}/image`, 
            { 
                method: 'POST', 
                body: formData,
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('notification.banner_image_updated');
            })
            .catch((e) => {
                notify('notification.banner_image_not_uploaded', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
    }

    const PreviewImage = (record:any) => {
        if (typeof record.record === 'string') {
            return <img width={150} src={`${API_URL}/public/banners/${record.record}`} alt="Avatar" />
        } else {
            return <img width={150} src={`${record.record.undefined}`} alt="Avatar" />
        }
    };

    ////////////////////////////////////////////////////////////

    return <Edit {...props} transform={transform}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="link" validate={required()}  />
            <NumberInput source="priority" />
            <TextInput source="description" fullWidth />
            <ImageInput 
                source="filename"
                accept="image/*" 
                maxSize={5000000} 
                multiple={false}
                options={{ onRemove:onRemoveAvatar, onDrop:onDropAvatar }}
            >
                <PreviewImage /> 
            </ImageInput>
        </SimpleForm>
    </Edit>
}

export default BannerEdit;
