import React, { PropTypes } from 'react';
import { Button, Menu, Icon, Switch, Input } from 'antd';
import { Link } from 'dva/router';
import styles from './WSider.less';
const Item = Menu.Item;


const WSider = ({ handleClick, goback, changeTheme, darkTheme, newCatalog, cancelCatalog, makeCatalog, showCatalog, list, cataloguesSuccess, notebooksKeys,

}) => {
  // console.log(notebooksKeys);

  const AddCatalog = () => (
    <div className={styles.catalogView} style={{ display: showCatalog ? 'flex' : 'none' }}>
      <Input placeholder="请输入目录名" size="large" />
      <div className={styles.buttons}>
        <Button onClick={makeCatalog} className={styles.button}>确定</Button>
        <Button onClick={cancelCatalog} type="dashed" className={styles.button}>取消</Button>
      </div>
    </div>);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3d menu item</Menu.Item>
    </Menu>
  );


  const getMenus = (parentPath = '/writer') => {
    return list.map((item, idx) => {
      const linkTo = item.key;
      return (
        <Item key={linkTo}> <Link to={`${parentPath}/notebooks/${linkTo}`}>{item.catalogueTitle}</Link></Item>
      );
    });
  };
  


  const menuItems = getMenus();
  return (
    <div className={darkTheme ? styles.darkContent : styles.content}>
      <div className={styles.sider}>
        <Button ><Link to="/">回到首页</Link></Button>
        <div onClick={newCatalog} className={styles.newCatalog}>
          <Icon type="plus" />   添加目录
      </div>
        <AddCatalog />
        <Menu
          selectedKeys={cataloguesSuccess ? [`${notebooksKeys}`]:[]}
          mode="inline"
          theme={darkTheme ? 'dark' : 'light'}
        >
          {menuItems}
        </Menu>
      </div>
      <div className={styles.bottom}>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" className={styles.switch} />
      </div>
    </div>
  );
};

WSider.PropTypes = {
  handleClick: PropTypes.func,
  goback: PropTypes.func,
  darkTheme: PropTypes.bool,
  changeTheme: PropTypes.func,
  newCatalog: PropTypes.func,
  cancelCatalog: PropTypes.func,
  makeCatalog: PropTypes.func,
  list: PropTypes.array,
  cataloguesSuccess: PropTypes.bool,
};


export default WSider;
