import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
 
  } from 'antd';
  
  const { Option } = Select;
  

  class RegistrationForm extends React.Component {
  

    handleSubmit = e => {
        e.preventDefault();
        console.log('Received values of form: ');
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            fetch('http://localhost:3000/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({
                user: {
                  name: values.username,
                  password: values.password,
                }
              })
            })
              .then(r => {
                  if(r.status===201) {
                    this.props.history.push('/login')
                  }
                  if(r.status===406) {
                    this.props.form.setFields({
                        username: {
                          errors: [new Error('Username is already taken.')],
                        },
                      });
                  }
                  return r.json()
                
                })
          }
        });
      };

  
    render() {
      const { getFieldDecorator } = this.props.form;
   
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
  
   
  
      return (
        <Form {...formItemLayout}>
          <Form.Item
            label={
              <span>
                Username
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!', whitespace: false }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>


          <Form.Item {...tailFormItemLayout}>
            <Button onClick={this.handleSubmit} type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  export default withRouter(RegistrationForm);