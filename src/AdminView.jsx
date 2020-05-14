import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import Layout from './Layout';
import { useHostStatus } from './data';

function AdminView() {
  const [isHost, setIsHost] = useHostStatus();
  const onIsHostChange = (event) => {
    setIsHost(event.currentTarget.checked);
  };
  return (
    <Layout
      title="Host settings"
      description="Welcome to the Eurovision party! If you are the host of the event, check the mark below. Otherwise please don't :)"
    >
      <FormGroup>
        <FormControlLabel
          control={(
            <Checkbox
              checked={isHost}
              onChange={onIsHostChange}
              name="isHost"
            />
          )}
          label="I'm the host of the event"
        />
      </FormGroup>
    </Layout>
  );
}

AdminView.propTypes = {
};

export default AdminView;
