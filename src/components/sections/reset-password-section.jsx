'use strict';

import React from 'react';
import t from 'tcomb-form';
import { translate } from '../../lib/i18n';
import { Email } from '../../lib/types';
import Form from '../form';
import { getStyles } from './styles';
import AsyncActionsMixin from '../../mixins/async-actions';
import { TranslatedMessage } from '../i18n';

export default React.createClass({
  displayName: 'ResetPasswordSection',

  mixins: [
    AsyncActionsMixin
  ],

  getAsyncActions() {
    return {
      resetPassword: this.props.resetPassword
    };
  },

  getType() {
    return t.struct({
      email: Email
    });
  },

  getFields() {
    let hasError = this.props.errors.resetPassword != null;

    return {
      email: {
        placeholder: translate('reset password email placeholder'),
        type: 'email',
        hasError
      }
    };
  },

  handleSubmit(value) {
    this.getAsyncAction('resetPassword')(value.email);
  },

  render() {
    let m;
    let d;
    if (this.state.resetPasswordState === 'done') {
      m = translate('reset password button text when completed reset');
      d = true;
    } else if (this.state.resetPasswordState === 'pending') {
      m = translate('reset password button text when attempting reset');
      d = true;
    } else {
      m = translate('reset password button text');
      d = false;
    }

    const styles = getStyles();

    return (
      <div>
        <Form kind='compact'
          type={this.getType()}
          fields={this.getFields()}
          submitMessage={m}
          onSubmit={this.handleSubmit}
          disabled={d}
          autoDisableSubmit={this.props.shipSettings.disable_buttons_automatically} />

        <div style={styles.sectionFooter}>
          <p style={styles.sectionText}>
            <TranslatedMessage tag='a'
              href='#'
              onClick={this.props.activateLogInSection}
              message='reset password switch to log-in link' />
          </p>
        </div>
      </div>
    );
  }
});
