import * as React from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-final-form';
import {
    ReferenceInput,
    SelectInput,
    FormDataConsumer,
    BooleanInput,
    DateInput,
    SimpleFormIterator,
    useTranslate,
    TextInput,
} from 'react-admin';
import { Query, Loading, LinearProgress, Error } from 'react-admin';
import { CustomDateInput } from '../commons/CustomDatePicker';

export const ProductCategoryFields = ({ formData, ...rest }: { formData: any }) => {    
    const form = useForm();
    const translate = useTranslate();
    const payload = {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'priority', order: 'ASC' },
        filter: {},
        categoryId: formData.categoryId,
    };

    const generateOptions = (options:string) => {
        let itemOptions: { id: string; name: string; }[] = []
        options.split("\n").forEach(item => {
            itemOptions.push({
                id: item, name: item
            })
        });

        return itemOptions
    }

    const generateCategoryFields = (data: any) => {
        return data.map((item: any, index: number) => {
            switch (item.dataType) {
                case 'date':
                    return <div>
                        <CustomDateInput 
                            style={{width: 256}} 
                            key={index} 
                            source={'cf_' + item.id + "_" + item.categoryId} 
                            label={item.name} 
                            placeholder={item.defaultValue}
                        />
                    </div>
                case 'boolean':
                    return <div>
                        <SelectInput 
                            style={{width: 256}}
                            key={index}
                            source={'cf_' + item.id + "_" + item.categoryId}
                            label={item.name}
                            placeholder={item.defaultValue}
                            choices={[
                                { id: '1', name: translate('pos.booleanValues.true') },
                                { id: '0', name: translate('pos.booleanValues.false') },
                            ]} 
                        />
                    </div>
                case 'option':
                    return <div>
                        <SelectInput 
                            style={{width: 256}}
                            key={index}
                            source={'cf_' + item.id + "_" + item.categoryId}
                            label={item.name}
                            placeholder={item.defaultValue}
                            choices={generateOptions(item.options)}
                        />
                    </div>
            
                default:
                    return <div>
                        <TextInput 
                            style={{width: 256}} 
                            key={index} 
                            source={'cf_' + item.id + "_" + item.categoryId} 
                            label={item.name} 
                            placeholder={item.defaultValue}
                        />
                    </div>
            }
        })
    }

    return (
        <Fragment>
            <ReferenceInput
                source="categoryId"
                reference="categories"
                {...rest}
            >
                <SelectInput source="name" />
            </ReferenceInput>
            <FormDataConsumer>
                {
                    ({ formData, ...rest }: { formData: any }) =>  {
                        if (formData.categoryId) {
                            
                            return <Query type='getList' resource='category-fields' payload={payload}>
                                {({ data, loading, error }: { data:[any], loading: boolean, error: any }) => {
                                    
                                    if (loading) { return <LinearProgress />; }
                                    if (error) { return <Error />; }
                                    return <Fragment>
                                        {
                                            generateCategoryFields(data)
                                        }
                                    </Fragment>
                                }}
                            </Query>
                        }
                        return null;
                    }
                }
            </FormDataConsumer>
        </Fragment>
    );
};