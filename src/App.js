import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { BookmarksProvider } from './contexts/BookmarksProvider';
import { CategoriesProvider } from './contexts/CategoriesProvider';
import { SessionProvider } from './contexts/SessionProvider';
import { SettingsProvider } from './contexts/SettingsProvider';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import Setup from './components/Setup';
import Theme from './components/Theme';
import Auth from './routes/Auth';
import Error from './routes/Error';
import Home from './routes/Home';
import Logout from './routes/Logout';

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  ::-webkit-scrollbar {
    background-color: transparent;
    height: 0.8rem;
    width: 0.8rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: hsla(var(--color-primary), 0.8);
    border-radius: 0.4rem;
  }

  :root {
    --animation-ease: cubic-bezier(0.4, 0, 0.6, 1);
    --animation-time: 180ms;
    --color-dark: 240, 12%, 6%; /* #0d0d11 */
    --color-light: 72, 24%, 96%; /* #f6f7f2 */

    scrollbar-color: hsla(var(--color-primary), 0.24) transparent;
    scrollbar-width: thin;
  }

  body,
  html,
  #root {
    height: 100%;
  }

  html {
    font-size: 10px;
  }

  body {
    background-color: hsl(var(--color-secondary));
    color: hsl(var(--color-primary));
    font: 400 1.5rem/1.3333 'Work Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  a {
    color: inherit;
  }

  button,
  input[type='checkbox'],
  input[type='radio'] {
    cursor: pointer;
  }

  button {
    appearance: none;
    background-color: transparent;
    border: none;
    color: hsl(var(--color-primary));
    padding: 5px 10px;
    position: relative;
    z-index: 0;
  }
    
  button::after {
    background-color: hsl(var(--color-primary));
    border-radius: 9px / 50% 50%;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.08;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  button:hover::after {
    opacity: 0.12;
  }

  fieldset {
    border: none;
  }

  input,
  select,
  textarea {
    appearance: none;
    background-color: hsla(var(--color-primary), 0.06);
    border: none;
    font: inherit;
    padding: 6px 9px;
  }

  input[type='checkbox'],
  input[type='radio'] {
    height: 1.2em;
    padding: 0;
    position: relative;
    width: 1.2em;
  }

  input[type='checkbox']::after,
  input[type='radio']::after {
      background-color: hsla(var(--color-primary), 0.6);
      content: '';
      left: 50%;
      opacity: 0;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }

  input[type='checkbox']::after {
    height: 72%;
    mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.131 11.542l4.582 4.609a1.1 1.1 0 01.364.691.8.8 0 01-.194.667 13.769 13.769 0 01-2.376 2.373.8.8 0 01-.667.194 1.255 1.255 0 01-.715-.339l-4.582-4.606-4.606 4.606a1.146 1.146 0 01-.691.339.873.873 0 01-.691-.194 14.7 14.7 0 01-2.348-2.352.873.873 0 01-.194-.691 1.146 1.146 0 01.339-.691l4.606-4.606L3.372 6.96a1.2 1.2 0 01-.365-.715.8.8 0 01.2-.667 14.2 14.2 0 012.347-2.376.873.873 0 01.691-.194 1.1 1.1 0 01.691.364l4.606 4.388 4.582-4.388a1.2 1.2 0 01.715-.364.8.8 0 01.667.194 13.769 13.769 0 012.376 2.376.8.8 0 01.194.667 1.194 1.194 0 01-.364.715z"/></svg>');
    mask-size: contain;
    width: 72%;
  }

  input[type='radio'] {
    border-radius: 50%;
  }
    
  input[type='radio']::after {
    border-radius: 50%;
    height: 60%;
    width: 60%;
  }

  input[type='checkbox']:checked::after,
  input[type='radio']:checked::after {
    opacity: 1;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-size: 1em;
  }

  h1,
  h2 {
    text-transform: uppercase;
  }

  select {
    background-image:
      linear-gradient(
        45deg,
        hsla(var(--color-primary), 0.48) 45%,
        transparent 55%,
        transparent
      ),
      linear-gradient(
        130deg,
        transparent 45%,
        hsla(var(--color-primary), 0.48) 55%,
        hsla(var(--color-primary), 0.48)
      ),
      linear-gradient(
        130deg,
        hsla(var(--color-primary), 0.48) 45%,
        transparent 55%,
        transparent
      ),
      linear-gradient(
        45deg,
        transparent 45%,
        hsla(var(--color-primary), 0.48) 55%,
        hsla(var(--color-primary), 0.48)
      );
    background-position:
      calc(100% - 11px) calc(50% - 2px),
      calc(100% - 14px) calc(50% - 2px),
      calc(100% - 11px) calc(50% + 3px),
      calc(100% - 14px) calc(50% + 3px);
    background-repeat: no-repeat;
    background-size: 3px 3px;
  }

  svg {
    display: inline-block;
    fill: hsl(var(--color-primary));
    height: 1em;
    width: 1em;
  }

  .ReactModal__Body--open {
    overflow: hidden;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template:
    'app-main' 1fr
    'app-footer' auto
    / 1fr;
  min-height: 100%;
  padding-left: 50px;
`;

const Main = styled.main`
  grid-area: app-main;
  padding-bottom: 20px;
`;

function App() {
  return (
    <SessionProvider>
      <SettingsProvider>
        <CategoriesProvider>
          <BookmarksProvider>
            <GlobalStyles />
            <Theme />
            <Router>
              <Setup />
              <Container>
                <AppHeader />
                <Main>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/error" component={Error} />
                    <Route path="/logout" component={Logout} />
                  </Switch>
                </Main>
                <AppFooter />
              </Container>
            </Router>
          </BookmarksProvider>
        </CategoriesProvider>
      </SettingsProvider>
    </SessionProvider>
  );
}

export default App;
