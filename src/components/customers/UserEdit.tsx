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
    useTranslate,
    ReferenceManyField,
    DeleteButton,
    TextField,
    FunctionField,
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

const useStyles = makeStyles((theme:any) => ({
    listWithDrawer: {
        marginRight: 400,
    },
    drawerPaper: {
        zIndex: 100,
    },
}));

const UserEdit = (props: any) => {

    const [drawer, setDrawer] = React.useState(false)
    const [editDrawer, setEditDrawer] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState(null)
    const [selectedAddress, setSelectedAddress] = React.useState(null)
    const refresh = useRefresh();
    const classes = useStyles();

    const dispatch = useDispatch();
    const notify = useNotify();
    const [loading, setLoading] = React.useState(false);

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
    
    return <Edit title="ویرایش مشتری" {...props}>
        <TabbedForm>
            <FormTab label="مشخصات عمومی" >
                <TextInput disabled source="id" />
                <TextInput source="firstName" />
                <TextInput source="lastName" />
                <TextInput source="username" />
                <TextInput source="email" />
                <SelectInput source="status" choices={[
                    { id: 'active', name: 'فعال' },
                    { id: 'inactive', name: 'غیرفعال' },
                ]} />
            </FormTab>
            <FormTab label=" آدرس های کاربر">
                <Button 
                    color="primary"
                    onClick={e => setDrawer(true)}
                    style={{width: 150}}
                >
                    <AddCircleIcon />
                    افزودن آدرس جدید
                </Button>
                <ReferenceManyField 
                    label="آدرس های ثبت شده"
                    reference="user-addresses"
                    target="userId"
                    filter={{userId: props.match.params.id}}
                    perPage={100}
                >
                    <Datagrid>
                        <TextField source="id" label="کد" />
                        <TextField source="name" label="نام آدرس" />
                        <TextField source="address" label="آدرس" />
                        <TextField source="mobile" label="موبایل" />
                        <TextField source="phone" label="تلفن" />
                        <TextField source="city" label="شهر" />
                        <TextField source="state" label="استان" />
                        <TextField source="zip" label="کدپستی" />
                        <FunctionField render={(record: any) => 
                            <div>
                                <Button
                                    color="primary"
                                    onClick={e => onEditAddress(record)}
                                >
                                    <EditIcon />
                                    ویرایش
                                </Button>
                                <Button
                                    style={{color: 'red'}}
                                    onClick={e => onDeleteAddress(record)}
                                >
                                    <DeleteIcon />
                                    حذف
                                </Button>
                            </div>
                        } />

                        {/* <EditButton />
                        <DeleteButton /> */}
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
