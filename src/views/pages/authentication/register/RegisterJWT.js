import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Check } from 'react-feather';
import { connect } from 'react-redux';
import Checkbox from '../../../../components/@vuexy/checkbox/CheckboxesVuexy';
import { signup } from '../../../../redux/actions/auth/registerActions';
import { history } from '../../../../history';

class Register extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    confirmPass: '',
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.signup(this.state.email, this.state.password, this.state.name);
  };

  render() {
    return (
      <Form action="/" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Name"
            required
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <Label>Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <Label>Email</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <Label>Password</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            value={this.state.confirmPass}
            onChange={(e) => this.setState({ confirmPass: e.target.value })}
          />
          <Label>Confirm Password</Label>
        </FormGroup>
        <FormGroup>
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label=" I accept the terms & conditions."
            defaultChecked
          />
        </FormGroup>
        <div className="d-flex justify-content-between">
          <Button.Ripple
            color="primary"
            outline
            onClick={() => {
              history.push('/pages/login');
            }}
          >
            Login
          </Button.Ripple>
          <Button.Ripple color="primary" type="submit">
            Register
          </Button.Ripple>
        </div>
      </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  values: state.auth.register,
});
export default connect(mapStateToProps, { signup })(Register);
