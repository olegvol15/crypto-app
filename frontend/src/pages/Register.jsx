import { Card, Form, Input, Button, Typography, message } from 'antd';
import { useAuth } from '../context/auth-context';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const onFinish = async ({ email, password }) => {
    const { error } = await signUp(email, password);
    if (error) return message.error(error.message);
    message.success('Account created!');
    navigate('/'); // if email confirmation is ON, redirect to /login instead
  };

  return (
    <div style={{ minHeight: '100vh', display:'grid', placeItems:'center' }}>
      <Card title="Create account" style={{ width: 380 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type:'email' }]}>
            <Input autoComplete="email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>Sign up</Button>
          <Typography.Paragraph style={{ marginTop: 12 }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </Typography.Paragraph>
        </Form>
      </Card>
    </div>
  );
}
