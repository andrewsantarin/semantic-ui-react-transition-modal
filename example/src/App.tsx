import React from 'react';
import { Button, SemanticTRANSITIONS } from 'semantic-ui-react';
import { TransitionModal } from 'semantic-ui-react-transition-modal';

import logo from './logo.svg';
import './App.css';

import 'semantic-ui-css/semantic.min.css';

export const App: React.FC = () => {
  const animation: SemanticTRANSITIONS = 'fade up';

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TransitionModal
          animation={animation}
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
