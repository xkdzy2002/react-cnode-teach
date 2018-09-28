import React from 'react'                       // eslint-disable-line
import ReactDOM from 'react-dom'                // eslint-disable-line
import { AppContainer } from 'react-hot-loader'
import App from './App.jsx'

// ReactDOM.render(<App />, document.body)
// ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.render( < App / > , document.getElementById('root'))

const root = document.getElementById('root')
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        root,
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default    // eslint-disable-line
        // ReactDOM.render( < NextApp / > , document.getElementById('root'))
        render(NextApp)
    })
}
