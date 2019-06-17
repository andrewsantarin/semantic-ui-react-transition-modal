# semantic-ui-react-transition-modal
## Semantic UI React Transition Modal
A simple animation wrapper over the Semantic UI React modal component.

- [Semantic UI React Transition Modal](#Semantic-UI-React-Transition-Modal)
- [Premise](#Premise)
- [Usage](#Usage)
- [Resources](#Resources)

## Premise
Without an official modal animation feature set in stone by Semantic UI React (see [this issue](https://github.com/Semantic-Org/Semantic-UI-React/issues/2923)), one has to make workarounds. This library aims to fill that in by merging the animation props of the `<Transition>` component and the visibility state control props of the `<Modal>` component into one convenient set.

## Usage

**NPM**
```
npm install --save react
npm install --save react-dom
npm install --save semantic-ui-react
npm install --save semantic-ui-react-transition-modal
```

**Yarn**
```
yarn add react
yarn add react-dom
yarn add semantic-ui-react
yarn add semantic-ui-react-transition-modal
```

Simply import `TransitionModal` in order to use it. It also comes prepackaged with the usual `Modal` subcomponents, with no modifications, so you can use them as you usually do:

- `TransitionModal.Header`
- `TransitionModal.Content`
- `TransitionModal.Description`
- `TransitionModal.Actions`

**Example**
```jsx
import React from 'react';
import { Button } from 'semantic-ui-react';
import { TransitionModal } from 'semantic-ui-react-transition-modal';

import logo from './logo.svg';
import './App.css';

import 'semantic-ui-css/semantic.min.css';

export function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TransitionModal
          animation="fade up"
          duration={250}
          trigger={(
            <Button
              content="Hello!"
            />
          )}
          closeIcon
          content="Hello!"
          header="Hello!"
          actions={[
            'OK',
          ]}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
```

## Resources
- Source of inspiration: [https://stackoverflow.com/questions/55063139/why-react-semantic-ui-transition-not-animating-the-component](https://stackoverflow.com/questions/55063139/why-react-semantic-ui-transition-not-animating-the-component)
- Semantic UI React issue: [https://github.com/Semantic-Org/Semantic-UI-React/issues/2923](https://github.com/Semantic-Org/Semantic-UI-React/issues/2923)
- Boilerplate: [https://github.com/michal-wrzosek/react-component-lib](https://github.com/michal-wrzosek/react-component-lib)
- UMD enhancements: [https://github.com/alex996/react-css-spinners/blob/6e9eaae8052ce899250cc9d765f1e95b7d75f7b0/rollup.config.js](https://github.com/alex996/react-css-spinners/blob/6e9eaae8052ce899250cc9d765f1e95b7d75f7b0/rollup.config.js)
  - YouTube tutorial of it: [https://www.youtube.com/watch?v=ZGa_a164aeM](https://www.youtube.com/watch?v=ZGa_a164aeM)
