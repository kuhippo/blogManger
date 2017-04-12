import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import ReactQuill from 'react-quill';
import React, { PropTypes } from 'react';
import styles from './WEdit.less';
import { Spin } from 'antd';


const modal = () => {
  return (
    <div styles={{ backgroundColor: 'red' }}>
      <h1>asdas</h1>
    </div>
  );
};


const WEdit = ({ darkTheme, editIsLoading, editShow, currentArtcile, notesKey,

}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

  function uploadImageCallBack(e) {
    console.log(e);
  }
  function myBlockRenderer(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'atomic') {
      return {
        component: MediaComponent,
        editable: false,
        props: {
          foo: 'bar',
        },
      };
    }
  }
  function handleChange(e) {
    // console.log(e);
  }
  const { title, content } = currentArtcile;
  return (
    <div className={darkTheme ? styles.darkEdit : styles.edit} >
      {editShow
        ? <div className={styles.content}>
          <Spin tip="读取文章..." spinning={editIsLoading} size="large" className={styles.spin}>
            <div className={styles.header}>
              <input type="text" value={title} />
            </div>
            <ReactQuill
              value={content}
              className={styles.wrapperMedium}
              modules={modules}
              formats={formats}
              onChange={handleChange}
            />
          </Spin>
        </div>
        : <div className={styles.modal} />}
    </div >
  );
};

WEdit.PropTypes = {
  darkTheme: PropTypes.bool,
  editIsLoading: PropTypes.bool,
  editShow: PropTypes.bool,
  notesKey: PropTypes.int,
};


export default WEdit;
module.exports = WEdit;
