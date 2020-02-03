import React, {useCallback, useEffect, useState} from 'react';
import {
    AutocompleteInput,
    Create,
    Error,
    FormDataConsumer,
    NumberInput,
    ReferenceInput,
    required,
    SaveButton,
    SelectInput,
    SimpleForm,
    TextInput,
    Toolbar,
    useCreate,
    useDataProvider,
    useNotify,
    useRedirect
} from 'react-admin';
import {useFormState} from 'react-final-form';

import {getFullNameOfUser} from '../users/UserInterface';


// Custom User auto completion which displays the full name of the user with the "getFullNameOfUser" method.
// Furthermore, only users which are active and verified are being displayed.
const UserAutoComplete = () => {

    const dataProvider = useDataProvider();
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        dataProvider.getList('users', {
            filter: {is_verified: true, active: true}
        })
            .then(({data}) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    if (error) return <Error/>;

    return (
        <AutocompleteInput source="user_id" choices={users} validate={required()} optionText={user => getFullNameOfUser(user)}/>
    )
};

// These are the choices for the comment select input. A standalone comment can be sent to the API without any
// changes. However, a non-standalone comment triggers the "ConditionalCommentField" and the administrator
// has to provide a custom comment.
const commentSelectChoices = [
    {
        text: 'Cash deposit',
        standalone: true
    },
    {
        text: 'Deposit to bank account',
        standalone: true
    },
    {
        text: 'Other',
        standalone: false
    },
];


// This component returns a text input field for the comment whenever the selected comment can't stand alone, e.g.
// "Other".
const ConditionalCommentField = ({formData, ...rest}) => {
    let showField = false;
    if (formData && formData.comment) {
        let item = commentSelectChoices.filter(item => item.text === formData.comment);
        if (item.length === 1 && item[0].hasOwnProperty('standalone') && !item[0].standalone) {
            showField = true;
        }
    }
    return (
        showField ? <TextInput validate={required()} source="custom_comment"/> : null
    )
};

// Custom save button which alters the deposit payload.
// We need this because of the custom comment field
const SaveWithAlteringFormButton = ({...props}) => {
    const [create] = useCreate('deposits');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const {basePath, redirect} = props;

    const formState = useFormState();

    const handleClick = useCallback(() => {
        if (!formState.valid) {
            return;
        }

        // Get the deposit form data
        let payload = formState.values;

        // If there is a custom comment, we need to replace the actual comment with it
        if (payload.hasOwnProperty('custom_comment')) {
            payload['comment'] = payload['custom_comment'];
            delete payload['custom_comment'];
        }

        // Create deposit
        create(
            {
                payload: {data: payload},
            },
            {
                onSuccess: ({data: newRecord}) => {
                    notify('ra.notification.created', 'info', {
                        smart_count: 1,
                    });
                    redirectTo(redirect, basePath, newRecord.id, newRecord);
                },
            }
        );
    }, [
        formState.valid,
        formState.values,
        create,
        notify,
        redirectTo,
        redirect,
        basePath,
    ]);

    return <SaveButton {...props} handleSubmitWithRedirect={handleClick}/>;
};

// This custom toolbar uses the "SaveWithAlteringFormButton" instead of the default "SaveButton"
// We need to do this because of the custom comment field. Whenever a comment is selected, which cant stand alone,
// e.g. "Other", the administrator has to enter a custom comment. The form comment "Other" has to be replaced with
// this custom value.
const DepositCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveWithAlteringFormButton
            handleSubmitWithRedirect
            label="ra.action.save"
            redirect="show"
            submitOnEnter={true}
        />
    </Toolbar>
);

// Definition of the create deposit view
export const DepositCreate = (props) => (
    <Create {...props}>
        <SimpleForm toolbar={<DepositCreateToolbar/>}>
            <ReferenceInput label="User" source="user_id" reference="users">
                <UserAutoComplete/>
            </ReferenceInput>
            <SelectInput resettable translateChoice={false} source="comment" optionText="text" optionValue="text"
                         choices={commentSelectChoices} validate={required()}/>
            <FormDataConsumer>
                {({formData, ...rest}) => <ConditionalCommentField formData={formData} {...rest}/>}
            </FormDataConsumer>
            <NumberInput source="amount" label="Amount in cents" validate={required()}/>
        </SimpleForm>
    </Create>
);
