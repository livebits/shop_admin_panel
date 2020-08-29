import * as React from 'react';
import { FC } from 'react';
import {
    useEditController,
    useCreateController,
    useTranslate,
    TextInput,
    SimpleForm,
    required,
    DateField,
} from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { EditComponentProps } from '../../types';
import AddAddressToolbar from './AddAddressToolbar';
import { useDispatch } from 'react-redux';
import { useNotify, useRedirect, fetchStart, fetchEnd, Button } from 'react-admin';
import { API_URL } from '../../App';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 40,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#eeeeee',
        padding: 5,
        paddingLeft: 20,
        marginTop: 10,
    },
    form: {
        [theme.breakpoints.up('xs')]: {
            width: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
}));

const EditAddress = ({ onCancel, onRefresh, data, ...props }: { [prop: string]: any; }) => {
    const classes = useStyles();
    const translate = useTranslate();
    const dispatch = useDispatch();
    const redirect = useRedirect();
    const notify = useNotify();
    const [loading, setLoading] = React.useState(false);

    const onSave = async (data:any) => {
        
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator 
        const updatedRecord = { ...data };
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/users/${data.userId}/user-addresses/${data.id}`, 
            { 
                method: 'PATCH', 
                body: JSON.stringify(updatedRecord),
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } 
            })
            .then(() => {
                notify('user_address_updated');
            })
            .catch((e) => {
                notify('Error: comment not approved', 'warning')
            })
            .finally(() => {
                setLoading(false);
                dispatch(fetchEnd()); // stop the global loading indicator
                onRefresh();
                onCancel();
            });
    }
    
    return (
        <form className={classes.root}>
            <div className={classes.title}>
                <ContactMailRoundedIcon />
                <Typography variant="h6">
                    {
                        translate('resources.customers.page.editAddress')
                    }
                </Typography>
                <IconButton onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </div>
            <SimpleForm
                className={classes.form}
                basePath='user-addresses'
                record={data}
                save={(e:any) => onSave(e)}
                redirect={`/customers/${props.match.params.id}`}
                resource="user-addresses"
                initialValues={{ userId: props.match.params.id }}
                toolbar={<AddAddressToolbar />}
            >
                <TextInput source="name" validate={required()} />
                <TextInput source="address" multiline fullWidth validate={required()}/>
                <TextInput source="mobile" validate={required()}/>
                <TextInput source="phone" />
                <TextInput source="city" validate={required()}/>
                <TextInput source="state" validate={required()} />
                <TextInput source="pelak" />
                <TextInput source="unit" />
                <TextInput source="zip" validate={required()} />
                <TextInput source="receiver" />
            </SimpleForm>
        </form>
    );
};

export default EditAddress;
