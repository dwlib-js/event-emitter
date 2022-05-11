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
import IsEventEmitter from '@dwlib/event-emitter/IsEventEmitter';
```

## API
- *class* EventEmitter
  - constructor()
  - *get* eventCount
  - addListener(event, listener[, options])
  - emit(event[, ...args])
  - emitApply(event[, argumentsList])
  - events()
  - listenerCount(event)
  - removeListener(event, listener)

### Builtins
- EventEmitterAddListener(eventEmitter, event, listener[, options])
- EventEmitterEmit(eventEmitter, event[, ...args])
- EventEmitterEmitApply(eventEmitter, event[, argumentsList])
- EventEmitterEventCount(eventEmitter)
- EventEmitterEvents(eventEmitter)
- EventEmitterListenerCount(eventEmitter, event)
- EventEmitterRemoveListener(eventEmitter, event, listener)
- IsEventEmitter(argument)
