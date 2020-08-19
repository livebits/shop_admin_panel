import * as React from 'react';
import { useCallback } from 'react';
import {
    SaveButton,
    Toolbar,
    useUpdate,
    useEdit,
    useRedirect,
    useNotify,
} from 'react-admin';

export const SaveAndUploadButton = (props:any) => {
    console.log('PROPS: ', props);
    
    const [update] = useUpdate('products');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const { basePath, record } = props;

    //transform data
    let catFields:any[] = []
    Object.keys(record).forEach(element => {
        if (element.includes("cf_")) {
            let catFieldId = Number(element.split('_')[1]);
            let productCatField = record.productCategoryFields.filter((pcf: any) => pcf.categoryFieldId === catFieldId)[0]
            
            catFields.push({
                categoryFieldId: catFieldId,
                id: productCatField.id,
                value: record[element],
            })
        }
    });

    let requestBody = {
        ...record,
        prosAndCons: {
            pros: record.pros.map((val:any) => val.value),
            cons: record.cons.map((val:any) => val.value)
        },
        productCategoryFields: catFields,
    }
    delete requestBody.pros;
    delete requestBody.cons;
    delete requestBody.brand;
    delete requestBody.category;

    let thumbnail = requestBody.thumbnail
    delete requestBody.thumbnail;

    console.log('thumb:', thumbnail);
    

    const [save, { loading }] = useUpdate(
        'products',
        record.id,
        { ...requestBody },
        record,
        {
            undoable: false,
            onSuccess: () => {
                notify(
                    'resources.reviews.notification.approved_success',
                    'info',
                    {},
                    true
                );
                // redirectTo('/products');
            },
            onFailure: () => {
                notify(
                    'resources.reviews.notification.approved_error',
                    'warning'
                );
            },
        }
    );

    // const handleSave = useCallback(
    //     (values, redirect) => {
    //         update(
    //             'products',
    //             record.id,
    //             { ...values },
    //             record,
    //             {
    //                 onSuccess: ({ data: newRecord }: { data:any }) => {
    //                     notify('ra.notification.created', 'info', {
    //                         smart_count: 1,
    //                     });
    //                     redirectTo(redirect, basePath, newRecord.id, newRecord);
    //                 },
    //             }
    //         );
    //     },
    //     [update, notify, redirectTo, basePath]
    // );

    return <SaveButton {...props} onSave={save} />;
};