import * as React from 'react';
import { FC } from 'react';
import {
    ReferenceInput,
    Edit,
    BooleanInput,
    NumberInput,
    SelectInput,
    SimpleForm,
    TextInput,
    ImageInput,
    ArrayInput,
    usePermissions,
    SimpleFormIterator,
} from 'react-admin';
import { useNotify, useRefresh, useRedirect, fetchStart, fetchEnd } from 'react-admin';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../App';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const CategoryEdit = (props: any) => {

    const { permissions } = usePermissions();
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [ id, setId ] = React.useState(Number(props.match.params.id));

    const hasPerm = hasPermissions(permissions, [{ resource: 'category', action: 'update' }])
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

    const onRemoveAvatar = () => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator 
        
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/categories/${id}/avatar`, 
            { 
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('cat_image_deleted');
            })
            .catch((e) => {
                notify('cat_image_not_deleted', 'warning')
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

        fetch(`${API_URL}/categories/${id}/avatar`, 
            { 
                method: 'POST', 
                body: formData,
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then(() => {
                notify('cat_image_updated');
            })
            .catch((e) => {
                notify('cat_image_not_uploaded', 'warning')
            })

        setLoading(false);
        dispatch(fetchEnd());
    }

    const PreviewImage = (record:any) => {
        if (typeof record.record === 'string') {
            return <img width={150} src={`${API_URL}/public/categories/${record.record}`} alt="Avatar" />
        } else {
            return <img width={150} src={`${record.record.undefined}`} alt="Avatar" />
        }
    };

    ////////////////////////////////////////////////////////////

    return <Edit transform={transform} undoable={false} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="description" fullWidth />
            <ReferenceInput source="parentId" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ImageInput 
                source="avatar"
                accept="image/*" 
                maxSize={2000000} 
                multiple={false}
                options={{ onRemove:onRemoveAvatar, onDrop:onDropAvatar }}
            >
                <PreviewImage /> 
            </ImageInput>
            <ArrayInput 
                source="categoryFields"
                sort={{ field: 'priority', order: 'ASC' }}
            >
                <SimpleFormIterator>
                <TextInput source="name"/>
                    <NumberInput source="priority"/>
                    <TextInput source="hint" fullWidth/>
                    {/* <SelectInput source="dataType" choices={[
                        { id: 'number', name: 'pos.dataType.number' },
                        { id: 'string', name: 'pos.dataType.string' },
                        { id: 'text', name: 'pos.dataType.text' },
                        { id: 'date', name: 'pos.dataType.date' },
                        { id: 'option', name: 'pos.dataType.option' },
                    ]} />
                    <TextInput source="defaultValue"/> */}
                    <BooleanInput source="isRequired"/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
};

export default CategoryEdit;
