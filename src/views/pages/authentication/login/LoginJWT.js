import React from 'react';
import { Link } from 'react-router-dom';
import { CardBody, FormGroup, Form, Input, Button, Label } from 'reactstrap';
import { Mail, Lock, Check } from 'react-feather';
import { connect } from 'react-redux';
import Checkbox from '../../../../components/@vuexy/checkbox/CheckboxesVuexy';
import { login } from '../../../../redux/actions/auth/loginActions';
import { history } from '../../../../history';

class LoginJWT extends React.Component {
  state = {
    email: 'demo@demo.com',
    password: 'demodemo',
    remember: false,
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    return (
      <>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Email</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
              />
              <div className="float-right">
                <Link to="/pages/forgot-password">Forgot Password?</Link>
              </div>
            </FormGroup>
            <div className="d-flex justify-content-between">
              <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  history.push('/pages/register');
                }}
              >
                Register
              </Button.Ripple>
              <Button.Ripple color="primary" type="submit">
                Login
              </Button.Ripple>
            </div>
          </Form>
        </CardBody>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  values: state.auth.login,
});
export default connect(mapStateToProps, { login })(LoginJWT);
