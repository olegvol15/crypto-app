import { Tag, Typography, Divider } from 'antd';
import CoinInfo from './CoinInfo';
import s from './CoinInfoModal.module.css';

function CoinInfoModal({ coin }) {
  const pos = (v) => v > 0;
  const fmt = (n, d = 2) => (typeof n === 'number' ? n.toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: d }) : n);

  return (
    <div className={s.wrap}>
      <CoinInfo coin={coin} withSymbol />
      <Divider className={s.divider} />

      <div className={s.row}>
        <Typography.Text strong>1 hour:</Typography.Text>
        <Tag color={pos(coin.priceChange1h) ? 'green' : 'red'}>{fmt(coin.priceChange1h, 2)}%</Tag>
        <Typography.Text strong>1 day:</Typography.Text>
        <Tag color={pos(coin.priceChange1d) ? 'green' : 'red'}>{fmt(coin.priceChange1d, 2)}%</Tag>
        <Typography.Text strong>1 week:</Typography.Text>
        <Tag color={pos(coin.priceChange1w) ? 'green' : 'red'}>{fmt(coin.priceChange1w, 2)}%</Tag>
      </div>

      <Typography.Paragraph className={s.p}>
        <Typography.Text strong>Price: </Typography.Text>
        <span className={s.value}>{fmt(coin.price, 2)}$</span>
      </Typography.Paragraph>

      <Typography.Paragraph className={s.p}>
        <Typography.Text strong>Price BTC: </Typography.Text>
        <span className={s.value}>{fmt(coin.priceBtc, 8)}</span>
      </Typography.Paragraph>

      <Typography.Paragraph className={s.p}>
        <Typography.Text strong>Market Cap: </Typography.Text>
        <span className={s.value}>{fmt(coin.marketCap, 0)}$</span>
      </Typography.Paragraph>

      <Typography.Paragraph className={s.p}>
        <Typography.Text strong>Contract Address: </Typography.Text>
        <span className={s.value}>{coin.contractAddress}</span>
      </Typography.Paragraph>
    </div>
  );
}

export default CoinInfoModal;
