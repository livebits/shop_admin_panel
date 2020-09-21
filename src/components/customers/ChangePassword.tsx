import * as React from 'react';
import { FC } from 'react';
import {
    fetchStart,
    fetchEnd,
    useCreateController,
    useTranslate,
    useNotify,
    SimpleForm,
    required,
    PasswordInput,
} from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { EditComponentProps } from '../../types';
import AddAddressToolbar from './AddAddressToolbar';
import { API_URL } from '../../App';
import { useDispatch } from 'react-redux';

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

interface Props extends EditComponentProps {
    onCancel: () => void;
    onRefresh: () => void;
}

const ChangePassword: FC<Props> = ({ onCancel, onRefresh, ...props }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const notify = useNotify();
    props.resource = 'users';
    // props.basePath = '/user-addresses';
    const controllerProps = useCreateController(props);
    const translate = useTranslate();
    if (!controllerProps.record) {
        return null;
    }
    
    const onSave = async (e:any) => {
        // await controllerProps.save(e, `/customers/${props.match.params.id}/change-password`);

        dispatch(fetchStart()); // start the global loading indicator 
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/users/${props.match.params.id}/change-password`,
            { 
                method: 'PATCH', 
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newPassword: e.newPassword
                })
            })
        .then(() => {
            notify('notification.user_password_changed');
        })
        .catch((e) => {
            notify('notification.user_password_not_changed', 'warning')
        })
        .finally(() => {
            dispatch(fetchEnd()); // stop the global loading indicator
            onRefresh();
            onCancel();
        });
    }
    
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h6">
                    {
                        translate('resources.customers.page.changePassword')
                    }
                </Typography>
                <IconButton onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </div>
            <SimpleForm
                className={classes.form}
                basePath='customers'
                record={controllerProps.record}
                save={(e:any) => onSave(e)}
                version={controllerProps.version}
                redirect={`/customers/${props.match.params.id}`}
                resource="customers"
            >
                <PasswordInput source="newPassword" validate={required()}/>
            </SimpleForm>
        </div>
    );
};

export default ChangePassword;
