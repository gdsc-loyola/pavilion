import create from 'zustand';
import union from 'just-union';

export const useEventsStore = create((set) => ({
  /**
   * @type {Array<import('$services/events.service').Event>>}
   */
  events: [],
  filteredEvents: [],

  /**
   * @type {Array<number>}
   */
  selectedEvents: [],
  /**
   *
   * @param {Array<import('$services/events.service').Event>} events
   */
  setEvents: (events) => {
    set((state) => ({ ...state, events }));
  },

  /**
   *
   * @param {Array<import('$services/events.service').Event>} events
   */
  setFilteredEvents: (events) => {
    set((state) => ({ ...state, filteredEvents: events }));
  },

  /**
   *
   * @param {Array<import('$services/events.service').Event>} events
   */
  setSelectedEvents: (action, idOrIds) => {
    if (action === 'remove') {
      set((state) => ({
        ...state,
        selectedEvents: state.selectedEvents.filter((x) => x !== idOrIds),
      }));
    }

    if (action === 'add') {
      set((state) => ({ ...state, selectedEvents: union(state.selectedEvents, [idOrIds]) }));
    }

    if (action === 'addMany') {
      set((state) => ({ ...state, selectedEvents: union(state.selectedEvents, idOrIds) }));
    }

    if (action === 'removeAll') {
      set((state) => ({ ...state, selectedEvents: [] }));
    }
  },
}));
