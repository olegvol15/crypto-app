import { Flex, Typography } from 'antd';
import s from './CoinInfo.module.css';

function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex align="center" className={s.row}>
      <img src={coin.icon} alt={coin.name} className={s.icon} />
      <Typography.Title level={2} className={s.title}>
        {withSymbol && `(${coin.symbol}) `}{coin.name}
      </Typography.Title>
    </Flex>
  );
}

export default CoinInfo;
