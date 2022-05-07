'use strict';

const RequireIntrinsic = require('#intrinsic/RequireIntrinsic');
const UncurryThisIntrinsic = require('#intrinsic/UncurryThisIntrinsic');
const IsCallable = require('#type/IsCallable');
const IsObject = require('#type/IsObject');
const ToLength = require('#type/ToLength');
const ToPropertyKey = require('#type/ToPropertyKey');
const RequireInternalSlot = require('#internal-slot/RequireInternalSlot');
const SetInternalSlot = require('#internal-slot/SetInternalSlot');

const Map = RequireIntrinsic('Map');
const MapDelete = UncurryThisIntrinsic('Map.prototype.delete');
const MapEntries = UncurryThisIntrinsic('Map.prototype.entries');
const MapGet = UncurryThisIntrinsic('Map.prototype.get');
const MapHas = UncurryThisIntrinsic('Map.prototype.has');
const MapKeys = UncurryThisIntrinsic('Map.prototype.keys');
const MapSet = UncurryThisIntrinsic('Map.prototype.set');
const MapSize = UncurryThisIntrinsic('get Map.prototype.size');
const MapIteratorNext = UncurryThisIntrinsic('MapIteratorPrototype.next');
const ReflectApply = RequireIntrinsic('Reflect.apply');
const ReflectDefineProperty = RequireIntrinsic('Reflect.defineProperty');
const Symbol = RequireIntrinsic('Symbol');
const SymbolToStringTag = RequireIntrinsic('@@toStringTag');
const TypeError = RequireIntrinsic('TypeError');

const $Listeners = Symbol('[[Listeners]]');

const RequireListenerCallable = argument => {
  if (!IsCallable(argument)) {
    throw new TypeError('listener is not callable');
  }
}

const EventEmitterAddListener = (eventEmitter, event, listener, options) => {
  const listeners = RequireInternalSlot(eventEmitter, $Listeners);
  event = ToPropertyKey(event);
  RequireListenerCallable(listener);
  let once = false;
  if (options != null) {
    if (!IsObject(options)) {
      throw new TypeError('options is not an object');
    }
    once = !!options.once;
  }
  let eventListeners = MapGet(listeners, event);
  if (!eventListeners) {
    eventListeners = new Map();
    MapSet(listeners, event, eventListeners);
    MapSet(eventListeners, listener, once);
    return true;
  }
  if (MapHas(eventListeners, listener)) {
    return false;
  }
  MapSet(eventListeners, listener, once);
  return true;
}

const EventEmitterEmitApply = (eventEmitter, event, argumentsList) => {
  const listeners = RequireInternalSlot(eventEmitter, $Listeners);
  event = ToPropertyKey(event);
  const args = [];
  if (argumentsList != null) {
    if (!IsObject(argumentsList)) {
      throw new TypeError('argumentsList is not an array-like object');
    }
    const argumentCount = ToLength(argumentsList.length);
    for (let i = 0; i < argumentCount; i++) {
      args[i] = argumentsList[i];
    }
  }
  const eventListeners = MapGet(listeners, event);
  if (!eventListeners) {
    return false;
  }
  const iterator = MapEntries(eventListeners);
  let iteratorResult = MapIteratorNext(iterator);
  while (!iteratorResult.done) {
    const entry = iteratorResult.value;
    const listener = entry[0];
    const once = entry[1];
    ReflectApply(listener, null, args);
    if (once) {
      MapDelete(eventListeners, listener);
    }
    iteratorResult = MapIteratorNext(iterator);
  }
  const listenerCount = MapSize(eventListeners);
  if (!listenerCount) {
    MapDelete(listeners, event);
  }
  return true;
}

const EventEmitterEmit = (eventEmitter, event, ...args) => (
  EventEmitterEmitApply(eventEmitter, event, args)
);

const EventEmitterEventCount = eventEmitter => {
  const listeners = RequireInternalSlot(eventEmitter, $Listeners);
  return MapSize(listeners);
}

const EventEmitterEvents = eventEmitter => {
  const listeners = RequireInternalSlot(eventEmitter, $Listeners);
  const events = [];
  let eventCount = 0;
  const iterator = MapKeys(listeners);
  let iteratorResult = MapIteratorNext(iterator);
  while (!iteratorResult.done) {
    events[eventCount++] = iteratorResult.value;
    iteratorResult = MapIteratorNext(iterator);
  }
  return events;
}

const EventEmitterListenerCount = (eventEmitter, event) => {
  const listeners = RequireInternalSlot(eventEmitter, $Listeners);
  event = ToPropertyKey(event);
  const eventListeners = MapGet(listeners, event);
  return eventListeners ? MapSize(eventListeners) : 0;
}

const EventEmitterRemoveListener = (eventEmitter, event, listener) => {
  const listeners = RequireInternalSlot(eventEmitter, $Listeners);
  event = ToPropertyKey(event);
  RequireListenerCallable(listener);
  const eventListeners = MapGet(listeners, event);
  if (!eventListeners) {
    return false;
  }
  const deleted = MapDelete(eventListeners, listener);
  if (!deleted) {
    return false;
  }
  const listenerCount = MapSize(eventListeners);
  if (!listenerCount) {
    MapDelete(listeners, event);
  }
  return true;
}

class EventEmitter {
  constructor() {
    const listeners = new Map();
    SetInternalSlot(this, $Listeners, listeners);
  }

  get eventCount() {
    return EventEmitterEventCount(this);
  }

  addListener(event, listener, options) {
    return EventEmitterAddListener(this, event, listener, options);
  }

  emit(event, ...args) {
    return EventEmitterEmitApply(this, event, args);
  }

  emitApply(event, argumentsList) {
    return EventEmitterEmitApply(this, event, argumentsList);
  }

  events() {
    return EventEmitterEvents(this);
  }

  listenerCount(event) {
    return EventEmitterListenerCount(this, event);
  }

  removeListener(event, listener) {
    return EventEmitterRemoveListener(this, event, listener);
  }
}

const EventEmitterPrototype = EventEmitter.prototype;
ReflectDefineProperty(EventEmitterPrototype, SymbolToStringTag, {
  value: 'EventEmitter'
});

module.exports = {
  EventEmitter,
  EventEmitterAddListener,
  EventEmitterEmit,
  EventEmitterEmitApply,
  EventEmitterEventCount,
  EventEmitterEvents,
  EventEmitterListenerCount,
  EventEmitterRemoveListener
};
