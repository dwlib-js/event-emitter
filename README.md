# Event Emitter API

## Abstract
The module for implementing an event emitter based on listeners.

## Install
`npm i --save @dwlib/event-emitter`

## Usage
```javascript
// CJS
const EventEmitter = require('@dwlib/event-emitter');
const EventEmitterAddListener = require('@dwlib/event-emitter/EventEmitterAddListener');
const EventEmitterEmit = require('@dwlib/event-emitter/EventEmitterEmit');
const EventEmitterEmitApply = require('@dwlib/event-emitter/EventEmitterEmitApply');
const EventEmitterEventCount = require('@dwlib/event-emitter/EventEmitterEventCount');
const EventEmitterEvents = require('@dwlib/event-emitter/EventEmitterEvents');
const EventEmitterListenerCount = require('@dwlib/event-emitter/EventEmitterListenerCount');
const EventEmitterRemoveListener = require('@dwlib/event-emitter/EventEmitterRemoveListener');
const EventEmitterSubscribe = require('@dwlib/event-emitter/EventEmitterSubscribe');
const IsEventEmitter = require('@dwlib/event-emitter/IsEventEmitter');
// ESM
import EventEmitter, {
  EventEmitterAddListener,
  EventEmitterEmit,
  EventEmitterEmitApply,
  EventEmitterEventCount,
  EventEmitterEvents,
  EventEmitterListenerCount,
  EventEmitterRemoveListener,
  IsEventEmitter
} from '@dwlib/event-emitter';
import EventEmitterAddListener from '@dwlib/event-emitter/EventEmitterAddListener';
import EventEmitterEmit from '@dwlib/event-emitter/EventEmitterEmit';
import EventEmitterEmitApply from '@dwlib/event-emitter/EventEmitterEmitApply';
import EventEmitterEventCount from '@dwlib/event-emitter/EventEmitterEventCount';
import EventEmitterEvents from '@dwlib/event-emitter/EventEmitterEvents';
import EventEmitterListenerCount from '@dwlib/event-emitter/EventEmitterListenerCount';
import EventEmitterRemoveListener from '@dwlib/event-emitter/EventEmitterRemoveListener';
import EventEmitterSubscribe from '@dwlib/event-emitter/EventEmitterSubscribe';
import IsEventEmitter from '@dwlib/event-emitter/IsEventEmitter';
```

## API
- `class EventEmitter`
  - `constructor()`
  - `get eventCount => number`
  - `addListener(event: string | symbol, listener: Function[, options: {
      once?: boolean
    }?]) => this`
  - `emit(event: string | symbol[, ...args: any[]?]) => boolean`
  - `emitApply(event: string | symbol[, argumentsList: ArrayLike?]) => boolean`
  - `events() => Array<string | symbol>`
  - `listenerCount(event: string | symbol) => number`
  - `removeListener(event: string | symbol, listener: Function) => boolean`
  - `subscribe(event: string | symbol, listener: Function[, options: {
      once?: boolean
    }?]) => unsubscribe() => boolean`

### Builtins
- `EventEmitterAddListener(eventEmitter: EventEmitter, event: string | symbol, listener: Function[, options: {
    once?: boolean
  }?]) => boolean`
- `EventEmitterEmit(eventEmitter: EventEmitter, event: string | symbol[, ...args: any[]?]) => boolean`
- `EventEmitterEmitApply(eventEmitter: EventEmitter, event: string | symbol[, argumentsList: ArrayLike?]) => boolean`
- `EventEmitterEventCount(eventEmitter: EventEmitter) => number`
- `EventEmitterEvents(eventEmitter: EventEmitter) => Array<string | symbol>`
- `EventEmitterListenerCount(eventEmitter: EventEmitter, event: string | symbol) => number`
- `EventEmitterRemoveListener(eventEmitter: EventEmitter, event: string | symbol, listener: Function) => boolean`
- `EventEmitterSubscribe(eventEmitter: EventEmitter, event: string | symbol, listener: Function[, options: {
    once?: boolean
  }?]) => unsubscribe() => boolean`
- `IsEventEmitter(argument: any) => boolean`
