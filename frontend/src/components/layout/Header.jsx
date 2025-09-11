import { Layout, Select, Space, Button, Modal, Drawer, Tooltip, Segmented, Dropdown } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useAuth } from '../../context/auth-context';
import { useState, useEffect } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';
import { useTheme } from '../../context/theme-context';
import { SunFilled, MoonFilled, LaptopOutlined } from '@ant-design/icons';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

function Header() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { user, signOut } = useAuth();        
  const { crypto } = useCrypto();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { key: 'email', label: user?.email, disabled: true },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign out',
      onClick: async () => {
        await signOut();
        navigate('/login');
      },
    },
  ];

  useEffect(() => {
    const keypress = (e) => e.key === '/' && setSelect(true);
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((coin) => coin.id === value));
    setModal(true);
  }

  const themeOptions = [
    { label: <Tooltip title="Light"><SunFilled /></Tooltip>, value: 'light' },
    { label: <Tooltip title="Dark"><MoonFilled /></Tooltip>, value: 'dark' },
    { label: <Tooltip title="System"><LaptopOutlined /></Tooltip>, value: 'system' },
  ];

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onOpenChange={setSelect}
        onSelect={handleSelect}
        placeholder="press / to open"
        options={crypto.map((coin) => ({
          value: coin.id,
          label: coin.name,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />

      <Segmented value={theme} onChange={setTheme} options={themeOptions} size="large" />

      <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
        <Button icon={<UserOutlined />}>{user?.email?.split('@')[0]}</Button>
      </Dropdown>

      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null} closable>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add Asset"
        closable
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}

export default Header;