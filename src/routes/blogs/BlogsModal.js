import React, { PropTypes } from 'react'
import { Modal, Form, Input, Radio, Select, DatePicker, Button } from 'antd';
import styles from './BlogsModal.less';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const Option = Select.Option;


const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  const modalOpts = {
    title: `${type === 'create' ? '写文章' : '修改文章'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    maskClosable: false,
    width: "60%"
  }
  const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
  };

  return (
    <Modal {...modalOpts} className={styles.content}>
      <Form layout="vertical">
        <FormItem label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input />
            )}
        </FormItem>
        <div>
          <FormItem label="标签">
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请选择标签' }],
            })(
              <div className={styles.label}>
                <Select
                  className={styles.select}
                  mode="multiple"
                  size="default"
                  placeholder="Please select"
                  defaultValue={['a10', 'c12']}
                  onChange={handleChange}
                >
                  {children}
                </Select>
                <Button type="primary">
                  标签管理
                </Button>
              </div>
              )
            }
          </FormItem>
        </div>
        <FormItem label="内容">
          {getFieldDecorator('content')(<Editor/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="日期选择"
        >
          {getFieldDecorator('date-picker', { rules: [{ type: 'object', required: true, message: 'Please select time!' }] })(
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime
            />
          )}
        </FormItem>
        <FormItem className="collection-create-form_last-form-item">
          {getFieldDecorator('modifier', {
            initialValue: 'public',
          })(
            <Radio.Group>
              <Radio value="public">公开</Radio>
              <Radio value="private">私有</Radio>
            </Radio.Group>
            )}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
