import Vue from 'vue'
import moment from 'moment'

const ymd= Vue.filter('ymd', (input, format) => {
    return moment(input).format(format);
});

export { ymd }