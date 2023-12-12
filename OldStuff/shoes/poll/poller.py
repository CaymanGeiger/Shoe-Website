import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()


from shoes_rest.models import AccountVO


def get_accounts():
    response = requests.get("http://accounts-api:8000/api/accounts/")
    content = json.loads(response.content)
    for account in content["accounts"]:
        AccountVO.objects.update_or_create(
            id=account["id"],
            defaults={
                    "username": account["username"],
                    "first_name": account["first_name"],
                    "last_name": account["last_name"],
                    "email": account["email"],
                    "user_level": account["user_level"],
                    },
        )


def poll():
    while True:
        print("Shoes poller polling for data")
        try:
            get_accounts()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
