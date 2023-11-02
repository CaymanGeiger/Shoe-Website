from django.core.management.base import BaseCommand
import requests
from shoes_rest.models import Shoe
from urllib.parse import quote
import random


BASE_URL = 'http://sneaks-api:3001/products/'


def generate_random_sizes(min_length=6, min_size=4, max_size=16):
    sizes = list(range(min_size, max_size + 1))
    random.shuffle(sizes)
    selected_sizes = sizes[:min_length]
    additional_sizes = random.sample(sizes, random.randint(0, len(sizes) - min_length))
    final_sizes = selected_sizes + additional_sizes
    random.shuffle(final_sizes)
    return final_sizes


class Command(BaseCommand):
    help = 'Scrapes data from sneaks API and populates the Shoe model'

    def add_arguments(self, parser):
        parser.add_argument('keywords', nargs='+', type=str, help='The keywords to scrape data for. E.g. "nike dunks" should be input as "nike" "dunks"')
        parser.add_argument('--limit', type=int, default=50, help='The number of products to fetch')

    def handle(self, *args, **kwargs):
        keywords = " ".join(kwargs['keywords'])
        encoded_keywords = quote(keywords)

        limit = kwargs['limit']
        params = {'limit': limit}

        response = requests.get(f'{BASE_URL}{encoded_keywords}', params=params)

        if response.status_code == 200:
            products = response.json()

            for product in products:
                random_sizes = generate_random_sizes()
                shoe = Shoe(
                    name=product.get('silhoutte'),
                    price=product.get('retailPrice'),
                    sizes=random_sizes,
                    color=product.get('colorway'),
                    brand=product.get('brand'),
                    picture_url=product.get('thumbnail'),
                    description=product.get('description')
                )
                shoe.save()

            self.stdout.write(self.style.SUCCESS(f"Successfully fetched and saved {len(products)} products."))
        else:
            self.stdout.write(self.style.ERROR(f"Failed to fetch data for keyword: {keyword}"))
