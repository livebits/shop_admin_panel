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
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 40,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#373e48',
        color: '#eee',
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

const AddAddress: FC<Props> = ({ onCancel, onRefresh, ...props }) => {
    const classes = useStyles();
    props.resource = 'user-addresses';
    // props.basePath = '/user-addresses';
    const controllerProps = useCreateController(props);
    const translate = useTranslate();
    if (!controllerProps.record) {
        return null;
    }
    
    const onSave = async (e:any) => {
        await controllerProps.save(e, `/customers/${props.match.params.id}/1`);
        onRefresh();
        onCancel();
    }
    
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <ContactMailRoundedIcon style={{ color: '#eee' }} />
                <Typography variant="h6" >
                    {
                        translate('resources.customers.page.addAddress')
                    }
                </Typography>
                <IconButton onClick={onCancel}  style={{ color: '#eee' }}>
                    <CloseIcon />
                </IconButton>
            </div>
            <SimpleForm
                className={classes.form}
                basePath='user-addresses'
                record={controllerProps.record}
                save={(e:any) => onSave(e)}
                version={controllerProps.version}
                redirect={`/customers/${props.match.params.id}`}
                resource="user-addresses"
                initialValues={{ userId: props.match.params.id }}
                // toolbar={<AddAddressToolbar />}
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
        </div>
    );
};

export default AddAddress;
