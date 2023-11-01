from django.core.management.base import BaseCommand
import requests
from shoes_rest.models import Shoe

BASE_URL = 'http://localhost:3001/products/'


class Command(BaseCommand):
    help = 'Scrapes data from sneaks API and populates the Shoe model'

    def add_arguments(self, parser):
        parser.add_argument('keyword', type=str, help='The keyword to scrape data for')
        parser.add_argument('--limit', type=int, default=50, help='The number of products to fetch')

    def handle(self, *args, **kwargs):
        keyword = kwargs['keyword']
        limit = kwargs['limit']
        params = {'limit': limit}

        response = requests.get(f'{BASE_URL}{keyword}', params=params)

        if response.status_code == 200:
            products = response.json()

            for product in products:
                shoe = Shoe(
                    name=product.get('name'),
                    category=product.get('category'),
                    price=product.get('price'),
                    size=product.get('size'),
                    color=product.get('color'),
                    sku=product.get('sku'),
                    gender=product.get('gender'),
                    brand=product.get('brand'),
                    picture_url=product.get('picture_url'),
                    description=product.get('description')
                )
                shoe.save()

            self.stdout.write(self.style.SUCCESS(f"Successfully fetched and saved {len(products)} products."))
        else:
            self.stdout.write(self.style.ERROR(f"Failed to fetch data for keyword: {keyword}"))
