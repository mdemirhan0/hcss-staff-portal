import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { resetObservationForm } from '../../redux/observation-form/observation-form.actions';
import { selectObservationForm } from '../../redux/observation-form/observation-form.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCurrentYear } from '../../redux/school-year/school-year.selectors';
import ObservationPage from '../../components/observation-form/observation-form.component';
import withAuthorization from '../../components/with-authorization/withAuthorization.component';

const NewObservationPage = (props) => {
    const { resetObservationForm, currentUser, currentYear, observationForm, ...otherProps } = props;
    useEffect(() => {
        resetObservationForm({
            observer: currentUser,
            schoolYear: currentYear,
        });
    },[]);

    return (
        <>
            <ObservationPage 
                observationForm={observationForm}
                currentUser={currentUser}
                currentYear={currentYear}
                resetObservationForm={resetObservationForm}
                {...otherProps}
            />
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentYear: selectCurrentYear,
    observationForm: selectObservationForm
});

const mapDispatchToProps = (dispatch) => ({
    resetObservationForm: (details) => dispatch(resetObservationForm(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(['superadmin', 'admin', 'dci'])(NewObservationPage));