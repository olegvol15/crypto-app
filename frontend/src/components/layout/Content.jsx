import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';
import s from './Content.module.css';

function Content() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, coin) => {
    acc[coin.id] = coin.price;
    return acc;
  }, {});

  const total = assets
    .map((asset) => asset.amount * (cryptoPriceMap[asset.id] || 0))
    .reduce((acc, v) => acc + v, 0)
    .toFixed(2);

  return (
    <Layout.Content className={s.content}>
      <div className={s.container}>
        <Typography.Title level={3} className={s.title}>
          Portfolio: {total}$
        </Typography.Title>

        <div className={s.section}>
          <PortfolioChart />
        </div>

        <div className={s.sectionTable}>
          <AssetsTable />
        </div>
      </div>
    </Layout.Content>
  );
}

export default Content;
