import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';
import s from './Sider.module.css';

function Sider() {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Sider className={s.sider}>
      {assets.map((asset) => (
        <Card key={asset.id} className={s.card}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item className={s.listItem}>
                <span>{item.title}</span>
                <span className={s.value}>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default Sider;
