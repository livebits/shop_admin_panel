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
                <Typography variant="h6">
                    ثبت آدرس جدید
                </Typography>
                <IconButton onClick={onCancel}>
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
                <TextInput source="name" label="نام آدرس" validate={required()} />
                <TextInput source="address" label="آدرس" multiline fullWidth validate={required()}/>
                <TextInput source="mobile" label="موبایل" validate={required()}/>
                <TextInput source="phone" label="تلفن" />
                <TextInput source="city" label="شهر" validate={required()}/>
                <TextInput source="state" label="استان" validate={required()} />
                <TextInput source="zip" label="کدپستی" validate={required()} />
            </SimpleForm>
        </div>
    );
};

export default AddAddress;
