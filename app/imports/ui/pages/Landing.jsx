import React from 'react';
import { Grid, Button, Header, Message, Form, Segment, Container } from 'semantic-ui-react';

const WelcomeMessage = () => (
    <Container textAlign='center'>

      <Header>Welcome to Rainbow Clubs! Where we hope to bring all of UH Manoas clubs to one easy to find central
        location!</Header>

    </Container>
);

const LeftColumn = () => (
    <Container textAlign='center'>
      New users must register to browse the directory.
    </Container>

);
const RightColumn = () => (
    <Container textAlign='center'>
      New Clubs must register to be added to the directory and manage their page.
    </Container>
)

const LoginForm = () => (
    <div>
      <Grid container textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 700 }}>
          <Header as='h2' style={{ color: '#024731' }} textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
              <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
              />

              <Button style={{ background: '#024731' }} inverted fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New user? <a href='#'>Register</a>
          </Message>
          <Message>
            New club? <a href='#'>Create Club</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
);

class Landing extends React.Component {

  render() {
    return (
        <Grid columns={3} textAlign='center'>
          <Grid.Column>
            {LeftColumn()}
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              {WelcomeMessage()}
            </Grid.Row>
            <Grid.Row>
              {LoginForm()}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            {RightColumn()}
          </Grid.Column>
        </Grid>
    );
  }
}

export default Landing;
