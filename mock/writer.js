module.exports = {
  'GET /api/allwriters': function (req, res) {
    const jsons = {
      success: true,
      data: [{ title: '改变你自己', content: '哈哈哈哈', public: true, id: 1, author: 'mubin' },
      { title: '改变你自己2', content: '哈哈哈哈2', public: true, id: 2, author: 'mubin' },
      { title: '改变你自己3', content: '哈哈哈哈3', public: true, id: 3, author: 'mubin' }],
    };
    res.json(jsons);
  },

  'GET /api/getArticle': function (req, res) {
    const jsons = {
      success: true,
      data: { title: '改变你自己', content: '<p>asdasdasdjashdkasdklasjdlk</p><p><s>asdasdasdasdasdasdasdsdas</s></p><p><s>zxczxczczxczc</s></p><ol><li><s>asdjzxczxczxczxczczxczxczxc</s></li><li><s>zxzxczxc</s></li><li><s>ajsdjkasd</s></li><li>s</li></ol>', public: true, id: 1, author: 'mubin' },
    };
    res.json(jsons);
  },

  'GET /api/catalogue': function (req, res) {
    const jsons = {
      success: true,
      data: [{
        catalogueTitle: '公共',
        key: '1',
        data: [{ title: '改变你自己', introduction: '哈232', public: true, id: 1, author: 'mubin' },
        { title: 'xc改变你自己2', introduction: '哈哈哈哈zxczx', public: true, id: 2, author: 'mubin' },
        { title: 'vxs改变你自己3', introduction: '哈哈哈哈999', public: true, id: 3, author: 'mubin' }],
      }, {
        catalogueTitle: '私有',
        key: '2',
        data: [{ title: '思雨改变你自己', introduction: 'xc哈哈哈哈', public: true, id: 4, author: 'mubin' },
        { title: '改变2', introduction: '2哈哈哈哈2', public: true, id: 5, author: 'mubin' },
        { title: '你自己3', introduction: 'x哈哈哈哈3', public: true, id: 6, author: 'mubin' }],
      }],
    };
    res.json(jsons);
  },

};
