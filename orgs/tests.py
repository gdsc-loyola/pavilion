from django.contrib.auth.models import User
from django.core.files.uploadedfile import UploadedFile
from django.test import TestCase

from rest_framework import status
from rest_framework.test import force_authenticate, APIRequestFactory, APITestCase

from .models import *
from .api import *

from PIL import Image

import os
# Create your tests here.

class OrgsTestCase(APITestCase):

	def test_get_orgs_list(self):
		factory = APIRequestFactory()
		request = factory.get('/api/orgs')
		view = OrgsViewSet.as_view({ 'get': 'list' })

		response = view(request)


class EventsTestCase(APITestCase):

	def setUp(self):
		self.factory = APIRequestFactory(enforce_csrf_checks=True)
		User.objects.create_superuser(username="user", email="user@example.com", password="password", is_active=True, is_staff=True)
		self.user = User.objects.get(username='user')
		self.event = {
			"name": "Event For All",
			"start_date": "2022-01-19",
			"end_date": "2022-01-19",
			"location": "Location",
			"desc": "Yay event for all and for everyone!",
			"cover_photo": '',
			"event_photo1": '',
			"event_photo2": '',
			"event_photo3": '',
			"event_photo4": '',
			"status": "Completed",
			"accepting_responses": False,
			"is_past_event": True
		}
		self.imagePath = './tests/image.jpg'

	def test_create_past_event_without_photo(self):
		pastEvent = self.event
		request = self.factory.post('/api/events', pastEvent, format="multipart")
		view = EventsViewSet.as_view({ 'post': 'create' })
		force_authenticate(request, user=self.user)

		response = view(request)
		print("Test Create Past Event Without Photo: " + str(response.status_code))
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

	# def test_create_past_event_with_photo(self):
	# 	pastEvent = self.event
	# 	pastEvent['cover_photo'] = open(self.imagePath, 'rb')
	# 	pastEvent['event_photo1'] = open(self.imagePath, 'rb')
	# 	pastEvent['event_photo2'] = open(self.imagePath, 'rb')
	# 	pastEvent['event_photo3'] = open(self.imagePath, 'rb')
	# 	pastEvent['event_photo4'] = open(self.imagePath, 'rb')
	# 	request = self.factory.post('/api/events', pastEvent, format="multipart")
	# 	view = EventsViewSet.as_view({ 'post': 'create' })
	# 	force_authenticate(request, user=self.user)

	# 	response = view(request)
	# 	print(response.data)
	# 	self.assertEqual(response.status_code, status.HTTP_201_CREATED)

	def test_create_new_event_without_photo(self):
		pastEvent = self.event
		pastEvent['status'] = "Ongoing"
		pastEvent['is_past_event'] = False

		request = self.factory.post('/api/events', pastEvent, format="multipart")
		view = EventsViewSet.as_view({ 'post': 'create' })
		force_authenticate(request, user=self.user)

		response = view(request)
		print("Test Create New Event Without Photo: " + str(response.status_code))
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

	def test_edit_past_event(self):
		pastEvent = self.event
		request = self.factory.post('/api/events', pastEvent, format="multipart")
		view = EventsViewSet.as_view({ 'post': 'create' })
		force_authenticate(request, user=self.user)

		response = view(request)
		print("Test Create Past Event To Be Edited: " + str(response.status_code))
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

		patchQuery = {
			"name": "Another event to work"
		}
		request2 = self.factory.put('/api/events/', patchQuery, format="multipart")
		view2 = EventsViewSet.as_view({ 'put': 'partial_update' })
		force_authenticate(request2, user=self.user)

		response2 = view2(request2, pk=1)
		print("Test Edit Past Event: " + str(response.status_code))
		self.assertEqual(response2.status_code, status.HTTP_200_OK)

	def test_edit_new_event(self):
		pastEvent = self.event
		pastEvent['status'] = "Ongoing"
		pastEvent['is_past_event'] = False

		request = self.factory.post('/api/events', pastEvent, format="multipart")
		view = EventsViewSet.as_view({ 'post': 'create' })
		force_authenticate(request, user=self.user)

		response = view(request)
		print("Test Create New Event To Be Edited: " + str(response.status_code))
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

		patchQuery = {
			"name": "An ongoing event!"
		}
		request2 = self.factory.put('/api/events/', patchQuery, format="multipart")
		view2 = EventsViewSet.as_view({ 'put': 'partial_update' })
		force_authenticate(request2, user=self.user)

		response2 = view2(request2, pk=1)
		print("Test Edit New Event: " + str(response.status_code))
		self.assertEqual(response2.status_code, status.HTTP_200_OK)

	def test_delete_event(self):
		pastEvent = self.event
		pastEvent['name'] = "This event is about to be deleted."

		request = self.factory.post('/api/events', pastEvent, format="multipart")
		view = EventsViewSet.as_view({ 'post': 'create' })
		force_authenticate(request, user=self.user)

		response = view(request)
		print("Test Create Past Event To Be Deleted: " + str(response.status_code))
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

		request2 = self.factory.delete('/api/events')
		view2 = EventsViewSet.as_view({ 'delete': 'destroy' })
		force_authenticate(request2, user=self.user)

		response2 = view2(request2, pk=1)
		print("Test Deleted Past Event: " + str(response.status_code))
		self.assertEqual(response2.status_code, status.HTTP_204_NO_CONTENT)

	def test_edit_response(self):
		pastEvent = self.event
		request = self.factory.post('/api/events', pastEvent, format="multipart")
		view = EventsViewSet.as_view({ 'post': 'create' })
		force_authenticate(request, user=self.user)

		response = view(request)
		print("Test Create Past Event To Be Edited: " + str(response.status_code))
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

		patchQuery = {
			"name": "Another event to work"
		}
		request2 = self.factory.put('/api/events/', patchQuery, format="multipart")
		view2 = EventsViewSet.as_view({ 'put': 'partial_update' })
		force_authenticate(request2, user=self.user)

		response2 = view2(request2, pk=1)
		print("Test Edit Past Event: " + str(response.status_code))
		self.assertEqual(response2.status_code, status.HTTP_200_OK)