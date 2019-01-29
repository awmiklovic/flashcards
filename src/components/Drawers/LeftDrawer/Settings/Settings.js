import React from 'react';
import './Settings.css';
import { inject, observer } from 'mobx-react';
import SettingGroup from './SettingGroup/SettingGroup';

const Settings = (props) => {
  console.log(props.globalStore.userInfo.settings.randomize);
  return(
    <div className="Settings">
      <SettingGroup label="Track Right/Wrong" setting="tracking" active={true} />
      <SettingGroup label="Randomize" setting="randomize" active={false} />
      <SettingGroup label="Hide Sample Decks" setting="hide" active={false} />
    </div>
  );
}

export default inject('globalStore')(observer(Settings));
