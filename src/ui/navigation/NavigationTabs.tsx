import React, { useLayoutEffect, useRef } from 'react';
import TabButton from './TabButton';
import useNavigation from '../../app/hooks/useNavigation';

// The layout offsets content by the header plus this bar (see App.tsx and navigation.scss), but
// nothing defines the bar's height - the component library only sets it, to 0, for phones - so
// the calc() using it was invalid and the content started under the tabs. The height is
// measured from the bar itself, so it follows the theme's font size and tab styling. Both
// spellings are set: the stylesheet has always used `--navigation-tab-height` for the header.
const HEIGHT_VARIABLES = ['--navigation-tabs-height', '--navigation-tab-height'];

export default function NavigationTabs() {
  const { tabOptions } = useNavigation();
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) {
      return;
    }
    const root = document.documentElement;
    const apply = (height: number) =>
      HEIGHT_VARIABLES.forEach((name) => root.style.setProperty(name, `${height}px`));

    apply(bar.getBoundingClientRect().height);
    const observer = new ResizeObserver((entries) => {
      apply(entries[0].target.getBoundingClientRect().height);
    });
    observer.observe(bar);
    return () => {
      observer.disconnect();
      // Not shown (a phone): nothing to offset by.
      HEIGHT_VARIABLES.forEach((name) => root.style.setProperty(name, '0px'));
    };
  }, []);

  const tabButtons = Object.entries(tabOptions).map(([key, label]) => (
    <TabButton key={key} tabName={key} tabLable={label} />
  ));

  return (
    <div className='navigation-tabs' ref={barRef}>
      {tabButtons}
    </div>
  );
}
