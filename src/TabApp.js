import { Observable } from 'rx';
import isolate from '@cycle/isolate';

const { h } = require('@cycle/dom');
const { h1, button, span } = require('hyperscript-helpers')(h);


const TAB1 = true;
const TAB2 = false;

const log = str => x => {
    console.log(str, x);
    return x;
};

export default function TabApp(responses) {
    const tab1 = isolate(Tab1)(responses, 'tab1');
    const tab2 = isolate(Tab2)(responses, 'tab2');

    const tab$ = Observable
        .merge(
            tab1.switchClicks$.map(_ => TAB2),
            tab2.switchClicks$.map(_ => TAB1),
        )
        .startWith(TAB1)
        .tap(log('tab'));

    const vtree$ = tab$
        .flatMapLatest(tab => tab === TAB1 ? tab1.DOM : tab2.DOM);

    return {
        DOM: vtree$,
    };
}

function Tab1({ DOM }) {
    const switchClicks$ = DOM
        .select('.btn')
        .events('click')
        .tap(log('tab1'));

    const vtree$ = Observable.just(
        span({ className: 'tab1' }, [
            h1(['Tab1']),
            button({
                className: 'btn'
            }, ['Show tab 2']),
        ])
    );

    return {
        DOM: vtree$,
        switchClicks$,
    };
}

function Tab2({ DOM }) {
    const switchClicks$ = DOM
        .select('.btn')
        .events('click')
        .tap(log('tab2'));

    const vtree$ = Observable.just(
        span({ className: 'tab2' }, [
            h1(['Tab2']),
            button({
                className: 'btn'
            }, ['Show tab 1']),
        ])
    );

    return {
        DOM: vtree$,
        switchClicks$
    };
}
