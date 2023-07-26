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

### StudentViewSet

- A simple ViewSet for viewing and editing students.

### StudentToEventViewSet

- A simple ViewSet for viewing and editing students assigned to or belonging to an event.

### OrgsViewSet

- A simple ViewSet for viewing and editing the different organizations.
- Offers CRUD actions.
- Uses a "slug" lookup field to query organizations. Uses `OrgsSerializer` to create new org.

### UserViewSet

- Retrieves user based on username or lists all users in the database.

### RegisterViewSet

- Creates new users based off parameters given.
- Unknown: password field in `def create()`? Not sure

### `def get_token_auth_header()` & `def requires_scope()`

- Enforce scope-based authorization for accessing protected resources
  using JSON Web Tokens (JWTs) and the Auth0 authentication service.

## `models.py`

### Organization

1. name
2. short_name
3. slug
4. desc
5. org_body (COA, LIONS, Sanggu)
6. logo
7. social media links
8. user (presumably organization user)

### Event

1. name
2. cover_photo
3. short_name
4. start_date
5. end_date
6. location
7. description
8. event photos
9. last_updated
10. status
11. accepting_responses
12. is_past_event
13. org (org that created event)

### Student

1. name
2. id_number
3. email
4. year
5. course

### StudentToEvent

1. event
2. student
3. date_submitted
4. last_updated

## `permissions.py`

- All permissions inherit BasePermission. Refer to Django REST doc for details.

### Permissions

1. IsGetOrIsAuthenticated
2. IsPostOrIsAuthenticated
3. IsPostAndIsNotAuthenticated
4. IsGet

## `serializers.py`

- Similar to Django's native `Form`s.
- ModelSerializer: offers automatic fields, create(), update(), and automatic validators
- HyperlinkedModelSerializer: uses hyperlinks to depict relationships, url instead of pk

### ModelSerializers

1. UserSerializer
2. UsernameSerializer
3. EventsSerializer
4. StudentToEventSerializer

### HyperlinkedModelSerializers

1. OrgDetailInEventSerializer
2. OrgsSerializer
3. StudentSerializer

## `urls.py`

- Uses routers and `ViewSets` to automatically configure paths.

## `utils.py`

- Refer to https://auth0.com/docs/quickstart/backend/django/01-authorization for details.
