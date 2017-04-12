import lodash from 'lodash';
import styles from './WCatalog.less';
import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';


const Item = Menu.Item;


const WCatalog = ({ darkTheme, list, newArtcile, notebooksKeys, notesKey,

}) => {
  const getMenus = function (parentPath = '/writer/notebooks') {
    const currentIndex = lodash.findIndex(list, (chr) => {
      return chr.key === notebooksKeys;
    });

    if (currentIndex !== -1) {
      return list[currentIndex].data.map((item, idx) => {
        const linkTo = `${parentPath}/` + `${list[currentIndex].key}` + `/notes/${item.id}`;
        return (
          <Item key={item.id} className={styles.itme}>
            <Link to={linkTo}>
              <h1>{item.title}</h1>
              <h2>{item.introduction}</h2>
            </Link>
          </Item>
        );
      });
    }
  };

  const menuItems = getMenus();
  return (
    <div className={darkTheme ? styles.darkCatalog : styles.catalog}>
      <div className={styles.addArctile} onClick={newArtcile}>
        <Icon type="plus-circle-o" />   添加文章
      </div>
      <Menu
        selectedKeys={[`${notesKey}`]}
        mode="inline"
      >
        {menuItems}
      </Menu>
    </div>
  );
};

WCatalog.PropTypes = {
  dispatch: PropTypes.func,
  list: PropTypes.object,
  newArtcile: PropTypes.func,
  notebooksKeys: PropTypes.int,
  notesKey: PropTypes.int,
};


// export default WCatalog;
export default WCatalog;
