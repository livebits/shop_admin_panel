import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addField, FieldTitle } from 'ra-core';
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
// import MomentUtils from '@date-io/jalaali';
// import DateFnsUtils from "@date-io/date-fns";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });


const makePicker = (PickerComponent) => {
  class _makePicker extends Component {
    onChange(date) {
      this.props.input.onChange(date);
      this.props.input.onBlur();
    }

    render() {
      const {
        input,
        options,
        label,
        source,
        resource,
        isRequired,
        className,
        meta,
        type,
        providerOptions,
      } = this.props;

      const { touched, error } = meta;

      return (
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <PickerComponent
              okLabel="تأیید"
              cancelLabel="لغو"
              clearLabel="پاک کردن"
              {...options}
              label={<FieldTitle
                label={label}
                source={source}
                resource={resource}
                isRequired={isRequired}
              />}
              margin="normal"
              variant="filled"
              error={!!(touched && error)}
              helperText={touched && error}
              ref={(node) => { this.picker = node; }}
              className={className}
              labelFunc={date => (date ? (type === "date" ? date.format('jYYYY/jMM/jDD') : (type === "dateTime" ? date.format('jYYYY/jMM/jDD HH:mm:ss') : type === "time" ? date.format('HH:mm:ss') : '') ) :  '')}
              value={input.value ? input.value : null}
              onChange={date => this.onChange(date)}
            />
          </MuiPickersUtilsProvider>
      );
    }
  }
  _makePicker.propTypes = {
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    providerOptions: PropTypes.shape({
      // utils: PropTypes.func,
      locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
  };

  _makePicker.defaultProps = {
    input: {},
    isRequired: 'false',
    label: '',
    meta: { touched: false, error: false },
    options: {},
    resource: '',
    source: '',
    labelTime: '',
    className: '',
    type: 'date',
    providerOptions: {
      // utils: DateFnsUtils,
      locale: undefined,
    },
  };
  return _makePicker;
};

export const CustomDateInput = addField(makePicker(DatePicker));
export const CustomTimeInput = addField(makePicker(TimePicker));
export const CustomDateTimeInput = addField(makePicker(DateTimePicker));