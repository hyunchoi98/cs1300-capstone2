import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Topbar from './Topbar';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileRedirect: false,
    }
  }

  login = values => {
    const username = values['username'];
    const pw = values['password'];
    // replace with mongo call
    let request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: pw })
    };
    fetch('/login', request)
      .then((response) => {
        if (response.status === 200) {
          this.handleSuccess(username);
        } else {
          console.log("Login Failed");
          alert("Login failed! You might have the wrong username and password.")
        };
      });
  }

  handleSuccess = (username) => {
    localStorage.setItem('currentUser', username);
    this.setState({
      profileRedirect: true
    });
  }

  render() {
    if (this.state.profileRedirect || localStorage.getItem("currentUser") !== null) {
      return <Redirect to='/cardsearch'></Redirect>
    }

    return (
      <div>
        <Topbar />
        <Form
          preserve={false}
          id="loginForm"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.login}
          style={{ width: '70%', marginTop: "25px", margin: 'auto' }}
        >
          <h3>Log In</h3>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: '100%', }} type="primary" form="loginForm" key="submit" htmlType="submit">
              Log In
            </Button>
          </Form.Item>

          <p className="forgot-password text-right">
            Don't have an account? <Link to="/register">Register here!</Link>
          </p>
        </Form>
      </div >
    );
  }
}

export default Authenticate;