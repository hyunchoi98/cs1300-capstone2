import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import Topbar from './Topbar';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';



class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileRedirect: false,
    }
  }
  register = values => {
    const username = values["username"];
    const pw = values["password"];

    let request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: pw })
    };

    fetch('/signup', request)
      .then((response) => {
        if (response.status === 200) {
          this.handleSuccess(username);
        } else {
          alert("Signup failed! The username might already exist.")
          console.log("Error while registering")
        };
      });
  };

  handleSuccess = (username) => {
    localStorage.setItem('currentUser', username);
    this.setState({
      profileRedirect: true
    });
  }



  render() {
    if (this.state.profileRedirect) {
      return <Redirect to='/cardsearch'></Redirect>
    }
    return (
      <div>
        <Topbar />
        <Form
          id="registerForm"
          name="normal_register"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={this.register}
          style={{ width: '70%', margin: 'auto' }}
        >
          <h3>Register</h3>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name.' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username.' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password.' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: '100%', margin: 'auto' }} type="primary" form="registerForm" key="submit" htmlType="submit">
              Sign Up
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Register;