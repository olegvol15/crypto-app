import { Table, List, Typography, Tag, Grid } from 'antd';
import { useCrypto } from '../context/crypto-context';
import s from './AssetsTable.module.css';

const { useBreakpoint } = Grid;

const fmt = (n, d = 2) =>
  typeof n === 'number'
    ? n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d })
    : n;

function AssetsTable() {
  const { assets } = useCrypto();
  const screens = useBreakpoint();

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name ?? a.id,
    price: a.price,
    amount: a.amount,
    total: a.totalAmount,
    grow: a.grow,
    growPercent: a.growPercent,
  }));

  if (!screens.md) {
    return (
      <List
        className={s.cards}
        dataSource={data}
        renderItem={(it) => (
          <List.Item className={s.card}>
            <div className={s.row}>
              <Typography.Text className={s.name}>{it.name}</Typography.Text>
              <Tag color={it.grow ? 'green' : 'red'}>{fmt(it.growPercent, 2)}%</Tag>
            </div>
            <div className={s.grid}>
              <div className={s.label}>Price</div>
              <div className={s.value}>${fmt(it.price, 2)}</div>
              <div className={s.label}>Amount</div>
              <div className={s.value}>{fmt(it.amount, 4)}</div>
              <div className={s.label}>Total</div>
              <div className={s.value}>${fmt(it.total, 2)}</div>
            </div>
          </List.Item>
        )}
      />
    );
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name), ellipsis: true },
    { title: 'Price, $', dataIndex: 'price', align: 'right', sorter: (a, b) => a.price - b.price, render: (v) => fmt(v, 2) },
    { title: 'Amount', dataIndex: 'amount', align: 'right', sorter: (a, b) => a.amount - b.amount, render: (v) => fmt(v, 4) },
    { title: 'Total, $', dataIndex: 'total', align: 'right', sorter: (a, b) => a.total - b.total, render: (v) => fmt(v, 2) },
  ];

  return (
    <div className={s.wrap}>
      <div className={s.scroller}>
        <Table
          className={s.table}
          columns={columns}
          dataSource={data}
          pagination={false}
          size="middle"
          rowKey="key"
          showSorterTooltip={{ target: 'sorter-icon' }}
        />
      </div>
    </div>
  );
}

export default AssetsTable;

