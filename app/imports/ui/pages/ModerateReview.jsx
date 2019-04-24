import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Reviews, ReviewSchema } from '/imports/api/review/review';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import LongTextField from 'uniforms-semantic/LongTextField';
import BoolField from 'uniforms-semantic/BoolField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class ModerateReview extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { description, flagged, reviewed, visible, _id } = data;
    Reviews.update(_id, { $set: { description, flagged, reviewed, visible } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Moderate Review</Header>
            <AutoForm schema={ReviewSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <HiddenField name='club'/>
                <HiddenField name='rating'/>
                <LongTextField name='description'/>
                <BoolField name='flagged'/>
                <BoolField name='reviewed'/>
                <BoolField name='visible'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Review document in the props object. Uniforms adds 'model' to the props, which we use. */
ModerateReview.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Review documents.
  const subscription = Meteor.subscribe('Reviews');
  return {
    doc: Reviews.findOne(documentId),
    ready: subscription.ready(),
  };
})(ModerateReview);

