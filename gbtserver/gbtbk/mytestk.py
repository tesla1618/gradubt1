from .models import UserAccount

# Print all UserAccount instances and their departments
for user in UserAccount.objects.all():
    print(f"User: {user}, Dept: {user.dept}")