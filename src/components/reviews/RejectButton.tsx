import * as React from 'react';
import { FC } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { useTranslate, useUpdate, useNotify, useRedirect } from 'react-admin';
import { Review } from '../../types';

/**
 * This custom button demonstrate using a custom action to update data
 */
const RejectButton: FC<{ record: Review }> = ({ record }) => {
    const translate = useTranslate();
    const notify = useNotify();
    const redirectTo = useRedirect();

    const [reject, { loading }] = useUpdate(
        'product-comments',
        record.id,
        { status: 'rejected' },
        record,
        {
            undoable: true,
            onSuccess: () => {
                notify(
                    'resources.product-comments.notification.rejected_success',
                    'info',
                    {},
                    true
                );
                redirectTo('/product-comments');
            },
            onFailure: () => {
                notify(
                    'resources.product-comments.notification.rejected_error',
                    'warning'
                );
            },
        }
    );

    return record && record.status === 'pending' ? (
        <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={reject}
            disabled={loading}
        >
            <ThumbDown
                color="primary"
                style={{ paddingRight: '0.5em', color: 'red' }}
            />
            {translate('resources.product-comments.action.reject')}
        </Button>
    ) : (
        <span />
    );
};

RejectButton.propTypes = {
    record: PropTypes.any,
};

export default RejectButton;
