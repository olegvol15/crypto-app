import { useState, useRef } from 'react';
import { Select, Space, Typography, Flex, Divider, Form, InputNumber, Button, DatePicker, Result } from 'antd';
import { useCrypto } from '../context/crypto-context';
import CoinInfo from './CoinInfo';
import s from './AddAssetForm.module.css';

const validateMessages = {
  required: '${label} is required!',
  types: { number: '${label} is not a valid number!' },
  number: { range: '${label} must be between ${min} and ${max}' },
};

function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef(null);

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}.`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        className={s.select}
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
        placeholder="Select a coin"
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
    );
  }

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue('price');
    form.setFieldsValue({ total: +((value || 0) * (price || 0)).toFixed(2) });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({ total: +((amount || 0) * (value || 0)).toFixed(2) });
  }

  return (
    <Form
      form={form}
      className={s.form}
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={onFinish}
      validateMessages={validateMessages}
      layout="horizontal"
      labelCol={{ flex: '120px' }}
      wrapperCol={{ flex: 'auto' }}
    >
      <div className={s.coinInfo}>
        <CoinInfo coin={coin} />
      </div>

      <Divider className={s.divider} />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, type: 'number', min: 0 }]}
      >
        <InputNumber className={s.full} placeholder="Enter coin amount" onChange={handleAmountChange} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber className={s.full} onChange={handlePriceChange} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker className={s.full} showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber className={s.full} disabled />
      </Form.Item>

      <Form.Item className={s.actions} wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">Add Asset</Button>
        <Button onClick={onClose}>Close</Button>
      </Form.Item>
    </Form>
  );
}

export default AddAssetForm;
