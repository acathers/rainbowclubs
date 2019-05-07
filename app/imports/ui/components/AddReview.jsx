import React from 'react';
import { Reviews, ReviewSchema } from '/imports/api/review/review';
import { Segment, Rating, Grid} from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class AddReview extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add Review failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add Review succeeded' });
      this.formRef.reset();
    }
  }

  state = {};

  handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating });

  /** On submit, insert the data. */
  submit(data) {
    const ReviewObject = {
      club: this.props.club,
      rating: this.state.rating,
      description: (data.description === undefined ? '' : data.description.trim()),
      owner: this.props.owner,
      createdAt: new Date(),
    };
    Reviews.insert(ReviewObject, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Segment>
          <Grid textAlign='center'>
            <Grid.Row/>
            {<Rating icon='star' size='massive' maxRating={5} onRate={this.handleRate}/>}
            <Grid.Row/>
          </Grid>
          <AutoForm ref={(ref) => {
            this.formRef = ref;
          }} schema={ReviewSchema} onSubmit={this.submit}>
            <LongTextField placeholder='Comments' label='Comments (Optional)' name={'description'}/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='rating' value={3}/>
            <HiddenField name='club' value='fakeclubid'/>
            <HiddenField name='owner' value='fakeuser@foo.com'/>
            <HiddenField name='reviewed' value={false}/>
            <HiddenField name='visible' value={false}/>
            <HiddenField name='flagged' value={false}/>
            <HiddenField name='createdAt' value={new Date()}/>
          </AutoForm>
        </Segment>
    );
  }
}

AddReview.propTypes = {
  club: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default AddReview;
