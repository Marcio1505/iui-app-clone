import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label
} from "reactstrap"
import fgImg from "../../../assets/img/pages/forgot-password.png"
import { history } from "../../../history"
import "../../../assets/scss/pages/authentication.scss"
import { FormattedMessage } from "react-intl"

class ForgotPassword extends React.Component {
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center"
              >
                <img src={fgImg} alt="fgImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-1">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">
                        <FormattedMessage id="recoverPassword.title"/>
                      </h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    <FormattedMessage id="recoverPassword.message"/>
                  </p>
                  <CardBody className="pt-1 pb-0">
                    <Form>
                      <FormGroup className="form-label-group">
                        <Input
                          type="text"
                          placeholder="Email"
                          required
                        />
                        <Label><FormattedMessage id="user.email"/></Label>
                      </FormGroup>
                      <div className="float-md-left d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          outline
                          className="px-75 btn-block"
                          onClick={() => history.push("/login")}
                        >
                          <FormattedMessage id="goBack"/>
                        </Button.Ripple>
                      </div>
                      <div className="float-md-right d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          type="submit"
                          className="px-75 btn-block"
                          onClick={e => {
                            e.preventDefault()
                            history.push("/")
                          }}
                        >
                          <FormattedMessage id="recoverPassword"/>
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default ForgotPassword
