import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import { browserHistory,withExampleBasename } from 'dva/router'

// 1. Initialize
const app = dva({
  ...createLoading(),
  history: browserHistory,
  onError (error) {
    console.error('app onError -- ', error)
  },
})

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
