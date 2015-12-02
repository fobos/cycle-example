import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { Observable } from 'rx';
import isolate from '@cycle/isolate';

import TabApp from './TabApp';


function main(responses) {
    const tabApp = isolate(TabApp)(responses);

    return {
        DOM: tabApp.DOM
    };
}

run(main, {
    DOM: makeDOMDriver('#root'),
});
