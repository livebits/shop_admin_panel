import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    FormTab,
    SelectInput,
    TabbedForm,
    TextInput,
    usePermissions,
    ReferenceManyField,
    ImageInput,
    TextField,
    FunctionField,
    useTranslate,
    useRefresh,
} from 'react-admin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { Drawer, useMediaQuery, Theme } from '@material-ui/core';
import AddAddress from './AddAddress';
import EditAddress from './EditAddress';
import { useDispatch } from 'react-redux';
import { useNotify, useRedirect, fetchStart, fetchEnd } from 'react-admin';
import { API_URL } from '../../App';
import { hasPermissions } from '../../authProvider';
import ACLError from '../../layout/ACLError';

const useStyles = makeStyles((theme:any) => ({
    listWithDrawer: {
        marginRight: 400,
    },
    drawerPaper: {
        zIndex: 100,
    },
}));

const UserEdit = (props: any) => {
    const translate = useTranslate();
    const { permissions } = usePermissions();
    const [drawer, setDrawer] = React.useState(false)
    const [editDrawer, setEditDrawer] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState(null)
    const [selectedAddress, setSelectedAddress] = React.useState(null)
    const refresh = useRefresh();
    const classes = useStyles();

    const dispatch = useDispatch();
    const notify = useNotify();
    const [loading, setLoading] = React.useState(false);

    const redirect = useRedirect();
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

    const onEditAddress = (record:any) => {
        setSelectedAddress(record);
        setEditDrawer(true)
    }

    const onDeleteAddress = (data:any) => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator 
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/users/${data.userId}/user-addresses/${data.id}`, 
            { 
                method: 'DELETE', 
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } 
            })
            .then(() => {
                notify('user_address_deleted');
            })
            .catch((e) => {
                notify('Error: comment not approved', 'warning')
            })
            .finally(() => {
                setLoading(false);
                dispatch(fetchEnd()); // stop the global loading indicator
                refresh();
            });
    }
    
    return <Edit transform={transform} undoable={false} {...props}>
        <TabbedForm>
            <FormTab label="resources.customers.tabs.publicInfo" >
                <TextInput disabled source="id" />
                <TextInput source="firstName" />
                <TextInput source="lastName" />
                <ImageInput 
                    source="avatar" 
                    accept="image/*" 
                    maxSize="2000000" 
                    multiple={false}
                    options={{ onRemove:onRemoveAvatar, onDrop:onDropAvatar }}
                >
                    <PreviewImage /> 
                </ImageInput>
                <TextInput source="username" />
                <TextInput source="email" />
                <SelectInput source="status" choices={[
                    { id: 'active', name: 'pos.status.active' },
                    { id: 'inactive', name: 'pos.status.inactive' },
                ]} />
            </FormTab>
            <FormTab label="resources.customers.tabs.addresses">
                <Button 
                    color="primary"
                    onClick={e => setDrawer(true)}
                    style={{width: 150}}
                >
                    <AddCircleIcon />
                    {
                        translate('resources.customers.page.addAddress')
                    }
                </Button>
                <ReferenceManyField 
                    label="resources.customers.page.savedAddresses"
                    reference="user-addresses"
                    target="userId"
                    filter={{userId: props.match.params.id}}
                    perPage={100}
                >
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <TextField source="address" />
                        <TextField source="mobile" />
                        <TextField source="phone"/>
                        <TextField source="city" />
                        <TextField source="state" />
                        <TextField source="zip" />
                        <FunctionField render={(record: any) => 
                            <div>
                                <Button
                                    color="primary"
                                    onClick={e => onEditAddress(record)}
                                >
                                    <EditIcon />
                                    {
                                        translate('ra.action.edit')
                                    }
                                </Button>
                                <Button
                                    style={{color: 'red'}}
                                    onClick={e => onDeleteAddress(record)}
                                >
                                    <DeleteIcon />
                                    {
                                        translate('ra.action.remove')
                                    }
                                </Button>
                            </div>
                        } />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
            <Drawer
                variant="persistent"
                open={drawer}
                anchor="right"
                onClose={e => setDrawer(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {
                    <AddAddress
                        onCancel={(e:any) => setDrawer(false)}
                        onRefresh={(e:any) => refresh()}
                        {...props}
                    />
                }
            </Drawer>
            <Drawer
                variant="persistent"
                open={editDrawer}
                anchor="right"
                onClose={e => setEditDrawer(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {
                    editDrawer &&
                    <EditAddress
                        data={selectedAddress}
                        onCancel={(e:any) => setEditDrawer(false)}
                        onRefresh={(e:any) => refresh()}
                        {...props}
                    />
                }
            </Drawer>
        </TabbedForm>
    </Edit>
};

export default UserEdit;
