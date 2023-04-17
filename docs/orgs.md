# Orgs

## `api.py`

### EventsViewSet

- A simple ViewSet for looking at events.
  Allows access for authenticated users OR if request method is GET.

#### `def retrieve()`

- Gets an event and the students that belong to that event.
- `query`: Students exist?

##### if query == True:

- Uses `StudentToEventSerializer` to display all students belonging to the event.
- `StudentToEventSerializer` has both `EventsSerializer` and `StudentSerializer`.

##### if query == False:

- Uses `EventsSerializer` -> `OrgDetailInEventSerializer`, using a `HyperlinkedIdentityField`.
- `OrgDetailInEventSerializer`: Basically, generates a URL for each 'Organization' model that
  includes the URL route name for the 'Event' detail view.

#### `def create()`

- Handles the creation of events.
- `EventsSerializer` is used, inheriting `serializers.ModelSerializer`. This allows default `.create()`
  and `.update()` implementations.

##### Event Details

1. name
2. cover_photo
3. org
4. desc
5. location
6. event_photo{1,2,3,4}
7. status
8. accepting_responses
9. is_past_event
10. start_date
11. end_date
