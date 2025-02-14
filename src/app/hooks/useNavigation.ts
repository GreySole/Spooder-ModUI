import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { _setTab, _toggleNavigation, _setNavigation } from '../slice/navigationSlice';

export default function useNavigation() {
  const dispatch = useDispatch();
  const currentTab = useSelector((state: IRootState) => state.navigationSlice.currentTab);
  const tabOptions = useSelector((state: IRootState) => state.navigationSlice.tabOptions);
  const navigationOpen = useSelector((state: IRootState) => state.navigationSlice.navigationOpen);
  const stayHere = useSelector((state: IRootState) => state.navigationSlice.stayHere);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  function setTab(tabName: string) {
    dispatch(_setTab({ tab: tabName }));
  }

  function toggleNavigation() {
    dispatch(_toggleNavigation());
  }

  function setNavigation(isOpen: boolean) {
    dispatch(_setNavigation({ isOpen }));
  }
  
  return {
    navigationOpen,
    setTab,
    toggleNavigation,
    setNavigation,
    tabOptions,
    currentTab,
    urlParams,
  };
}
