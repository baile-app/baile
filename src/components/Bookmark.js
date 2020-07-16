import React, { useContext, useEffect, useRef } from 'react';
import Color from 'color';
import { Session } from '../contexts/SessionProvider.js';
import { Settings } from '../contexts/SettingsProvider.js';
import styles from './Bookmark.module.css';

const Bookmark = ({ bookmark, setDraggingNode }) => {
  const favicon = `http://www.google.com/s2/favicons?domain=${bookmark.link}`;
  const container = useRef();
  const color = Color(bookmark.color);
  const sessionState = useContext(Session);
  const session = sessionState.state;
  const settingsState = useContext(Settings);
  const settings = settingsState.state;

  useEffect(() => {
    const dark =
      settings.theme === 'solar' && session.daytime
        ? false
        : settings.theme === 'solar' && !session.daytime
        ? true
        : settings.theme === 'dark'
        ? true
        : settings.theme === 'light'
        ? false
        : window.matchMedia('(prefers-color-scheme: dark)')
        ? true
        : false;

    container.current.style.setProperty(
      '--bookmark-prime',
      dark ? color.lightness(80) : color.lightness(20)
    );
    container.current.style.setProperty(
      '--bookmark-second',
      dark ? color.lightness(20) : color.lightness(80)
    );
  }, [color, session.daytime, settings.theme]);

  return (
    <li
      className={styles.bookmark}
      data-bookmark={bookmark.id}
      onDragStart={() => setDraggingNode(bookmark.id)}
      onDragEnd={() => setDraggingNode(null)}
      ref={container}>
      <a className={styles.link} href={bookmark.link} title={bookmark.name}>
        <span className={styles.icon}>
          <img alt="" className={styles.img} src={favicon} />
        </span>
        <span className={styles.text}>{bookmark.name}</span>
      </a>
    </li>
  );
};

export default Bookmark;
