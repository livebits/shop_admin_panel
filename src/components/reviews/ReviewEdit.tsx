import * as React from 'react';
import { FC } from 'react';
import {
    useEditController,
    useTranslate,
    TextInput,
    SimpleForm,
    FunctionField,
    DateField,
} from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from './CustomerReferenceField';
import StarRatingField from './StarRatingField';
import ReviewEditToolbar from './ReviewEditToolbar';
import { EditComponentProps } from '../../types';
import FullNameField from './FullNameField';
import ProductNameField from './ProductNameField';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 40,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
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
}

const ReviewEdit: FC<Props> = ({ onCancel, ...props }) => {
    const classes = useStyles();
    const controllerProps = useEditController(props);
    const translate = useTranslate();
    if (!controllerProps.record) {
        return null;
    }
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h6">
                    {translate('resources.comments.detail')}
                </Typography>
                <IconButton onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </div>
            <SimpleForm
                className={classes.form}
                basePath={controllerProps.basePath}
                record={controllerProps.record}
                save={controllerProps.save}
                version={controllerProps.version}
                redirect="list"
                resource="comments"
                toolbar={<ReviewEditToolbar />}
            >
                <FunctionField
                    source="customer"
                    render={(record:any) => <FullNameField record={record.customer.user} />}
                />

                <FunctionField
                    source="product"
                    render={(record:any) => <ProductNameField record={record.product} />}
                />
                <DateField source="createdAt" formClassName={classes.inlineField} />
                <StarRatingField formClassName={classes.inlineField} />
                <TextInput source="comment" rowsMax={15} multiline fullWidth />
            </SimpleForm>
        </div>
    );
};

export default ReviewEdit;
