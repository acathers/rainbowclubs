import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Divider, Feed, Grid, Header, Label, Loader, Segment } from 'semantic-ui-react';
import { Clubs, ClubSchema } from '/imports/api/club/club';
import { Reviews } from '/imports/api/review/review';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AddReview from '/imports/ui/components/AddReview';
import ClubReview from '../components/ClubReview';

/** Renders the Page for editing a single document. */
class ClubPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready1 && this.props.ready2) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const allTypes = this.props.doc.types.map((data, index) => (
          <Label key={index}>{data}</Label>
    ));

    const revs = this.props.reviews.filter(review => (review.club === this.props.doc.name));

    const displayReviews = <Feed>
      <div>
      {revs.map((review, index) => <Segment key={index}>
              <ClubReview review={review}/>
            </Segment>)}
      </div>
    </Feed>;

    const UHGreenButton = 'UHGreenBackground UHGreenBackgroundHover UHWhiteTextColor';

    return (
        <Container schema={ClubSchema} model={this.props.doc}>
          <Header className={'Sign'} as="h2" textAlign="center">{this.props.doc.name}</Header>
          <div>
            <Grid centered columns={'equal'}>
              <Grid.Column>

                <Container className={'Contact'}>
                  <b>Contact: </b> {this.props.doc.contactName}
                  <Container className={'ContactEmail'}>
                    <b>Email: </b>{this.props.doc.contactEmail}
                  </Container>
                </Container>

              </Grid.Column>
              <Grid.Column>
                <Container textAlign={'center'}>
                  <b>Types:</b>
                  <div>
                    {allTypes}
                  </div>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container className={'Contact'} textAlign={'right'}>
                  {
                    this.props.doc.clubEmail !== undefined && this.props.doc.clubEmail.length > 0 ?
                        <div><b>Club Email: </b>{this.props.doc.clubEmail}</div> : ''
                  }
                </Container>
                <Container textAlign={'right'}>
                  {
                    !(this.props.doc.website !== undefined && this.props.doc.website.length > 0) ? '' :
                        <div><Button className={UHGreenButton} href={`${this.props.doc.website}`}>Club Website</Button>
                        </div>
                  }
                </Container>
              </Grid.Column>
            </Grid>
            <Container className={'Description'} textAlign='justified'>
              <Divider/>
              <p>
                {
                  this.props.doc.description !== undefined &&
                  this.props.doc.description.length > 0 ?
                      this.props.doc.description : 'Description coming soon'
                }
              </p>
            </Container>
            <Divider/>
            <div>
              {displayReviews}
            </div>
            <div>
              Like the club? Leave a review!
              <AddReview club={this.props.doc.name} owner={Meteor.user().username}/>
            </div>
          </div>
        </Container>
    );
  }
}

/** Require the presence of a Club document in the props object. Uniforms adds 'model' to the props, which we use. */
ClubPage.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  reviews: PropTypes.array.isRequired,
  ready1: PropTypes.bool.isRequired,
  ready2: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription1 = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('ReviewsModerator');
  return {
    doc: Clubs.findOne(documentId),
    reviews: Reviews.find({}).fetch(),
    ready1: subscription1.ready(),
    ready2: subscription2.ready(),
  };
})(ClubPage);
