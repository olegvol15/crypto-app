import { Card, Form, Input, Button, Typography, message } from 'antd';
import { useAuth } from '../context/auth-context';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onFinish = async ({ email, password }) => {
    const { error } = await signIn(email, password);
    if (error) return message.error(error.message);
    message.success('Welcome back!');
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display:'grid', placeItems:'center' }}>
      <Card title="Sign in" style={{ width: 380 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type:'email' }]}>
            <Input autoComplete="email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>Sign in</Button>
          <Typography.Paragraph style={{ marginTop: 12 }}>
            No account? <Link to="/register">Create one</Link>
          </Typography.Paragraph>
        </Form>
      </Card>
    </div>
  );
}
