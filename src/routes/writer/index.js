import lodash from 'lodash';
import { connect } from 'dva';
import React, { PropTypes } from 'react';
import styles from './index.less';
import WSider from './sider/WSider';
import WEdit from './edit/WEdit';
import WCatalog from './catalog/';
import { Spin } from 'antd';


class index extends React.Component {

  constructor(props) {
    super(props);
    this.props.dispatch({
      type: 'writer/getCatalogues',
    });
  }

  componentWillReceiveProps(nextProps) {
    // 请求成功
    if (nextProps.writer.cataloguesSuccess && this.props.writer.list.length === 0) {
      
       // 获取当前的notebooksKey
      const urlParams = this.props.params.splat;
      let catalogKey = null;
      let notesKey = null;
      if (urlParams){
        if (urlParams.match(/^notebooks\/\d+/g)) {
          const alert = urlParams.match(/^notebooks\/\d+/g)[0];
          const tempIdArr = alert.match(/\d+/g);
          if (tempIdArr) {
            catalogKey = tempIdArr[0];
          }
        }
        if (urlParams.match(/notes\/\d+/g)) {
          const alert = urlParams.match(/notes\/\d+/g)[0];
          const tempIdArr = alert.match(/\d+/g);
          if (tempIdArr) {
            notesKey = tempIdArr[0];
          }
        }
      }
      
      if (catalogKey == null || urlParams == null) {
        catalogKey = nextProps.writer.list[0].key;
        notesKey = nextProps.writer.list[0].data[0].id;
        this.props.dispatch({
          type: 'writer/getArticle',
          payload: { catalogKey, notesKey, first: true },
        });
      } else if (catalogKey != null && notesKey == null) {
        const currentIndex = lodash.findIndex(nextProps.writer.list, (chr) => {
          return chr.key === catalogKey;
        });

        if (currentIndex === -1) {
          return;
        }
        notesKey = nextProps.writer.list[currentIndex].data[0].id;
        this.props.dispatch({
          type: 'writer/getArticle',
          payload: { catalogKey, notesKey, first: true },
        });
      } else {
        this.props.dispatch({
          type: 'writer/getArticle',
          payload: { catalogKey, notesKey, first: true },
        });
      }
    }


    // 当路由发生变化时 请求
    if (nextProps.params.splat !== this.props.params.splat) {
       // 获取当前的notebooksKey
      const urlParams = nextProps.params.splat;
      let catalogKey = null;
      let notesKey = null;
      if (urlParams.match(/^notebooks\/\d+/g)) {
        const alert = urlParams.match(/^notebooks\/\d+/g)[0];
        const tempIdArr = alert.match(/\d+/g);
        if (tempIdArr) {
          catalogKey = tempIdArr[0];
        }
      }
      if (urlParams.match(/notes\/\d+/g)) {
        const alert = urlParams.match(/notes\/\d+/g)[0];
        const tempIdArr = alert.match(/\d+/g);
        if (tempIdArr) {
          notesKey = tempIdArr[0];
        }
      }

      if (catalogKey == null) {
        catalogKey = nextProps.writer.list[0].key;
        notesKey = nextProps.writer.list[0].data[0].id;
        this.props.dispatch({
          type: 'writer/getArticle',
          payload: { catalogKey, notesKey },
        });
      } else if (catalogKey != null && notesKey == null) {
        const currentIndex = lodash.findIndex(nextProps.writer.list, (chr) => {
          return chr.key === catalogKey;
        });
        if (currentIndex === -1) {
          return;
        }
        notesKey = nextProps.writer.list[currentIndex].data[0].id;
        this.props.dispatch({
          type: 'writer/getArticle',
          payload: { catalogKey, notesKey },
        });
      } else {
        this.props.dispatch({
          type: 'writer/getArticle',
          payload: { catalogKey, notesKey },
        });
      }
    }
  }


  render() {
    const { dispatch, writer } = this.props;
    const { darkTheme, list, editIsLoading, editShow, currentArtcile, lodding, showCatalog, cataloguesSuccess, notebooksKeys, notesKey } = writer;

    const wcatalogProps = {
      list,
      darkTheme,
      notebooksKeys,
      notesKey,
      newArtcile() {
      },
    };

    const wedit = {
      darkTheme,
      editIsLoading,
      editShow,
      currentArtcile,
      notesKey,
    };

    const wsiderProps = {
      notebooksKeys,
      list,
      darkTheme,
      showCatalog,
      cataloguesSuccess,
      cancelCatalog() {
        dispatch({
          type: 'writer/cancelCatalog',
        });
      },
      makeCatalog() {

      },
      newCatalog() {
        dispatch({
          type: 'writer/showCatalog',
        });
      },
      // 改变主题
      changeTheme(judge) {
        dispatch({
          type: 'writer/changeTheme',
          payload: judge,
        });
      },
    };
    return (
      <Spin tip="读取文章..." spinning={lodding} size="large" className={styles.spin}>
        <div className={styles.content} >
          <WSider {...wsiderProps} />
          <WCatalog {...wcatalogProps} />
          <WEdit {...wedit} />
        </div>
      </Spin >
    );
  }
}


export default connect(({ writer }) => ({ writer }))(index);
