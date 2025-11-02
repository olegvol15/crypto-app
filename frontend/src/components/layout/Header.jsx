import {
  Layout,
  Select,
  Space,
  Button,
  Modal,
  Drawer,
  Tooltip,
  Segmented,
  Dropdown,
  Grid,
} from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useAuth } from '../../context/auth-context';
import { useState, useEffect, useRef } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';
import { useTheme } from '../../context/theme-context';
import { SunFilled, MoonFilled, LaptopOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import s from './Header.module.css';

const { useBreakpoint } = Grid;

function Header() {
  const [selectOpen, setSelectOpen] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { user, signOut } = useAuth();
  const { crypto } = useCrypto();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const selectRef = useRef(null);

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
    const onKey = (e) => {
      if (e.key === '/') {
        e.preventDefault();
        setSelectOpen(true);
        setTimeout(() => selectRef.current?.focus(), 0);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function handleSelect(value) {
    const c = crypto.find((x) => x.id === value);
    setCoin(c || null);
    setModal(true);
  }

  const themeOptions = [
    { label: <Tooltip title="Light"><SunFilled /></Tooltip>, value: 'light' },
    { label: <Tooltip title="Dark"><MoonFilled /></Tooltip>, value: 'dark' },
    { label: <Tooltip title="System"><LaptopOutlined /></Tooltip>, value: 'system' },
  ];

  const isMdUp = screens.md;

  return (
    <Layout.Header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <Select
            ref={selectRef}
            className={s.searchSelect}
            showSearch
            allowClear
            open={selectOpen}
            onDropdownVisibleChange={setSelectOpen}
            onSelect={handleSelect}
            placeholder="press / to open"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={crypto.map((c) => ({
              value: c.id,
              label: c.name,
              icon: c.icon,
            }))}
            optionRender={(option) => (
              <Space>
                <img className={s.coinIcon} src={option.data.icon} alt={option.data.label} />
                {option.data.label}
              </Space>
            )}
          />
        </div>

        <div className={s.right}>
          <Segmented
            size={isMdUp ? 'large' : 'middle'}
            value={theme}
            onChange={setTheme}
            options={themeOptions}
          />

          <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
            <Button icon={<UserOutlined />}>
              {user?.email ? user.email.split('@')[0] : 'Account'}
            </Button>
          </Dropdown>

          <Button type="primary" onClick={() => setDrawer(true)}>
            Add Asset
          </Button>
        </div>
      </div>

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        closable
        destroyOnClose
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        title="Add Asset"
        open={drawer}
        onClose={() => setDrawer(false)}
        destroyOnClose
        width={isMdUp ? 600 : '100%'}
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}

export default Header;

