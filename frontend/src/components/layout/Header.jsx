import { Layout, Select, Space, Button, Modal, Drawer, Tooltip, Segmented } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useState, useEffect } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';
import { useTheme } from '../../context/theme-context';
import { SunFilled, MoonFilled, LaptopOutlined } from '@ant-design/icons';

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
  const {crypto} = useCrypto();
  const {theme, setTheme} = useTheme();

  useEffect(() => {
    const keypress = (e) => {
      if(e.key === '/') {
        setSelect((prev) => !prev);
      }
    }
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find(coin => coin.id === value));
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
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value={'press / to open'}
        options={crypto.map(coin => ({
          value: coin.id,
          label: coin.name,
          icon: coin.icon
        }))}
        optionRender={option => (
          <Space>
            <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
          </Space>
        )}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Segmented
          value={theme}
          onChange={setTheme}
          options={themeOptions}
          size="large"
        />
      </div>

      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin}/>
      </Modal>

      <Drawer
        width={600}
        title="Add Asset"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnHidden
      >
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>

    </Layout.Header>
  )
}

export default Header