import * as React from 'react';
import { FC } from 'react';
import {
    required,
    Edit,
    useTranslate,
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
import { Button, Drawer, makeStyles } from '@material-ui/core';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import ChangePassword from '../customers/ChangePassword';

const useStyles = makeStyles((theme:any) => ({
    listWithDrawer: {
        marginRight: 400,
    },
    drawerPaper: {
        zIndex: 100,
    },
}));

const ManagerEdit = (props: any) => {
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const [passwordDrawer, setPasswordDrawer] = React.useState(false)
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [ id, setId ] = React.useState(Number(props.match.params.id));
    const classes = useStyles();
    
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
                notify('notification.user_image_deleted');
            })
            .catch((e) => {
                notify('notification.user_image_not_deleted', 'warning')
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
                notify('notification.user_image_updated');
            })
            .catch((e) => {
                notify('notification.user_image_not_updated', 'warning')
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

    return <Edit transform={transform} undoable={false} {...props}>
        <SimpleForm>
            <Button 
                color="primary"
                onClick={e => setPasswordDrawer(true)}
                style={{width: 150, float: 'left'}}
            >
                <LockRoundedIcon />
                {
                    translate('resources.customers.page.changePassword')
                }
            </Button>
            <TextInput disabled source="id" />
            <TextInput source="firstName" validate={required()} />
            <TextInput source="lastName" />
            <TextInput source="username" validate={required()} />
            <ImageInput 
                source="avatar"
                accept="image/*" 
                maxSize="2000000" 
                multiple={false}
                options={{ onRemove:onRemoveAvatar, onDrop:onDropAvatar }}
            >
                <PreviewImage /> 
            </ImageInput>
            <TextInput source="email" />
            <SelectInput source="status" validate={required()} choices={[
                { id: 'active', name: 'pos.status.active' },
                { id: 'inactive', name: 'pos.status.inactive' },
            ]} />
            <ReferenceArrayInput
                source="roles"
                reference="roles"
                filterToQuery={(searchText:string) => (searchText ? { name: searchText } : null)}>
                    <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
            
            <Drawer
                variant="persistent"
                open={passwordDrawer}
                anchor="right"
                onClose={e => setPasswordDrawer(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {
                    <ChangePassword
                        onCancel={(e:any) => setPasswordDrawer(false)}
                        onRefresh={(e:any) => refresh()}
                        {...props}
                    />
                }
            </Drawer>
        </SimpleForm>
    </Edit>
}

export default ManagerEdit;
