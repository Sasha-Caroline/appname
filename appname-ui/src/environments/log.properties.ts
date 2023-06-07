export const loggerProperties = {
    'level': window['env']['LOG_LEVEL'] !== '${LOG_LEVEL}' ? window['env']['LOG_LEVEL'] : 'DEBUG',
    'showStackTrace': window['env']['LOG_SHOW_STACK_TRACE'] !== '${LOG_SHOW_STACK_TRACE}' ? window['env']['LOG_SHOW_STACK_TRACE'] : false,
    'showDateTime': window['env']['LOG_SHOW_DATE_TIME'] !== '${LOG_SHOW_DATE_TIME}' ? window['env']['LOG_SHOW_DATE_TIME'] : true,
    'dateTimeFormat': window['env']['LOG_DATE_TIME_FORMAT'] !== '${LOG_DATE_TIME_FORMAT}' ? window['env']['LOG_DATE_TIME_FORMAT'] : 'HH:mm:ss',
}
