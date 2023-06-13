from rest_framework.permissions import BasePermission

# class IsAccount(BasePermission):
#     def has_permission(self, request, view):
#         if request.method == 'GET' and request

class IsGetOrIsAuthenticated(BasePermission):
    """
    Allow access authenticated users OR if request method is GET.
    """
    def has_permission(self, request, view):
        
        if request.method == 'GET' or request.user.is_authenticated:
            return True
        else:
            return False

class IsPostAndIsAuthenticated(BasePermission): 
    """
    Allow access authenticated users AND if request method is POST.
    """
    def has_permission(self, request, view):
        
        if request.method == 'POST' and request.user.is_authenticated:
            return True
        else:
            return False

class IsPostAndIsNotAuthenticated(BasePermission): 
    """
    Allow access unauthenticated users AND if request method is POST.
    """
    def has_permission(self, request, view):
        
        if request.method == 'POST' and not request.user.is_authenticated:
            return True
        elif request.user.is_authenticated:
            return False

class IsGet(BasePermission):
    """
    Allow access if request method is GET.
    """
    def has_permission(self, request, view):

        if request.method == 'GET':
            return True
        else:
            return False


